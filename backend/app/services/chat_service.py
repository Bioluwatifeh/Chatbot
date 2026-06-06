from groq import Groq
from app.core.config import GROQ_API_KEY
from app.services.memory import chat_history

client = Groq(
    api_key=GROQ_API_KEY
)

SYSTEM_PROMPT = """
You are a helpful AI assistant.
Be concise and accurate.
"""

def get_ai_response(message: str):

    try:

        chat_history.append(
            {
                "role": "user",
                "content": message
            }
        )

        messages = [
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            }
        ] + chat_history

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages
        )

        response = completion.choices[0].message.content

        chat_history.append(
            {
                "role": "assistant",
                "content": response
            }
        )

        return response

    except Exception as e:

        print(f"Groq Error: {e}")

        return "Sorry, an error occurred while processing your request."