import os
import json

from groq import Groq

from dotenv import load_dotenv


# -----------------------------
# Load Environment Variables
# -----------------------------
load_dotenv()


# -----------------------------
# Groq Client
# -----------------------------
client = Groq(

    api_key=os.getenv(
        "GROQ_API_KEY"
    )
)



# -----------------------------
# Generate AI Quiz
# -----------------------------
def generate_ai_quiz(

    subject,

    custom_prompt,

    difficulty,

    total_questions
):

    prompt = f"""

Generate {total_questions}
multiple choice questions.

Subject:
{subject}

Teacher Instructions:
{custom_prompt}

Difficulty:
{difficulty}

Return ONLY valid JSON array.

Format:

[
  {{
    "question_id": "Q1",
    "type": "mcq",
    "question": "...",
    "options": [
      "...",
      "...",
      "...",
      "..."
    ],
    "correct_answer": "...",
    "time_limit": 15
  }}
]

Do NOT return markdown.
Do NOT return explanation.
Do NOT return text outside JSON.
"""


    response = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[

            {
                "role": "user",

                "content": prompt
            }
        ],

        temperature=0.7
    )


    content = response.choices[
        0
    ].message.content


    questions = json.loads(
        content
    )


    return questions