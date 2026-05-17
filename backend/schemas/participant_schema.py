from pydantic import BaseModel

class JoinSessionRequest(BaseModel):
    name:str
    regd_no:str