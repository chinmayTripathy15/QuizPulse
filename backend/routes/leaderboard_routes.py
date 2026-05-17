from fastapi import APIRouter
from fastapi import HTTPException

from storage.memory_store import (
    sessions
)


leaderboard_router = APIRouter()


# -----------------------------
# Get Leaderboard
# -----------------------------
@leaderboard_router.get(
    "/{session_id}"
)
def get_leaderboard(

    session_id: str
):

    if session_id not in sessions:

        raise HTTPException(

            status_code=404,

            detail="Session not found"
        )


    participants = sessions[
        session_id
    ]["participants"]


    # Sort by score DESC
    leaderboard = sorted(

        participants,

        key=lambda x: x["score"],

        reverse=True
    )


    return {

        "leaderboard":
        leaderboard
    }