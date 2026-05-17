from pydantic import BaseModel

from pydantic import EmailStr




class TeacherLogin(

    BaseModel
):

    email: EmailStr

    password: str