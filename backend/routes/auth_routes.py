from fastapi import APIRouter

from fastapi import HTTPException

from schemas.teacher_schema import (
    TeacherSignup
)

from services.auth_service import (
    register_teacher
)




auth_router = APIRouter()




# -----------------------------
# Teacher Signup
# -----------------------------
@auth_router.post(
    "/teacher/signup"
)
def teacher_signup(

    data: TeacherSignup
):

    teacher = register_teacher(

        data.name,

        data.email,

        data.password
    )



    if teacher is None:

        raise HTTPException(

            status_code=400,

            detail=
            "Teacher already exists"
        )



    return {

        "message":
        "Teacher Registered",

        "teacher": teacher
    }


from schemas.teacher_login_schema import (
    TeacherLogin
)

from services.auth_service import (
    login_teacher
)


# -----------------------------
# Teacher Login
# -----------------------------
@auth_router.post(
    "/teacher/login"
)
def teacher_login(

    data: TeacherLogin
):

    result = login_teacher(

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