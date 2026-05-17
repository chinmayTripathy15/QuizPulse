function QuizFinished({

  leaderboard,

  participant
}) {

  // -----------------------------
  // Current User Data
  // -----------------------------
  const currentUser =

    leaderboard.find(

      (player) =>

      player.user_id ===
      participant.user_id
    );




  // -----------------------------
  // User Rank
  // -----------------------------
  const userRank =

    leaderboard.findIndex(

      (player) =>

      player.user_id ===
      participant.user_id
    ) + 1;





  return (

    <div
      style={{

        marginTop: "30px",

        background:
        "#111827",

        padding: "35px",

        borderRadius: "20px",

        textAlign: "center",

        border:
        "1px solid #374151"
      }}
    >

      <h1>
        🎉 Quiz Finished
      </h1>



      <h2
        style={{
          marginTop: "25px"
        }}
      >

        🏆 Your Rank:

        {" "}

        #{userRank}

      </h2>




      <h2
        style={{
          marginTop: "15px"
        }}
      >

        ⭐ Final Score:

        {" "}

        {

          currentUser?.score || 0

        }

      </h2>




      <div
        style={{
          marginTop: "35px"
        }}
      >

        <h3>
          🥇 Winner
        </h3>


        <p
          style={{
            marginTop: "15px",

            fontSize: "20px"
          }}
        >

          {

            leaderboard[0]?.name

          }

          {" "}-

          {" "}

          {

            leaderboard[0]?.score

          }

          pts

        </p>

      </div>

    </div>
  );
}

export default QuizFinished;