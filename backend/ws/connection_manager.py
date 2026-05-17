from fastapi import WebSocket

import json


class ConnectionManager:

    def __init__(self):

        self.rooms = {}


    # -----------------------------
    # Connect
    # -----------------------------
    async def connect(

        self,

        session_id,

        websocket: WebSocket
    ):

        await websocket.accept()


        if session_id not in self.rooms:

            self.rooms[
                session_id
            ] = []


        self.rooms[
            session_id
        ].append(websocket)


        print(
            f"Client joined room {session_id}"
        )


    # -----------------------------
    # Disconnect
    # -----------------------------
    def disconnect(

        self,

        session_id,

        websocket: WebSocket
    ):

        if session_id in self.rooms:

            self.rooms[
                session_id
            ].remove(websocket)


            print(
                f"Client left room {session_id}"
            )


    # -----------------------------
    # Broadcast
    # -----------------------------
    async def broadcast(

        self,

        session_id,

        event
    ):

        if session_id in self.rooms:

            message = json.dumps(
                event
            )


            for connection in self.rooms[
                session_id
            ]:

                await connection.send_text(
                    message
                )


manager = ConnectionManager()