from app import db
from datetime import datetime

class CodeSubmission(db.Model):
    """Code submission model for compiler history"""
    __tablename__ = 'code_submissions'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    
    # Code details
    code = db.Column(db.Text, nullable=False)
    language = db.Column(db.String(20), default='java', nullable=False)  # Always 'java' for this project
    input_data = db.Column(db.Text, nullable=True)  # Input for the program
    
    # Execution results
    output = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), nullable=False)  # success, error, timeout
    execution_time = db.Column(db.Float, nullable=True)  # in seconds
    compilation_time = db.Column(db.Float, nullable=True)  # in seconds
    
    # Metadata
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    
    def to_dict(self):
        """Convert to dictionary"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'code': self.code,
            'language': self.language,
            'output': self.output,
            'status': self.status,
            'execution_time': self.execution_time,
            'compilation_time': self.compilation_time,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<CodeSubmission {self.id}>'
