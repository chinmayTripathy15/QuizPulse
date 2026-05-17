from pymongo import MongoClient

from dotenv import load_dotenv

import os



# -----------------------------
# Load Environment Variables
# -----------------------------
load_dotenv()



# -----------------------------
# MongoDB Connection
# -----------------------------
MONGO_URL = os.getenv(
    "MONGO_URL"
)



client = MongoClient(

    MONGO_URL,

    tls=True,

    tlsAllowInvalidCertificates=True
)



# -----------------------------
# Database
# -----------------------------
db = client[
    "quiz_platform"
]



# -----------------------------
# Collections
# -----------------------------
teachers_collection = db[
    "teachers"
]

students_collection = db[
    "students"
]

sessions_collection = db[
    "sessions"
]

results_collection = db[
    "results"
]

students_collection = db["students"]