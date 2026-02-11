from flask import Blueprint, request, jsonify
from app import db
from app.models.code_submission import CodeSubmission
from app.middleware.auth import token_required
from app.services.java_executor import get_java_executor
from app.services.ai_service import get_ai_service
from datetime import datetime

compiler_bp = Blueprint('compiler', __name__)

@compiler_bp.route('/execute', methods=['POST'])
@token_required
def execute_code(current_user):
    """Compile and execute Java code with error detection"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        java_code = data.get('code', '').strip()
        
        if not java_code:
            return jsonify({'error': 'Java code is required'}), 400
        
        # Execute Java code
        executor = get_java_executor()
        result = executor.compile_and_execute(java_code)
        
        # Get AI suggestions if there are errors
        ai_suggestions = None
        improvements = None
        
        if not result["success"] and result.get("errors"):
            # Get AI fix suggestions for first error
            first_error = result["errors"][0]
            ai_service = get_ai_service()
            
            try:
                ai_suggestions = ai_service.suggest_error_fix(
                    error_message=first_error["message"],
                    code_context=java_code,
                    error_type=first_error["type"]
                )
                
                # Add AI suggestions to error object
                first_error["ai_fix_suggestion"] = ai_suggestions.get("fix_suggestion", "")
                first_error["corrected_code"] = ai_suggestions.get("corrected_code", "")
                first_error["explanation"] = ai_suggestions.get("explanation", "")
            except Exception as e:
                # AI service failed, continue without suggestions
                print(f"AI suggestion error: {e}")
        
        # Get code improvements (always try to improve)
        try:
            ai_service = get_ai_service()
            improvements = ai_service.improve_code(java_code)
        except Exception as e:
            print(f"AI improvement error: {e}")
            improvements = []
        
        # Save submission to database
        submission = CodeSubmission(
            user_id=current_user.id,
            code=java_code,
            language='java',
            output=result.get("output", ""),
            status='success' if result["success"] else 'error',
            execution_time=result.get("execution_time", 0),
            compilation_time=result.get("compilation_time", 0)
        )
        db.session.add(submission)
        db.session.commit()
        
        # Build response
        response = {
            "success": result["success"],
            "output": result.get("output", ""),
            "errors": result.get("errors", []),
            "improvements": improvements or [],
            "execution_time": result.get("execution_time", 0),
            "compilation_time": result.get("compilation_time", 0),
            "submission_id": submission.id
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Compilation failed', 'message': str(e)}), 500

@compiler_bp.route('/check', methods=['POST'])
@token_required
def check_syntax(current_user):
    """Quick syntax check without execution"""
    try:
        data = request.get_json()
        java_code = data.get('code', '').strip()
        
        if not java_code:
            return jsonify({'error': 'Java code is required'}), 400
        
        executor = get_java_executor()
        # For syntax check, we only compile (don't execute)
        # This is a simplified version - in production, you'd have a separate compile-only method
        result = executor.compile_and_execute(java_code)
        
        return jsonify({
            "is_valid": result["success"],
            "errors": result.get("errors", []),
            "warnings": []
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Syntax check failed', 'message': str(e)}), 500

@compiler_bp.route('/suggest-fix', methods=['POST'])
@token_required
def suggest_fix(current_user):
    """Get AI-powered fix suggestion for specific error"""
    try:
        data = request.get_json()
        error_message = data.get('error', '')
        code_context = data.get('code_context', '')
        error_type = data.get('error_type', 'compilation_error')
        
        if not error_message or not code_context:
            return jsonify({'error': 'Error message and code context are required'}), 400
        
        ai_service = get_ai_service()
        suggestion = ai_service.suggest_error_fix(error_message, code_context, error_type)
        
        return jsonify(suggestion), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to generate fix suggestion', 'message': str(e)}), 500

@compiler_bp.route('/improve-code', methods=['POST'])
@token_required
def improve_code(current_user):
    """Get code improvement suggestions"""
    try:
        data = request.get_json()
        java_code = data.get('code', '').strip()
        focus_areas = data.get('focus_areas', None)
        
        if not java_code:
            return jsonify({'error': 'Java code is required'}), 400
        
        ai_service = get_ai_service()
        improvements = ai_service.improve_code(java_code, focus_areas)
        
        return jsonify({"improvements": improvements}), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to analyze code', 'message': str(e)}), 500

@compiler_bp.route('/analyze', methods=['POST'])
@token_required
def analyze_code(current_user):
    """Analyze code for errors and improvements"""
    try:
        data = request.get_json()
        java_code = data.get('code', '').strip()
        
        if not java_code:
            return jsonify({'error': 'Java code is required'}), 400
        
        # Compile to check for errors
        executor = get_java_executor()
        result = executor.compile_and_execute(java_code)
        
        # Get improvements
        ai_service = get_ai_service()
        improvements = []
        try:
            improvements = ai_service.improve_code(java_code)
        except:
            pass
        
        return jsonify({
            "errors": result.get("errors", []),
            "improvements": improvements,
            "code_quality_score": 100 - (len(result.get("errors", [])) * 10),
            "suggestions": improvements
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Code analysis failed', 'message': str(e)}), 500

@compiler_bp.route('/submissions', methods=['GET'])
@token_required
def get_submissions(current_user):
    """Get user's submission history"""
    try:
        limit = request.args.get('limit', 20, type=int)
        submissions = CodeSubmission.query.filter_by(user_id=current_user.id)\
            .order_by(CodeSubmission.created_at.desc())\
            .limit(limit)\
            .all()
        
        return jsonify({
            "submissions": [sub.to_dict() for sub in submissions]
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to fetch submissions', 'message': str(e)}), 500
