from fastapi import APIRouter
from fastapi import HTTPException

from schemas.session_schema import (
    CreateSessionRequest
)

from schemas.participant_schema import (
    JoinSessionRequest
)

from services.session_service import (
    create_session
)

from services.participant_service import (
    join_session
)

from services.quiz_engine_service import (
    start_quiz_engine
)

from storage.memory_store import (
    sessions
)

import asyncio


session_router = APIRouter()


# -----------------------------
# Create Session
# -----------------------------
@session_router.post("/create")
def create_quiz_session(
    data: CreateSessionRequest
):

    session = create_session(

        data.subject
    )


    return {

        "message":
        "Session Created",

        "session": session
    }



# -----------------------------
# Join Session
# -----------------------------
@session_router.post(
    "/{session_id}/join"
)
def join_quiz_session(

    session_id: str,

    data: JoinSessionRequest
):

    print("SESSION ID:", session_id)

    print("DATA:", data)

    print("ALL SESSIONS:", sessions)


    # Session Exists
    if session_id not in sessions:

        print("SESSION NOT FOUND")

        raise HTTPException(

            status_code=404,

            detail="Session not found"
        )


    participant = join_session(

        session_id,

        data.name,

        data.regd_no
    )


    print("PARTICIPANT:", participant)


    # Duplicate Registration
    if participant is None:

        print("DUPLICATE REGD NO")

        raise HTTPException(

            status_code=400,

            detail=
            "Registration number already joined"
        )


    return {

        "message":
        "Joined Session",

        "participant":
        participant
    }



# -----------------------------
# Start Quiz
# -----------------------------
@session_router.post(
    "/{session_id}/start"
)
async def start_session(
    session_id: str
):

    if session_id not in sessions:

        raise HTTPException(

            status_code=404,

            detail="Session not found"
        )


    asyncio.create_task(

        start_quiz_engine(
            session_id
        )
    )


    return {

        "message":
        "Quiz Started"
    }



# -----------------------------
# Get Session Details
# -----------------------------
@session_router.get(
    "/{session_id}"
)
def get_session_details(

    session_id: str
):

    if session_id not in sessions:

        raise HTTPException(

            status_code=404,

            detail="Session not found"
        )


    session = sessions[
        session_id
    ]


    return {

        "session_id":
        session["session_id"],

        "subject":
        session["subject"],

        "status":
        session["status"],

        "participants":
        session["participants"],

        "participant_count":

        len(
            session["participants"]
        ),

        "current_question_index":

        session[
            "current_question_index"
        ],

        "total_questions":

        len(
            session["questions"]
        )
    }