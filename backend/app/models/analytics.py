from app import db
from datetime import datetime

class AnalyticsEvent(db.Model):
    """Analytics event model for tracking user activity"""
    __tablename__ = 'analytics_events'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    
    # Event details
    event_type = db.Column(db.String(50), nullable=False)  # code_submission, assessment, practice, etc.
    event_data = db.Column(db.JSON, nullable=True)  # Additional event data
    
    # Metadata
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    
    def to_dict(self):
        """Convert to dictionary"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'event_type': self.event_type,
            'event_data': self.event_data,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<AnalyticsEvent {self.event_type}>'
