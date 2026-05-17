import { useEffect } from "react";
import { useState } from "react";

import API from "../../services/api";


function Leaderboard({

  sessionId
}) {

  const [leaderboard,
    setLeaderboard] =
    useState([]);




  // -----------------------------
  // Fetch Leaderboard
  // -----------------------------
  const fetchLeaderboard =
    async () => {

      try {

        const response =
          await API.get(

            `/leaderboard/${sessionId}`
          );


        setLeaderboard(

          response.data
          .leaderboard
        );

      } catch (error) {

        console.log(error);
      }
    };




  // -----------------------------
  // Auto Refresh
  // -----------------------------
  useEffect(() => {

    if (!sessionId) return;


    fetchLeaderboard();


    const interval =
      setInterval(

        fetchLeaderboard,

        2000
      );


    return () =>
      clearInterval(interval);

  }, [sessionId]);




  return (

    <div
      style={{

        background:
        "#111827",

        padding: "20px",

        borderRadius: "15px",

        marginTop: "25px",

        border:
        "1px solid #374151"
      }}
    >

      <h2>
        🏆 Leaderboard
      </h2>



      {

        leaderboard.map(

          (player, index) => (

            <div

              key={player.user_id}

              style={{

                display: "flex",

                justifyContent:
                "space-between",

                padding: "12px",

                marginTop: "10px",

                background:
                "#1f2937",

                borderRadius: "10px"
              }}
            >

              <div>

                #{index + 1}

                {" "}

                {player.name}

              </div>


              <div>

                {player.score}

              </div>

            </div>
          )
        )
      }

    </div>
  );
}

export default Leaderboard;