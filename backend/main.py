from fastapi import FastAPI

from fastapi.middleware.cors import (
    CORSMiddleware
)

from routes.session_routes import (
    session_router
)

from ws.websocket_routes import (
    ws_router
)

from routes.ai_routes import (
    ai_router
)

from routes.answer_routes import (
    answer_router
)

from routes.answer_routes import (
    answer_router
)

from routes.leaderboard_routes import (
    leaderboard_router
)


app = FastAPI()


# -----------------------------
# CORS
# -----------------------------
app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# -----------------------------
# Routes
# -----------------------------
app.include_router(

    session_router,

    prefix="/session"
)

app.include_router(
    ws_router
)

app.include_router(

    ai_router,

    prefix="/ai"
)

app.include_router(

    answer_router,

    prefix="/answer"
)



app.include_router(
    answer_router,

    prefix="/answer",

    tags=["Answer"]
)


app.include_router(

    leaderboard_router,

    prefix="/leaderboard",

    tags=["Leaderboard"]
)

from routes.auth_routes import (
    auth_router
)

app.include_router(
    auth_router,

    prefix="/auth",

    tags=["Authentication"]
)


from routes.student_auth_routes import (
    student_auth_router
)


app.include_router(

    student_auth_router,

    prefix="/student/auth",

    tags=["Student Auth"]
)