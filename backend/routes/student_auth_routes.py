from fastapi import APIRouter
from fastapi import HTTPException

from schemas.student_schema import (
    StudentSignup
)

from services.student_auth_service import (
    register_student
)




# -----------------------------
# Router
# -----------------------------
student_auth_router = APIRouter()




# -----------------------------
# Student Signup
# -----------------------------
@student_auth_router.post(
    "/signup"
)
def student_signup(

    data: StudentSignup
):

    student = register_student(

        data.name,

        data.email,

        data.password,

        data.regd_no
    )



    # Student Exists
    if student is None:

        raise HTTPException(

            status_code=400,

            detail=
            "Student already exists"
        )



    return {

        "message":
        "Student Registered",

        "student": student
    }


from schemas.student_schema import (
    StudentLogin
)

from services.student_auth_service import (
    login_student
)


# -----------------------------
# Student Login
# -----------------------------
@student_auth_router.post(
    "/login"
)
def student_login(

    data: StudentLogin
):

    result = login_student(

        data.email,

        data.password
    )



    if result is None:

        raise HTTPException(

            status_code=401,

            detail=
            "Invalid email or password"
        )



    return {

        "message":
        "Login Successful",

        "data": result
    }