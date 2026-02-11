from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from app.config import config
import os

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
cors = CORS()

def create_app(config_name=None):
    """Application factory pattern"""
    app = Flask(__name__)
    
    # Load configuration
    config_name = config_name or os.getenv('FLASK_ENV', 'development')
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app, origins=app.config['CORS_ORIGINS'])
    
    # Register blueprints
    from app.routes.auth import auth_bp
    from app.routes.generator import generator_bp
    from app.routes.explainer import explainer_bp
    from app.routes.compiler import compiler_bp
    from app.routes.assessment import assessment_bp
    from app.routes.analytics import analytics_bp
    from app.routes.dashboard import dashboard_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(generator_bp, url_prefix='/api/generator')
    app.register_blueprint(explainer_bp, url_prefix='/api/explainer')
    app.register_blueprint(compiler_bp, url_prefix='/api/compiler')
    app.register_blueprint(assessment_bp, url_prefix='/api/assessment')
    app.register_blueprint(analytics_bp, url_prefix='/api/analytics')
    app.register_blueprint(dashboard_bp, url_prefix='/api/dashboard')
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return {'error': 'Not found'}, 404
    
    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return {'error': 'Internal server error'}, 500
    
    # Health check endpoint
    @app.route('/api/health')
    def health_check():
        return {'status': 'healthy', 'service': 'CodeMaster Backend'}
    
    return app
