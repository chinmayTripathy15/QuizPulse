from fastapi import APIRouter
from fastapi import HTTPException

from storage.memory_store import (
    sessions
)

from schemas.ai_quiz_schema import (
    AIQuizRequest
)

from services.ai_quiz_service import (

    generate_ai_quiz
)


ai_router = APIRouter()


# -----------------------------
# Generate AI Quiz
# -----------------------------
@ai_router.post(
    "/generate-quiz"
)
def generate_quiz(
    data: AIQuizRequest
):

    # Session Exists
    if data.session_id not in sessions:

        raise HTTPException(

            status_code=404,

            detail="Session not found"
        )


    questions = generate_ai_quiz(

        data.subject,

        data.custom_prompt,

        data.difficulty,

        data.total_questions
    )


    # Store Questions
    sessions[
        data.session_id
    ]["questions"] = questions


    return {

        "message":
        "AI Quiz Generated",

        "questions": questions
    }