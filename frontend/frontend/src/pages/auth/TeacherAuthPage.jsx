import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../../services/api";




function TeacherAuthPage() {

  const navigate = useNavigate();




  // -----------------------------
  // Auth Mode
  // -----------------------------
  const [isSignup,
    setIsSignup] =
    useState(true);




  // -----------------------------
  // Form Fields
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

          "/auth/teacher/signup",

          {
            name,
            email,
            password
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

          "/auth/teacher/login",

          {
            email,
            password
          }
        );



      localStorage.setItem(

        "teacher_token",

        response.data
        .data.token
      );



      localStorage.setItem(

        "teacher_data",

        JSON.stringify(

          response.data
          .data.teacher
        )
      );



      alert(
        "Login Successful"
      );



      navigate("/teacher");

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




        {/* Title */}
        <h1
          style={{
            textAlign: "center",

            color: "white"
          }}
        >

          {

            isSignup

            ?

            "📝 Teacher Signup"

            :

            "🔐 Teacher Login"
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
                marginTop: "25px"
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





        {/* Button */}
        <button

          onClick={submit}

          style={{

            width: "100%",

            padding: "14px",

            marginTop: "25px",

            background:
            "#2563eb",

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

export default TeacherAuthPage;