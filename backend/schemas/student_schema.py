from pydantic import EmailStr

from pydantic import BaseModel


# -----------------------------
# Student Signup
# -----------------------------
class StudentSignup(

    BaseModel
):

    name: str

    email: EmailStr

    password: str

    regd_no: str

# -----------------------------
# Student Login
# -----------------------------
class StudentLogin(

    BaseModel
):

    email: EmailStr

    password: str