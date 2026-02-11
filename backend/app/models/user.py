from app import db
from datetime import datetime
import bcrypt

class User(db.Model):
    """User model for authentication and profile"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=True)  # Nullable for OAuth users
    google_id = db.Column(db.String(255), unique=True, nullable=True, index=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    
    # User profile
    skill_level = db.Column(db.String(20), default='beginner')  # beginner, intermediate, advanced
    total_points = db.Column(db.Integer, default=0)
    
    # Relationships
    code_submissions = db.relationship('CodeSubmission', backref='user', lazy=True, cascade='all, delete-orphan')
    assessments = db.relationship('Assessment', backref='user', lazy=True, cascade='all, delete-orphan')
    
    def set_password(self, password):
        """Hash and set password"""
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    def check_password(self, password):
        """Check if password is correct"""
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))
    
    def to_dict(self):
        """Convert to dictionary"""
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'skill_level': self.skill_level,
            'total_points': self.total_points,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'last_login': self.last_login.isoformat() if self.last_login else None
        }
    
    def __repr__(self):
        return f'<User {self.username}>'
