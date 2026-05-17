from pydantic import BaseModel


class AIQuizRequest(
    BaseModel
):

    session_id: str

    subject: str

    custom_prompt: str

    difficulty: str

    total_questions: int