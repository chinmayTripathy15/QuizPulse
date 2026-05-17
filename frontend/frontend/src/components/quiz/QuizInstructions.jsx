function QuizInstructions() {

  return (

    <div
      style={{

        marginTop: "30px",

        background:
        "#111827",

        padding: "35px",

        borderRadius: "20px",

        border:
        "1px solid #374151",

        textAlign: "center"
      }}
    >

      <h1>
        📋 Quiz Instructions
      </h1>



      <div
        style={{
          marginTop: "30px",

          textAlign: "left",

          lineHeight: "2",

          fontSize: "18px"
        }}
      >

        <p>
          ✅ Each correct answer gives 10 base points
        </p>


        <p>
          ⚡ Faster answers earn bonus points
        </p>


        <p>
          🔒 Only one answer attempt is allowed
        </p>


        <p>
          🚫 Answers lock after selection
        </p>


        <p>
          📈 Leaderboard updates live
        </p>


        <p>
          🏆 Final rank depends on total score
        </p>

      </div>




      <div
        style={{
          marginTop: "35px"
        }}
      >

        <h2>
          ⏳ Waiting for Teacher
          to Start Quiz...
        </h2>

      </div>

    </div>
  );
}

export default QuizInstructions;