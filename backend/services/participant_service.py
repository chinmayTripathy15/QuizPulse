import uuid

from storage.memory_store import (
    sessions
)


# -----------------------------
# Join Session
# -----------------------------
def join_session(

    session_id,

    name,

    regd_no
):

    participants = sessions[
        session_id
    ]["participants"]


    # -----------------------------
    # Duplicate Check
    # -----------------------------
    for participant in participants:

        if (
            participant["regd_no"]

            == regd_no
        ):

            return None


    # -----------------------------
    # Create Participant
    # -----------------------------
    participant = {

        "user_id": str(
            uuid.uuid4()
        )[:6],

        "name": name,

        "regd_no": regd_no,

        "score": 0
    }


    participants.append(
        participant
    )


    return participant