import unittest
import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from unittest.mock import patch
from flask_jwt_extended import create_access_token
from app import create_app, db
from app.models.user import User


class CompilerFlowTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app.config['TESTING'] = True
        self.app.config['JWT_SECRET_KEY'] = 'test-secret-key-32bytes-long-123456'
        self.client = self.app.test_client()
        self.ai_patcher = patch('app.routes.compiler.get_ai_service')
        self.mock_ai_service = self.ai_patcher.start()
        class StubAIService:
            def suggest_error_fix(self, error_message, code_context, error_type):
                return {}
            def improve_code(self, code, focus_areas=None):
                return []
        self.mock_ai_service.return_value = StubAIService()
        with self.app.app_context():
            db.create_all()
            user = User(email='test@example.com', username='tester')
            user.set_password('Test1234')
            db.session.add(user)
            db.session.commit()
            self.user_id = user.id
            self.token = create_access_token(identity=str(self.user_id))
        self.headers = {'Authorization': f'Bearer {self.token}'}

    def tearDown(self):
        self.ai_patcher.stop()
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_execute_success(self):
        with patch('app.routes.compiler.get_java_executor') as get_executor:
            class StubExecutor:
                def compile_and_execute(self, code):
                    return {
                        "success": True,
                        "output": "123\n",
                        "errors": [],
                        "execution_time": 0.1,
                        "compilation_time": 0.2
                    }
            get_executor.return_value = StubExecutor()
            response = self.client.post(
                '/api/compiler/execute',
                json={'code': 'public class Main { public static void main(String[] args){ System.out.println(123); } }', 'language': 'java'},
                headers=self.headers
            )
            self.assertEqual(response.status_code, 200)
            data = response.get_json()
            self.assertTrue(data['success'])
            self.assertEqual(data['output'], '123\n')
            self.assertIn('request_id', data)

    def test_execute_validation_empty(self):
        response = self.client.post(
            '/api/compiler/execute',
            json={'code': '', 'language': 'java'},
            headers=self.headers
        )
        self.assertEqual(response.status_code, 400)
        data = response.get_json()
        self.assertIn('request_id', data)

    def test_execute_validation_language(self):
        response = self.client.post(
            '/api/compiler/execute',
            json={'code': 'print(1)', 'language': 'python'},
            headers=self.headers
        )
        self.assertEqual(response.status_code, 400)
        data = response.get_json()
        self.assertIn('request_id', data)

    def test_execute_error_response(self):
        with patch('app.routes.compiler.get_java_executor') as get_executor:
            class StubExecutor:
                def compile_and_execute(self, code):
                    return {
                        "success": False,
                        "output": "",
                        "errors": [{"line": 1, "message": "error", "type": "compilation_error"}],
                        "execution_time": 0,
                        "compilation_time": 0.1
                    }
            get_executor.return_value = StubExecutor()
            response = self.client.post(
                '/api/compiler/execute',
                json={'code': 'public class Main {', 'language': 'java'},
                headers=self.headers
            )
            self.assertEqual(response.status_code, 200)
            data = response.get_json()
            self.assertFalse(data['success'])
            self.assertIn('request_id', data)

    def test_execute_unauthorized(self):
        response = self.client.post(
            '/api/compiler/execute',
            json={'code': 'public class Main { public static void main(String[] args){ System.out.println(1); } }', 'language': 'java'}
        )
        self.assertEqual(response.status_code, 401)


if __name__ == '__main__':
    unittest.main()
