from pydantic import BaseModel

from pydantic import EmailStr




# -----------------------------
# Teacher Signup
# -----------------------------
class TeacherSignup(

    BaseModel
):

    name: str

    email: EmailStr

    password: str