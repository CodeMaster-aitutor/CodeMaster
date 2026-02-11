"""
Bootstrap script to initialize Flask app and database
Run this once to set up the database
"""
from app import create_app, db
from app.models import User, CodeSubmission, Assessment, Question, AnalyticsEvent

app = create_app()

def init_db():
    """Initialize database tables"""
    with app.app_context():
        # Create all tables
        db.create_all()
        print("✓ Database tables created successfully")
        
        admin_email = 'admin@codemaster.com'
        existing_admin = User.query.filter_by(email=admin_email).first()
        if not existing_admin:
            legacy_admin = User.query.filter_by(email='admin@CodeMaster.com').first()
            if legacy_admin:
                legacy_admin.email = admin_email
                db.session.commit()
                print("✓ Admin email normalized to lowercase (admin@codemaster.com)")
            else:
                admin = User(
                    email=admin_email,
                    username='admin',
                    skill_level='advanced',
                    total_points=0
                )
                admin.set_password('admin123')
                db.session.add(admin)
                db.session.commit()
                print("✓ Admin user created (email: admin@codemaster.com, password: admin123)")
        
        print("\n✓ Database initialization complete!")

if __name__ == '__main__':
    init_db()
