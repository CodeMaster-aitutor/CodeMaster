"""Assessment service for managing Java assessments"""
from app import db
from app.models.assessment import Question, Assessment
from typing import List, Dict

class AssessmentService:
    """Service for managing assessments and questions"""
    
    def get_questions_for_level(self, level: str, count: int = 20) -> List[Question]:
        """Get questions for a specific level"""
        questions = Question.query.filter_by(difficulty=level)\
            .limit(count)\
            .all()
        
        # If not enough questions in DB, return sample questions
        if len(questions) < count:
            questions = self._get_sample_questions(level, count)
        
        return questions
    
    def calculate_score(self, questions: List[Question], answers: Dict[int, str]) -> int:
        """Calculate score percentage"""
        correct = 0
        total = len(questions)
        
        for question in questions:
            user_answer = answers.get(question.id, '')
            if user_answer == question.correct_answer:
                correct += 1
        
        return int((correct / total) * 100) if total > 0 else 0
    
    def _get_sample_questions(self, level: str, count: int) -> List[Question]:
        """Get sample questions if database is empty"""
        # These are fallback questions - should be seeded in database
        sample_questions = []
        
        if level == 'beginner':
            sample_questions = self._get_beginner_questions()
        elif level == 'intermediate':
            sample_questions = self._get_intermediate_questions()
        elif level == 'advanced':
            sample_questions = self._get_advanced_questions()
        
        return sample_questions[:count]
    
    def _get_beginner_questions(self) -> List[Question]:
        """Sample beginner Java questions"""
        questions_data = [
            {
                'question_text': 'What is the correct way to declare a variable in Java?',
                'question_type': 'multiple-choice',
                'options': ['var x = 5;', 'int x = 5;', 'x = 5;', 'declare x = 5;'],
                'correct_answer': 'int x = 5;',
                'explanation': 'In Java, you must specify the data type when declaring a variable.',
                'difficulty': 'beginner'
            },
            {
                'question_text': 'Which of the following is NOT a primitive data type in Java?',
                'question_type': 'multiple-choice',
                'options': ['int', 'boolean', 'String', 'double'],
                'correct_answer': 'String',
                'explanation': 'String is a reference type, not a primitive type in Java.',
                'difficulty': 'beginner'
            },
            {
                'question_text': 'Complete the following method to print "Hello World":\n\npublic static void main(String[] args) {\n    // Your code here\n}',
                'question_type': 'code-completion',
                'options': None,
                'correct_answer': 'System.out.println("Hello World");',
                'explanation': 'System.out.println() is used to print text to the console in Java.',
                'difficulty': 'beginner'
            },
            {
                'question_text': 'What is the result of 10 % 3 in Java?',
                'question_type': 'multiple-choice',
                'options': ['3', '1', '0', '10'],
                'correct_answer': '1',
                'explanation': 'The modulo operator (%) returns the remainder of division. 10 divided by 3 is 3 with remainder 1.',
                'difficulty': 'beginner'
            },
            {
                'question_text': 'Find the error in this code:\n\nint x = 5\nSystem.out.println(x);',
                'question_type': 'debugging',
                'options': None,
                'correct_answer': 'Missing semicolon after int x = 5',
                'explanation': 'Every statement in Java must end with a semicolon.',
                'difficulty': 'beginner'
            }
        ]
        
        questions = []
        for i, q_data in enumerate(questions_data, 1):
            q = Question(**q_data)
            q.id = i  # Temporary ID for in-memory questions
            questions.append(q)
        
        return questions
    
    def _get_intermediate_questions(self) -> List[Question]:
        """Sample intermediate Java questions"""
        questions_data = [
            {
                'question_text': 'What is the time complexity of binary search?',
                'question_type': 'multiple-choice',
                'options': ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
                'correct_answer': 'O(log n)',
                'explanation': 'Binary search divides the search space in half with each iteration.',
                'difficulty': 'intermediate'
            },
            {
                'question_text': 'Implement a method to reverse a string:\n\npublic static String reverse(String str) {\n    // Your implementation here\n}',
                'question_type': 'code-completion',
                'options': None,
                'correct_answer': 'return new StringBuilder(str).reverse().toString();',
                'explanation': 'StringBuilder provides an efficient reverse() method.',
                'difficulty': 'intermediate'
            },
            {
                'question_text': 'Which design pattern ensures a class has only one instance?',
                'question_type': 'multiple-choice',
                'options': ['Factory', 'Singleton', 'Observer', 'Strategy'],
                'correct_answer': 'Singleton',
                'explanation': 'The Singleton pattern restricts instantiation to a single object.',
                'difficulty': 'intermediate'
            }
        ]
        
        questions = []
        for i, q_data in enumerate(questions_data, 21):
            q = Question(**q_data)
            q.id = i
            questions.append(q)
        
        return questions
    
    def _get_advanced_questions(self) -> List[Question]:
        """Sample advanced Java questions"""
        questions_data = [
            {
                'question_text': 'What is the space complexity of merge sort?',
                'question_type': 'multiple-choice',
                'options': ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
                'correct_answer': 'O(n)',
                'explanation': 'Merge sort requires additional space for the temporary arrays used during merging.',
                'difficulty': 'advanced'
            },
            {
                'question_text': 'Implement a thread-safe singleton pattern:\n\npublic class Singleton {\n    // Your implementation here\n}',
                'question_type': 'code-completion',
                'options': None,
                'correct_answer': 'private static volatile Singleton instance;\nprivate Singleton() {}\npublic static Singleton getInstance() {\n    if (instance == null) {\n        synchronized (Singleton.class) {\n            if (instance == null) {\n                instance = new Singleton();\n            }\n        }\n    }\n    return instance;\n}',
                'explanation': 'Double-checked locking with volatile ensures thread safety and performance.',
                'difficulty': 'advanced'
            }
        ]
        
        questions = []
        for i, q_data in enumerate(questions_data, 24):
            q = Question(**q_data)
            q.id = i
            questions.append(q)
        
        return questions

# Singleton instance
_assessment_service_instance = None

def get_assessment_service() -> AssessmentService:
    """Get singleton assessment service instance"""
    global _assessment_service_instance
    if _assessment_service_instance is None:
        _assessment_service_instance = AssessmentService()
    return _assessment_service_instance
