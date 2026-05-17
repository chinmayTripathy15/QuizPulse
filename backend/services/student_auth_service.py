from database.mongo import (
    students_collection
)

from auth.password_utils import (
    hash_password
)




# -----------------------------
# Register Student
# -----------------------------
def register_student(

    name,

    email,

    password,

    regd_no
):

    # Existing Student
    existing_student = (

        students_collection.find_one({

            "$or": [

                {
                    "email": email
                },

                {
                    "regd_no":
                    regd_no
                }
            ]
        })
    )



    if existing_student:

        return None



    # Hash Password
    hashed_password = (
        hash_password(password)
    )



    student_data = {

        "name": name,

        "email": email,

        "password":
        hashed_password,

        "regd_no":
        regd_no
    }



    result = (

        students_collection.insert_one(
            student_data
        )
    )



    return {

        "student_id":

        str(result.inserted_id),

        "name": name,

        "email": email,

        "regd_no": regd_no
    }


from auth.password_utils import (
    verify_password
)

from auth.jwt_handler import (
    create_access_token
)

# -----------------------------
# Login Student
# -----------------------------
def login_student(

    email,

    password
):

    student = (

        students_collection.find_one({

            "email": email
        })
    )



    # Student Not Found
    if not student:

        return None



    # Verify Password
    password_valid = (

        verify_password(

            password,

            student["password"]
        )
    )



    if not password_valid:

        return None



    # Create JWT
    token = create_access_token(

        str(student["_id"])
    )



    return {

        "token": token,

        "student": {

            "student_id":

            str(student["_id"]),

            "name":
            student["name"],

            "email":
            student["email"],

            "regd_no":
            student["regd_no"]
        }
    }