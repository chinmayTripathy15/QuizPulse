from fastapi import APIRouter
from fastapi import HTTPException

from schemas.answer_schema import (
    AnswerRequest
)

from storage.memory_store import (
    sessions
)


answer_router = APIRouter()


# -----------------------------
# Submit Answer
# -----------------------------
@answer_router.post(
    "/submit"
)
def submit_answer(

    data: AnswerRequest
):

    # Session Exists
    if data.session_id not in sessions:

        raise HTTPException(

            status_code=404,

            detail="Session not found"
        )


    session = sessions[
        data.session_id
    ]


    # Find Question
    question = None

    for q in session["questions"]:

        if (

            q["question_id"]

            == data.question_id
        ):

            question = q

            break


    if question is None:

        raise HTTPException(

            status_code=404,

            detail="Question not found"
        )


    # Find Participant
    participant = None

    for p in session[
        "participants"
    ]:

        if (

            p["user_id"]

            == data.user_id
        ):

            participant = p

            break


    if participant is None:

        raise HTTPException(

            status_code=404,

            detail="Participant not found"
        )


    # Correct Answer
    if (

        data.selected_answer

        == question["correct_answer"]
    ):

        participant["score"] += 10

        correct = True

        time_bonus=session["time_remaining"]

        earned_score=(
            10+ time_bonus
        )

        participant["score"]+=(
            earned_score
        )

    else:

        correct = False

        earned_score=0


    return {

        "message":
        "Answer Submitted",

        "correct":
        correct,
        
        "correct_answer":
        question["correct_answer"],
        
        "earned_score":
        earned_score,

        
        "total_score":
        participant["score"]
    }