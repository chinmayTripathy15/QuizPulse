import { useState } from "react";

import API from
"../../services/api";

import { useNavigate }
from "react-router-dom";




function StudentAuthPage() {

  const navigate =
    useNavigate();




  // -----------------------------
  // Mode
  // -----------------------------
  const [isSignup,
    setIsSignup] =
    useState(true);




  // -----------------------------
  // Form
  // -----------------------------
  const [name,
    setName] =
    useState("");

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [regdNo,
    setRegdNo] =
    useState("");




  // -----------------------------
  // Submit
  // -----------------------------
  const submit = async () => {

    try {




      // =========================
      // Signup
      // =========================
      if (isSignup) {

        await API.post(

          "/student/auth/signup",

          {
            name,
            email,
            password,

            regd_no:
            regdNo
          }
        );



        alert(
          "Signup Successful"
        );



        setIsSignup(false);

        return;
      }




      // =========================
      // Login
      // =========================
      const response =
        await API.post(

          "/student/auth/login",

          {
            email,
            password
          }
        );



      localStorage.setItem(

        "student_token",

        response.data
        .data.token
      );



      localStorage.setItem(

        "student_data",

        JSON.stringify(

          response.data
          .data.student
        )
      );



      alert(
        "Login Successful"
      );



      navigate("/student/join");

    } catch (error) {

      console.log(error);

      alert(

        error.response?.data?.detail

        ||

        "Authentication Failed"
      );
    }
  };




  return (

    <div
      style={{

        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        background:
        "linear-gradient(to right, #0f172a, #111827)"
      }}
    >

      <div
        style={{

          width: "400px",

          background:
          "#111827",

          padding: "35px",

          borderRadius: "20px",

          border:
          "1px solid #374151"
        }}
      >

        <h1
          style={{
            color: "white",

            textAlign: "center"
          }}
        >

          {

            isSignup

            ?

            "🎓 Student Signup"

            :

            "🔐 Student Login"
          }

        </h1>




        {/* Name */}
        {

          isSignup && (

            <input

              type="text"

              placeholder="Name"

              value={name}

              onChange={(e) =>
                setName(
                  e.target.value
                )
              }

              style={{
                width: "100%",
                padding: "12px",
                marginTop: "20px"
              }}
            />
          )
        }




        {/* Email */}
        <input

          type="email"

          placeholder="Email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }

          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px"
          }}
        />




        {/* Regd No */}
        {

          isSignup && (

            <input

              type="text"

              placeholder=
              "Registration Number"

              value={regdNo}

              onChange={(e) =>
                setRegdNo(
                  e.target.value
                )
              }

              style={{
                width: "100%",
                padding: "12px",
                marginTop: "20px"
              }}
            />
          )
        }




        {/* Password */}
        <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }

          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px"
          }}
        />




        {/* Submit */}
        <button

          onClick={submit}

          style={{

            width: "100%",

            padding: "14px",

            marginTop: "25px",

            background:
            "#059669",

            color: "white",

            border: "none",

            borderRadius: "10px",

            fontSize: "16px",

            cursor: "pointer"
          }}
        >

          {

            isSignup

            ?

            "Signup"

            :

            "Login"
          }

        </button>




        {/* Toggle */}
        <p
          style={{

            marginTop: "20px",

            textAlign: "center",

            cursor: "pointer",

            color: "#9ca3af"
          }}

          onClick={() =>
            setIsSignup(
              !isSignup
            )
          }
        >

          {

            isSignup

            ?

            "Already have account? Login"

            :

            "Don't have account? Signup"
          }

        </p>

      </div>

    </div>
  );
}

export default StudentAuthPage;