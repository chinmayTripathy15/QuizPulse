import asyncio

from storage.memory_store import (
    sessions
)

from ws.connection_manager import (
    manager
)


# -----------------------------
# Start Quiz Engine
# -----------------------------
async def start_quiz_engine(
    session_id: str
):

    session = sessions[session_id]


    # Quiz Live
    session["status"] = "live"


    total_questions = len(
        session["questions"]
    )


    # -----------------------------
    # Question Loop
    # -----------------------------
    while (

        session["current_question_index"]

        < total_questions
    ):

        current_index = session[
            "current_question_index"
        ]


        question = session["questions"][
            current_index
        ]


        # -----------------------------
        # Broadcast Question
        # -----------------------------
        await manager.broadcast(

            session_id,

            {
                "type": "question",

                "data": question
            }
        )


        # -----------------------------
        # Timer
        # -----------------------------
        duration = question[
            "time_limit"
        ]


        while duration > 0:

            session[
                "time_remaining"
            ] = duration


            # Broadcast Timer
            await manager.broadcast(

                session_id,

                {
                    "type": "timer",

                    "seconds": duration
                }
            )


            await asyncio.sleep(1)

            duration -= 1


        # -----------------------------
        # Move Next Question
        # -----------------------------
        session[
            "current_question_index"
        ] += 1


    # -----------------------------
    # Quiz Finished
    # -----------------------------
    session["status"] = "finished"


    await manager.broadcast(

        session_id,

        {
            "type": "quiz_end"
        }
    )