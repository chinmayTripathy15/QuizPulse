import uuid

from storage.memory_store import (
    sessions
)



# -----------------------------
# Create Session
# -----------------------------
def create_session(

    subject
):

    session_id = str(

        uuid.uuid4()
    )[:6]


    session = {

        "session_id":
        session_id,

        "subject":
        subject,

        "status":
        "waiting",

        "participants":
        [],

        "questions":
        [],

        "current_question_index":
        0,

        "time_remaining":
        0,

        "leaderboard":
        []
    }


    sessions[
        session_id
    ] = session


    return session