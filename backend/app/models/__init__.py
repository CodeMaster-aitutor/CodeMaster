from app.models.user import User
from app.models.code_submission import CodeSubmission
from app.models.assessment import Assessment, Question
from app.models.analytics import AnalyticsEvent

__all__ = ['User', 'CodeSubmission', 'Assessment', 'Question', 'AnalyticsEvent']

# Import models for Flask-Migrate to detect them
from app import db
