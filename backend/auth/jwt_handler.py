import os

from jose import jwt

from dotenv import load_dotenv

from datetime import datetime
from datetime import timedelta




# -----------------------------
# Load ENV
# -----------------------------
load_dotenv()




# -----------------------------
# JWT Config
# -----------------------------
SECRET_KEY = os.getenv(
    "JWT_SECRET"
)

ALGORITHM = "HS256"

EXPIRE_MINUTES = 60




# -----------------------------
# Create Access Token
# -----------------------------
def create_access_token(

    teacher_id: str
):

    payload = {

        "teacher_id":
        teacher_id,

        "exp":

        datetime.utcnow()

        +

        timedelta(

            minutes=
            EXPIRE_MINUTES
        )
    }



    token = jwt.encode(

        payload,

        SECRET_KEY,

        algorithm=ALGORITHM
    )



    return token