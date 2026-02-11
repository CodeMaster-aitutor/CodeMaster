from app import db
from datetime import datetime
import json

class Question(db.Model):
    """Assessment question model"""
    __tablename__ = 'questions'
    
    id = db.Column(db.Integer, primary_key=True)
    question_text = db.Column(db.Text, nullable=False)
    question_type = db.Column(db.String(30), nullable=False)  # multiple-choice, code-completion, debugging
    options = db.Column(db.JSON, nullable=True)  # For multiple choice
    correct_answer = db.Column(db.Text, nullable=False)
    explanation = db.Column(db.Text, nullable=False)
    difficulty = db.Column(db.String(20), nullable=False)  # beginner, intermediate, advanced
    tags = db.Column(db.JSON, nullable=True)  # Java topics covered
    
    # Metadata
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        """Convert to dictionary"""
        return {
            'id': self.id,
            'question': self.question_text,
            'type': self.question_type,
            'options': self.options,
            'correct_answer': self.correct_answer,
            'explanation': self.explanation,
            'difficulty': self.difficulty,
            'tags': self.tags
        }
    
    def __repr__(self):
        return f'<Question {self.id}>'

class Assessment(db.Model):
    """Assessment attempt model"""
    __tablename__ = 'assessments'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    
    # Assessment details
    level = db.Column(db.String(20), nullable=False)  # beginner, intermediate, advanced
    score = db.Column(db.Integer, nullable=False)  # Percentage score
    total_questions = db.Column(db.Integer, nullable=False, default=20)
    answers = db.Column(db.JSON, nullable=False)  # User's answers: {question_id: answer}
    
    # Timestamps
    started_at = db.Column(db.DateTime, default=datetime.utcnow)
    completed_at = db.Column(db.DateTime, nullable=True)
    
    def to_dict(self):
        """Convert to dictionary"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'level': self.level,
            'score': self.score,
            'total_questions': self.total_questions,
            'started_at': self.started_at.isoformat() if self.started_at else None,
            'completed_at': self.completed_at.isoformat() if self.completed_at else None
        }
    
    def __repr__(self):
        return f'<Assessment {self.id} - Score: {self.score}%>'
