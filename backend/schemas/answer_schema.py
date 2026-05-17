from pydantic import BaseModel


class AnswerRequest(
    BaseModel
):

    session_id: str

    user_id: str

    question_id: str

    selected_answer: str