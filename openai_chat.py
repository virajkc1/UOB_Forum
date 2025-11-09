#!/usr/bin/env python3
"""
Simple OpenAI Chat Script
A standalone script to interact with OpenAI's API using your own API key.
"""

import openai
import os
from typing import Optional

def setup_openai_client(api_key: Optional[str] = None) -> openai.OpenAI:
    """
    Set up OpenAI client with API key.
    
    Args:
        api_key: Your OpenAI API key. If None, will try to get from environment variable.
    
    Returns:
        OpenAI client instance
    """
    if api_key is None:
        api_key = os.getenv('OPENAI_API_KEY')
    
    if not api_key:
        raise ValueError(
            "OpenAI API key not found. Please provide it as an argument or set OPENAI_API_KEY environment variable."
        )
    
    return openai.OpenAI(api_key=api_key)

def chat_with_openai(client: openai.OpenAI, message: str, model: str = "gpt-3.5-turbo") -> str:
    """
    Send a message to OpenAI and get a response.
    
    Args:
        client: OpenAI client instance
        message: Your message/question
        model: OpenAI model to use (default: gpt-3.5-turbo)
    
    Returns:
        OpenAI's response
    """
    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "user", "content": message}
            ],
            max_tokens=1000,
            temperature=0.7
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error: {str(e)}"

def interactive_chat():
    """
    Interactive chat mode - keep asking questions until you type 'quit'.
    """
    print("🤖 OpenAI Chat Script")
    print("=" * 50)
    
    # Get API key
    api_key = input("Enter your OpenAI API key (or press Enter to use OPENAI_API_KEY env var): ").strip()
    if not api_key:
        api_key = None
    
    try:
        client = setup_openai_client(api_key)
        print("✅ Connected to OpenAI!")
        print("💡 Type 'quit' to exit, 'model' to change model")
        print()
        
        model = "gpt-3.5-turbo"
        
        while True:
            user_input = input("You: ").strip()
            
            if user_input.lower() == 'quit':
                print("👋 Goodbye!")
                break
            elif user_input.lower() == 'model':
                new_model = input(f"Current model: {model}. Enter new model (or press Enter to keep current): ").strip()
                if new_model:
                    model = new_model
                    print(f"✅ Model changed to: {model}")
                continue
            elif not user_input:
                continue
            
            print("🤖 Thinking...")
            response = chat_with_openai(client, user_input, model)
            print(f"AI: {response}")
            print()
    
    except Exception as e:
        print(f"❌ Error: {e}")

def single_question(api_key: str, question: str, model: str = "gpt-3.5-turbo"):
    """
    Ask a single question and get an answer.
    
    Args:
        api_key: Your OpenAI API key
        question: Your question
        model: OpenAI model to use
    """
    try:
        client = setup_openai_client(api_key)
        response = chat_with_openai(client, question, model)
        print(f"Question: {question}")
        print(f"Answer: {response}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        # Command line mode
        if len(sys.argv) < 3:
            print("Usage: python openai_chat.py <api_key> <question> [model]")
            print("Example: python openai_chat.py sk-... 'What is Python?' gpt-4")
            sys.exit(1)
        
        api_key = sys.argv[1]
        question = sys.argv[2]
        model = sys.argv[3] if len(sys.argv) > 3 else "gpt-3.5-turbo"
        
        single_question(api_key, question, model)
    else:
        # Interactive mode
        interactive_chat()
