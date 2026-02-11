from flask import Blueprint, request, jsonify
from app import db
from app.models.assessment import Assessment, Question
from app.middleware.auth import token_required
from app.services.assessment_service import get_assessment_service
from datetime import datetime

assessment_bp = Blueprint('assessment', __name__)

@assessment_bp.route('/questions', methods=['GET'])
@token_required
def get_questions(current_user):
    """Get 20 assessment questions for current level"""
    try:
        level = request.args.get('level', 'beginner')  # beginner, intermediate, advanced
        
        if level not in ['beginner', 'intermediate', 'advanced']:
            return jsonify({'error': 'Invalid level. Must be beginner, intermediate, or advanced'}), 400
        
        # Get user's current skill level or use requested level
        user_level = current_user.skill_level if current_user.skill_level else level
        
        # Get questions (20 total)
        service = get_assessment_service()
        questions = service.get_questions_for_level(user_level, count=20)
        
        # Convert to dict (without correct_answer for security - only send after submission)
        questions_dict = []
        for q in questions:
            q_dict = {
                'id': q.id,
                'type': q.question_type,  # multiple-choice, code-completion, debugging
                'question': q.question_text,
                'options': q.options if q.question_type == 'multiple-choice' else None,
                # Note: correctAnswer and explanation are NOT sent here for security
                # They are only available in the /results endpoint after submission
                'difficulty': q.difficulty
            }
            questions_dict.append(q_dict)
        
        return jsonify({
            'questions': questions_dict,
            'level': user_level,
            'total_questions': len(questions_dict)
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to fetch questions', 'message': str(e)}), 500

@assessment_bp.route('/start', methods=['POST'])
@token_required
def start_assessment(current_user):
    """Start a new assessment"""
    try:
        data = request.get_json()
        level = data.get('level', current_user.skill_level or 'beginner')
        
        # Create assessment record
        assessment = Assessment(
            user_id=current_user.id,
            level=level,
            score=0,
            total_questions=20,
            answers={},
            started_at=datetime.utcnow()
        )
        
        db.session.add(assessment)
        db.session.commit()
        
        return jsonify({
            'message': 'Assessment started',
            'assessment_id': assessment.id,
            'level': level
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to start assessment', 'message': str(e)}), 500

@assessment_bp.route('/submit', methods=['POST'])
@token_required
def submit_assessment(current_user):
    """Submit assessment answers and calculate score"""
    try:
        data = request.get_json()
        
        assessment_id = data.get('assessment_id')
        answers = data.get('answers', {})  # {question_id: answer}
        level = data.get('level', 'beginner')
        
        if not assessment_id:
            return jsonify({'error': 'Assessment ID is required'}), 400
        
        # Get assessment
        assessment = Assessment.query.filter_by(
            id=assessment_id,
            user_id=current_user.id
        ).first()
        
        if not assessment:
            return jsonify({'error': 'Assessment not found'}), 404
        
        if assessment.completed_at:
            return jsonify({'error': 'Assessment already completed'}), 400
        
        # Get questions for this level
        service = get_assessment_service()
        questions = service.get_questions_for_level(level, count=20)
        
        # Calculate score
        score = service.calculate_score(questions, answers)
        
        # Update assessment
        assessment.answers = answers
        assessment.score = score
        assessment.completed_at = datetime.utcnow()
        
        # Update user skill level if they passed (80% or higher)
        if score >= 80:
            if level == 'beginner' and current_user.skill_level == 'beginner':
                current_user.skill_level = 'intermediate'
            elif level == 'intermediate' and current_user.skill_level == 'intermediate':
                current_user.skill_level = 'advanced'
        
        # Add points
        current_user.total_points += score // 10
        
        db.session.commit()
        
        return jsonify({
            'message': 'Assessment submitted successfully',
            'score': score,
            'total_questions': assessment.total_questions,
            'passed': score >= 80,
            'skill_level_updated': score >= 80,
            'new_skill_level': current_user.skill_level
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to submit assessment', 'message': str(e)}), 500

@assessment_bp.route('/results/<int:assessment_id>', methods=['GET'])
@token_required
def get_results(current_user, assessment_id):
    """Get assessment results with detailed feedback"""
    try:
        assessment = Assessment.query.filter_by(
            id=assessment_id,
            user_id=current_user.id
        ).first()
        
        if not assessment:
            return jsonify({'error': 'Assessment not found'}), 404
        
        # Get questions for detailed feedback
        service = get_assessment_service()
        questions = service.get_questions_for_level(assessment.level, count=20)
        
        # Build detailed results
        results = []
        for q in questions:
            user_answer = assessment.answers.get(q.id, '')
            is_correct = user_answer == q.correct_answer
            
            results.append({
                'question_id': q.id,
                'question': q.question_text,
                'user_answer': user_answer,
                'correct_answer': q.correct_answer,
                'is_correct': is_correct,
                'explanation': q.explanation
            })
        
        return jsonify({
            'assessment': assessment.to_dict(),
            'results': results,
            'score': assessment.score,
            'passed': assessment.score >= 80
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to fetch results', 'message': str(e)}), 500
