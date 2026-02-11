"""
Seed the database with 20 Java assessment questions
Run this after initializing the database to populate questions
"""
from app import create_app, db
from app.models.assessment import Question

app = create_app()

def seed_questions():
    """Seed database with 20 Java questions"""
    with app.app_context():
        # Check if questions already exist
        if Question.query.count() > 0:
            print("✓ Questions already exist in database")
            return
        
        questions_data = [
            # Beginner questions (7 questions)
            {
                'question_text': 'What is the correct way to declare a variable in Java?',
                'question_type': 'multiple-choice',
                'options': ['var x = 5;', 'int x = 5;', 'x = 5;', 'declare x = 5;'],
                'correct_answer': 'int x = 5;',
                'explanation': 'In Java, you must specify the data type when declaring a variable.',
                'difficulty': 'beginner',
                'tags': ['variables', 'declaration']
            },
            {
                'question_text': 'Which of the following is NOT a primitive data type in Java?',
                'question_type': 'multiple-choice',
                'options': ['int', 'boolean', 'String', 'double'],
                'correct_answer': 'String',
                'explanation': 'String is a reference type, not a primitive type in Java.',
                'difficulty': 'beginner',
                'tags': ['data-types', 'primitives']
            },
            {
                'question_text': 'Complete the following method to print "Hello World":\n\npublic static void main(String[] args) {\n    // Your code here\n}',
                'question_type': 'code-completion',
                'options': None,
                'correct_answer': 'System.out.println("Hello World");',
                'explanation': 'System.out.println() is used to print text to the console in Java.',
                'difficulty': 'beginner',
                'tags': ['output', 'console']
            },
            {
                'question_text': 'What is the result of 10 % 3 in Java?',
                'question_type': 'multiple-choice',
                'options': ['3', '1', '0', '10'],
                'correct_answer': '1',
                'explanation': 'The modulo operator (%) returns the remainder of division. 10 divided by 3 is 3 with remainder 1.',
                'difficulty': 'beginner',
                'tags': ['operators', 'modulo']
            },
            {
                'question_text': 'Find the error in this code:\n\nint x = 5\nSystem.out.println(x);',
                'question_type': 'debugging',
                'options': None,
                'correct_answer': 'Missing semicolon after int x = 5',
                'explanation': 'Every statement in Java must end with a semicolon.',
                'difficulty': 'beginner',
                'tags': ['syntax', 'errors']
            },
            {
                'question_text': 'What keyword is used to create a new object in Java?',
                'question_type': 'multiple-choice',
                'options': ['new', 'create', 'object', 'make'],
                'correct_answer': 'new',
                'explanation': 'The "new" keyword is used to instantiate objects in Java.',
                'difficulty': 'beginner',
                'tags': ['objects', 'instantiation']
            },
            {
                'question_text': 'Which method is the entry point of a Java application?',
                'question_type': 'multiple-choice',
                'options': ['init()', 'start()', 'main()', 'run()'],
                'correct_answer': 'main()',
                'explanation': 'The main() method is the entry point where Java program execution begins.',
                'difficulty': 'beginner',
                'tags': ['methods', 'main']
            },
            
            # Intermediate questions (8 questions)
            {
                'question_text': 'What is the time complexity of binary search?',
                'question_type': 'multiple-choice',
                'options': ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
                'correct_answer': 'O(log n)',
                'explanation': 'Binary search divides the search space in half with each iteration.',
                'difficulty': 'intermediate',
                'tags': ['algorithms', 'complexity']
            },
            {
                'question_text': 'Implement a method to reverse a string:\n\npublic static String reverse(String str) {\n    // Your implementation here\n}',
                'question_type': 'code-completion',
                'options': None,
                'correct_answer': 'return new StringBuilder(str).reverse().toString();',
                'explanation': 'StringBuilder provides an efficient reverse() method.',
                'difficulty': 'intermediate',
                'tags': ['strings', 'algorithms']
            },
            {
                'question_text': 'Which design pattern ensures a class has only one instance?',
                'question_type': 'multiple-choice',
                'options': ['Factory', 'Singleton', 'Observer', 'Strategy'],
                'correct_answer': 'Singleton',
                'explanation': 'The Singleton pattern restricts instantiation to a single object.',
                'difficulty': 'intermediate',
                'tags': ['design-patterns', 'singleton']
            },
            {
                'question_text': 'Fix the infinite loop:\n\nfor(int i = 0; i < 10; i--) {\n    System.out.println(i);\n}',
                'question_type': 'debugging',
                'options': None,
                'correct_answer': 'Change i-- to i++',
                'explanation': 'The loop decrements i instead of incrementing, causing an infinite loop.',
                'difficulty': 'intermediate',
                'tags': ['loops', 'debugging']
            },
            {
                'question_text': 'What is the difference between == and .equals() in Java?',
                'question_type': 'multiple-choice',
                'options': [
                    'No difference',
                    '== compares references, .equals() compares content',
                    '== compares content, .equals() compares references',
                    'Both compare references'
                ],
                'correct_answer': '== compares references, .equals() compares content',
                'explanation': '== checks if two references point to the same object, while .equals() compares the actual content.',
                'difficulty': 'intermediate',
                'tags': ['strings', 'comparison']
            },
            {
                'question_text': 'What is the output of this code?\n\nString s1 = new String("Hello");\nString s2 = new String("Hello");\nSystem.out.println(s1 == s2);',
                'question_type': 'multiple-choice',
                'options': ['true', 'false', 'compile error', 'runtime error'],
                'correct_answer': 'false',
                'explanation': '== compares references. s1 and s2 are different objects, so it prints false.',
                'difficulty': 'intermediate',
                'tags': ['strings', 'references']
            },
            {
                'question_text': 'Which collection class is synchronized by default in Java?',
                'question_type': 'multiple-choice',
                'options': ['ArrayList', 'LinkedList', 'Vector', 'HashSet'],
                'correct_answer': 'Vector',
                'explanation': 'Vector is synchronized by default, making it thread-safe but slower.',
                'difficulty': 'intermediate',
                'tags': ['collections', 'threading']
            },
            {
                'question_text': 'What does the "final" keyword mean when applied to a method?',
                'question_type': 'multiple-choice',
                'options': [
                    'Method cannot be overridden',
                    'Method cannot be called',
                    'Method returns a constant value',
                    'Method cannot be modified'
                ],
                'correct_answer': 'Method cannot be overridden',
                'explanation': 'A final method cannot be overridden in subclasses.',
                'difficulty': 'intermediate',
                'tags': ['inheritance', 'final']
            },
            
            # Advanced questions (5 questions)
            {
                'question_text': 'What is the space complexity of merge sort?',
                'question_type': 'multiple-choice',
                'options': ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
                'correct_answer': 'O(n)',
                'explanation': 'Merge sort requires additional space for the temporary arrays used during merging.',
                'difficulty': 'advanced',
                'tags': ['algorithms', 'complexity']
            },
            {
                'question_text': 'Implement a thread-safe singleton pattern:\n\npublic class Singleton {\n    // Your implementation here\n}',
                'question_type': 'code-completion',
                'options': None,
                'correct_answer': 'private static volatile Singleton instance;\nprivate Singleton() {}\npublic static Singleton getInstance() {\n    if (instance == null) {\n        synchronized (Singleton.class) {\n            if (instance == null) {\n                instance = new Singleton();\n            }\n        }\n    }\n    return instance;\n}',
                'explanation': 'Double-checked locking with volatile ensures thread safety and performance.',
                'difficulty': 'advanced',
                'tags': ['design-patterns', 'threading', 'singleton']
            },
            {
                'question_text': 'Which garbage collector is best for low-latency applications?',
                'question_type': 'multiple-choice',
                'options': ['G1GC', 'ZGC', 'Parallel GC', 'Serial GC'],
                'correct_answer': 'ZGC',
                'explanation': 'ZGC is designed for ultra-low latency with pause times under 10ms.',
                'difficulty': 'advanced',
                'tags': ['jvm', 'gc', 'performance']
            },
            {
                'question_text': 'Identify the memory leak in this code:\n\npublic class Cache {\n    private Map<String, Object> cache = new HashMap<>();\n    public void put(String key, Object value) {\n        cache.put(key, value);\n    }\n}',
                'question_type': 'debugging',
                'options': None,
                'correct_answer': 'No removal mechanism - cache grows indefinitely',
                'explanation': 'Without a removal strategy, the cache will consume memory indefinitely.',
                'difficulty': 'advanced',
                'tags': ['memory', 'debugging', 'collections']
            },
            {
                'question_text': 'What is the happens-before relationship in Java concurrency?',
                'question_type': 'multiple-choice',
                'options': [
                    'Execution order guarantee',
                    'Memory visibility guarantee',
                    'Thread priority system',
                    'Lock acquisition order'
                ],
                'correct_answer': 'Memory visibility guarantee',
                'explanation': 'Happens-before ensures that memory writes by one thread are visible to reads by another thread.',
                'difficulty': 'advanced',
                'tags': ['concurrency', 'threading', 'memory']
            }
        ]
        
        # Create and insert questions
        for q_data in questions_data:
            question = Question(**q_data)
            db.session.add(question)
        
        db.session.commit()
        print(f"✓ Successfully seeded {len(questions_data)} Java questions into database")
        print(f"  - Beginner: {len([q for q in questions_data if q['difficulty'] == 'beginner'])}")
        print(f"  - Intermediate: {len([q for q in questions_data if q['difficulty'] == 'intermediate'])}")
        print(f"  - Advanced: {len([q for q in questions_data if q['difficulty'] == 'advanced'])}")

if __name__ == '__main__':
    seed_questions()
