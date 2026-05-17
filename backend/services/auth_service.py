from database.mongo import (
    teachers_collection
)

from auth.password_utils import (
    hash_password
)




# -----------------------------
# Register Teacher
# -----------------------------
def register_teacher(

    name,

    email,

    password
):

    # Existing Teacher
    existing_teacher = (

        teachers_collection.find_one({

            "email": email
        })
    )


    if existing_teacher:

        return None



    # Hash Password
    hashed_password = (
        hash_password(password)
    )



    teacher_data = {

        "name": name,

        "email": email,

        "password":
        hashed_password
    }



    result = (

        teachers_collection.insert_one(
            teacher_data
        )
    )



    return {

        "teacher_id":
        str(result.inserted_id),

        "name": name,

        "email": email
    }



from auth.password_utils import (
    verify_password
)

from auth.jwt_handler import (
    create_access_token
)




# -----------------------------
# Login Teacher
# -----------------------------
def login_teacher(

    email,

    password
):

    teacher = (

        teachers_collection.find_one({

            "email": email
        })
    )



    # Teacher Not Found
    if not teacher:

        return None



    # Verify Password
    password_valid = (

        verify_password(

            password,

            teacher["password"]
        )
    )



    if not password_valid:

        return None



    # Create JWT Token
    token = create_access_token(

        str(teacher["_id"])
    )



    return {

        "token": token,

        "teacher": {

            "teacher_id":

            str(teacher["_id"]),

            "name":
            teacher["name"],

            "email":
            teacher["email"]
        }
    }