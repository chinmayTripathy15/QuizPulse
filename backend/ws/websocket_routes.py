from fastapi import APIRouter
from fastapi import WebSocket
from fastapi import WebSocketDisconnect

from ws.connection_manager import (
    manager
)


ws_router = APIRouter()


# -----------------------------
# WebSocket Endpoint
# -----------------------------
@ws_router.websocket(
    "/ws/{session_id}"
)
async def websocket_endpoint(

    websocket: WebSocket,

    session_id: str
):

    await manager.connect(

        session_id,

        websocket
    )


    try:

        while True:

            await websocket.receive_text()


    except WebSocketDisconnect:

        manager.disconnect(

            session_id,

            websocket
        )