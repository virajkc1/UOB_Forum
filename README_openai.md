# OpenAI Chat Script

A simple Python script to interact with OpenAI's API using your own API key.

## Setup

1. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

2. **Get your OpenAI API key:**
   - Go to [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Copy the key (starts with `sk-`)

## Usage

### Interactive Mode (Recommended)

Run the script without arguments to start an interactive chat:

```bash
python openai_chat.py
```

- Enter your API key when prompted
- Type your questions and get responses
- Type `quit` to exit
- Type `model` to change the AI model

### Command Line Mode

Ask a single question directly:

```bash
python openai_chat.py "your-api-key" "What is Python?" "gpt-4"
```

### Environment Variable

You can also set your API key as an environment variable:

```bash
# Windows
set OPENAI_API_KEY=your-api-key-here

# Mac/Linux
export OPENAI_API_KEY=your-api-key-here

# Then run interactive mode
python openai_chat.py
```

## Available Models

- `gpt-3.5-turbo` (default, cheaper, faster)
- `gpt-4` (more capable, slower, more expensive)
- `gpt-4-turbo` (latest GPT-4 model)

## Features

- ✅ Interactive chat mode
- ✅ Single question mode
- ✅ Model switching
- ✅ Error handling
- ✅ Environment variable support
- ✅ No dependencies on your forum project

## Example Usage

```
🤖 OpenAI Chat Script
==================================================
Enter your OpenAI API key: sk-...
✅ Connected to OpenAI!
💡 Type 'quit' to exit, 'model' to change model

You: What is the capital of France?
🤖 Thinking...
AI: The capital of France is Paris.

You: model
Current model: gpt-3.5-turbo. Enter new model: gpt-4
✅ Model changed to: gpt-4

You: quit
👋 Goodbye!
```
