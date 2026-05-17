from pydantic import BaseModel


class CreateSessionRequest(
    BaseModel
):

    subject:str