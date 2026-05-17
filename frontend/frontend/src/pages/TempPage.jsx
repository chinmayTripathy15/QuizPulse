import { Link } from "react-router-dom";


function HomePage() {

  return (

    <div
      style={{

        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        background:
        "linear-gradient(to right, #0f172a, #111827)",

        padding: "20px"
      }}
    >

      <div
        style={{

          width: "100%",

          maxWidth: "500px",

          background:
          "#111827",

          padding: "40px",

          borderRadius: "24px",

          border:
          "1px solid #374151",

          boxShadow:
          "0 8px 30px rgba(0,0,0,0.4)",

          textAlign: "center"
        }}
      >

        {/* Title */}
        <h1
          style={{

            fontSize: "38px",

            marginBottom: "15px",

            color: "white"
          }}
        >

          🚀 AI Realtime
          Quiz Platform

        </h1>




        {/* Subtitle */}
        <p
          style={{

            color: "#9ca3af",

            marginBottom: "40px",

            lineHeight: "1.6",

            fontSize: "16px"
          }}
        >

          Conduct realtime AI-powered
          quizzes with live leaderboard,
          timer-based scoring, and
          interactive student sessions.

        </p>




        {/* Teacher Portal */}
        <Link to="/teacher/auth">

          <button
            style={{

              width: "100%",

              padding: "16px",

              fontSize: "18px",

              fontWeight: "bold",

              background:
              "#2563eb",

              color: "white",

              border: "none",

              borderRadius: "14px",

              cursor: "pointer",

              marginBottom: "20px",

              transition: "0.3s"
            }}
          >

            👨‍🏫 Teacher Portal

          </button>

        </Link>




        {/* Student Portal */}
        <Link to="/student/auth">

         <button
    style={{

      width: "100%",

      padding: "16px",

      fontSize: "18px",

      fontWeight: "bold",

      background:
      "#059669",

      color: "white",

      border: "none",

      borderRadius: "14px",

      cursor: "pointer",

      transition: "0.3s"
    }}
  >

    🎓 Student Portal

  </button>

</Link>

      </div>

    </div>
  );
}

export default HomePage;