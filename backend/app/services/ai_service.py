"""AI Service for code generation, explanation, and error fix suggestions using free models (Ollama/Hugging Face)"""
import os
import requests
import json
from typing import Dict, List, Optional
from app.config import Config

class AIService:
    """AI Service using Ollama (free, local) or Hugging Face Inference API"""
    
    def __init__(self):
        self.service_type = os.getenv('AI_SERVICE', 'ollama').lower()
        self.ollama_base_url = os.getenv('OLLAMA_BASE_URL', 'http://localhost:11434')
        self.ollama_model = os.getenv('OLLAMA_MODEL', 'codellama:13b')
        self.huggingface_api_key = os.getenv('HUGGINGFACE_API_KEY', '')
        
    def _build_ollama_prompt(self, task: str, context: str, java_code: Optional[str] = None) -> str:
        """Build prompt for Ollama/Codellama with Java-specific context"""
        base_prompt = f"""You are a Java programming expert and code assistant. 
Focus only on Java programming language. Provide clear, concise, and educational responses.

Task: {task}
"""
        if java_code:
            base_prompt += f"\nJava Code:\n```java\n{java_code}\n```\n"
        if context:
            base_prompt += f"\nContext: {context}\n"
        
        base_prompt += "\nProvide your response:"
        return base_prompt
    
    def generate_code(self, prompt: str, context: Optional[str] = None) -> str:
        """
        Generate Java code from natural language prompt
        
        Args:
            prompt: User's natural language request
            context: Optional context or previous conversation
            
        Returns:
            Generated Java code
        """
        if self.service_type == 'ollama':
            return self._generate_with_ollama(prompt, context)
        elif self.service_type == 'huggingface':
            return self._generate_with_huggingface(prompt, context)
        else:
            raise ValueError(f"Unknown AI service type: {self.service_type}")
    
    def explain_code(self, java_code: str) -> str:
        """
        Explain Java code with line-by-line analysis
        
        Args:
            java_code: Java code to explain
            
        Returns:
            Explanation text
        """
        task = "Explain this Java code line by line, including: concepts used, how it works, and what each part does."
        context = "Focus on Java syntax, OOP concepts, and best practices."
        
        if self.service_type == 'ollama':
            full_prompt = self._build_ollama_prompt(task, context, java_code)
            return self._generate_with_ollama(full_prompt)
        elif self.service_type == 'huggingface':
            full_prompt = f"Explain this Java code:\n```java\n{java_code}\n```"
            return self._generate_with_huggingface(full_prompt)
        else:
            raise ValueError(f"Unknown AI service type: {self.service_type}")
    
    def suggest_error_fix(self, error_message: str, code_context: str, error_type: str) -> Dict:
        """
        Suggest fix for compilation/runtime error
        
        Args:
            error_message: Error message from compiler/runtime
            code_context: Code snippet around the error
            error_type: Type of error (compilation_error, runtime_error, etc.)
            
        Returns:
            Dict with fix_suggestion, corrected_code, explanation
        """
        task = f"Fix this Java {error_type}: {error_message}"
        context = f"Provide: 1) Specific fix suggestion, 2) Corrected code snippet, 3) Brief explanation"
        
        if self.service_type == 'ollama':
            full_prompt = self._build_ollama_prompt(task, context, code_context)
            response = self._generate_with_ollama(full_prompt)
        elif self.service_type == 'huggingface':
            full_prompt = f"Fix Java error: {error_message}\nCode:\n{code_context}"
            response = self._generate_with_huggingface(full_prompt)
        else:
            raise ValueError(f"Unknown AI service type: {self.service_type}")
        
        # Parse response and extract fix
        return {
            'fix_suggestion': self._extract_fix_suggestion(response),
            'corrected_code': self._extract_code_snippet(response),
            'explanation': response[:500]  # First 500 chars as explanation
        }
    
    def improve_code(self, java_code: str, focus_areas: Optional[List[str]] = None) -> List[Dict]:
        """
        Suggest code improvements
        
        Args:
            java_code: Java code to improve
            focus_areas: Optional list of areas to focus on (optimization, best_practices, etc.)
            
        Returns:
            List of improvement suggestions with before/after code
        """
        focus = ', '.join(focus_areas) if focus_areas else 'optimization, best practices, code style'
        task = f"Suggest improvements for this Java code focusing on: {focus}"
        context = "For each improvement, provide: 1) Type of improvement, 2) Current code, 3) Improved code, 4) Reason"
        
        if self.service_type == 'ollama':
            full_prompt = self._build_ollama_prompt(task, context, java_code)
            response = self._generate_with_ollama(full_prompt)
        elif self.service_type == 'huggingface':
            full_prompt = f"Improve this Java code ({focus}):\n```java\n{java_code}\n```"
            response = self._generate_with_huggingface(full_prompt)
        else:
            raise ValueError(f"Unknown AI service type: {self.service_type}")
        
        # Parse improvements from response
        return self._parse_improvements(response, java_code)
    
    def _generate_with_ollama(self, prompt: str) -> str:
        """Generate response using Ollama API"""
        try:
            url = f"{self.ollama_base_url}/api/generate"
            payload = {
                "model": self.ollama_model,
                "prompt": prompt,
                "stream": False
            }
            
            response = requests.post(url, json=payload, timeout=120)
            response.raise_for_status()
            
            result = response.json()
            return result.get('response', '')
            
        except requests.exceptions.RequestException as e:
            raise Exception(f"Ollama API error: {str(e)}")
    
    def _generate_with_huggingface(self, prompt: str) -> str:
        """Generate response using Hugging Face Inference API"""
        if not self.huggingface_api_key:
            raise ValueError("Hugging Face API key not configured")
        
        try:
            # Using a code generation model
            model = "bigcode/starcoder"  # or "microsoft/CodeBERT"
            url = f"https://api-inference.huggingface.co/models/{model}"
            
            headers = {
                "Authorization": f"Bearer {self.huggingface_api_key}"
            }
            
            payload = {
                "inputs": prompt,
                "parameters": {
                    "max_new_tokens": 500,
                    "temperature": 0.7
                }
            }
            
            response = requests.post(url, headers=headers, json=payload, timeout=60)
            response.raise_for_status()
            
            result = response.json()
            if isinstance(result, list) and len(result) > 0:
                return result[0].get('generated_text', '')
            return str(result)
            
        except requests.exceptions.RequestException as e:
            raise Exception(f"Hugging Face API error: {str(e)}")
    
    def _extract_code_snippet(self, text: str) -> str:
        """Extract code block from AI response"""
        import re
        # Look for code blocks
        code_match = re.search(r'```java\n(.*?)\n```', text, re.DOTALL)
        if code_match:
            return code_match.group(1)
        
        code_match = re.search(r'```\n(.*?)\n```', text, re.DOTALL)
        if code_match:
            return code_match.group(1)
        
        return text[:300]  # Fallback: first 300 chars
    
    def _extract_fix_suggestion(self, text: str) -> str:
        """Extract fix suggestion from AI response"""
        # Look for suggestions (first paragraph or bullet point)
        lines = text.split('\n')
        for line in lines:
            if line.strip() and not line.startswith('```'):
                return line.strip()[:200]
        return text[:200]
    
    def _parse_improvements(self, response: str, original_code: str) -> List[Dict]:
        """Parse improvement suggestions from AI response"""
        improvements = []
        
        # Simple parsing - extract improvements from response
        # In production, you'd want more sophisticated parsing
        lines = response.split('\n')
        current_improvement = None
        
        for line in lines:
            if 'improvement' in line.lower() or 'suggestion' in line.lower():
                if current_improvement:
                    improvements.append(current_improvement)
                current_improvement = {
                    'type': 'optimization',
                    'suggestion': line.strip(),
                    'before': original_code[:200],
                    'after': '',
                    'reason': ''
                }
        
        if current_improvement:
            improvements.append(current_improvement)
        
        # If no improvements found, return a default one
        if not improvements:
            improvements.append({
                'type': 'general',
                'suggestion': 'Review code for Java best practices',
                'before': original_code[:200],
                'after': original_code[:200],
                'reason': 'Code structure looks good. Consider adding comments and error handling.'
            })
        
        return improvements

# Singleton instance
_ai_service_instance = None

def get_ai_service() -> AIService:
    """Get singleton AI service instance"""
    global _ai_service_instance
    if _ai_service_instance is None:
        _ai_service_instance = AIService()
    return _ai_service_instance
