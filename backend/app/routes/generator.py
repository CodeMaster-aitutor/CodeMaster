from flask import Blueprint, request, jsonify
from app.middleware.auth import token_required
from app.services.ai_service import get_ai_service

generator_bp = Blueprint('generator', __name__)

@generator_bp.route('/generate', methods=['POST'])
@token_required
def generate_code(current_user):
    """AI code generation endpoint"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        prompt = data.get('prompt', '').strip()
        context = data.get('context', None)
        
        if not prompt:
            return jsonify({'error': 'Prompt is required'}), 400
        
        # Generate code using AI service
        ai_service = get_ai_service()
        generated_code = ai_service.generate_code(prompt, context)
        
        return jsonify({
            'message': 'Code generated successfully',
            'code': generated_code,
            'prompt': prompt
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Code generation failed', 'message': str(e)}), 500

@generator_bp.route('/chat', methods=['POST'])
@token_required
def chat(current_user):
    """Chat-based code generation endpoint"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        message = data.get('message', '').strip()
        history = data.get('history', [])
        
        if not message:
            return jsonify({'error': 'Message is required'}), 400
        
        # Build context from chat history
        context = None
        if history:
            context = "\n".join([f"{h.get('role', 'user')}: {h.get('content', '')}" for h in history[-5:]])
        
        # Generate response
        ai_service = get_ai_service()
        response = ai_service.generate_code(message, context)
        
        return jsonify({
            'message': response,
            'role': 'assistant'
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Chat failed', 'message': str(e)}), 500

@generator_bp.route('/history', methods=['GET'])
@token_required
def get_history(current_user):
    """Get generation history endpoint"""
    # TODO: Implement history storage and retrieval
    return jsonify({
        'message': 'History endpoint - to be implemented',
        'history': []
    }), 200
