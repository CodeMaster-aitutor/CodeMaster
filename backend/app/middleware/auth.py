"""Authentication middleware and decorators"""
from functools import wraps
from flask import jsonify, request
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity, get_jwt
from app import db
from app.models.user import User

def token_required(f):
    """Decorator to require JWT token"""
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            verify_jwt_in_request()
            current_user_id = get_jwt_identity()
            current_user = User.query.get(current_user_id)
            
            if not current_user:
                return jsonify({'error': 'User not found'}), 404
            
            # Add current_user to kwargs
            kwargs['current_user'] = current_user
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({'error': 'Invalid or expired token', 'message': str(e)}), 401
    
    return decorated

def get_current_user():
    """Get current user from JWT token"""
    try:
        verify_jwt_in_request()
        user_id = get_jwt_identity()
        return User.query.get(user_id)
    except Exception:
        return None
