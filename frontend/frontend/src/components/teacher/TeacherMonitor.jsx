import { useEffect } from "react";
import { useState } from "react";

import API from "../../services/api";


function TeacherMonitor({

  sessionId
}) {

  const [sessionData,
    setSessionData] =
    useState(null);




  // -----------------------------
  // Fetch Session Data
  // -----------------------------
  const fetchSessionData =
    async () => {

      try {

        const response =
          await API.get(

            `/session/${sessionId}`
          );


        setSessionData(

          response.data
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


    fetchSessionData();


    const interval =
      setInterval(

        fetchSessionData,

        2000
      );


    return () =>
      clearInterval(interval);

  }, [sessionId]);




  // -----------------------------
  // No Session
  // -----------------------------
  if (!sessionData) {

    return null;
  }




  return (

    <div
      style={{

        marginTop: "30px",

        background:
        "#111827",

        padding: "25px",

        borderRadius: "18px",

        border:
        "1px solid #374151"
      }}
    >

      {/* Header */}
      <h2>
        📡 Live Teacher Monitor
      </h2>



      {/* Session Info */}
      <div
        style={{
          marginTop: "20px"
        }}
      >

        <p>

          <strong>
            Session ID:
          </strong>

          {" "}

          {
            sessionData.session_id
          }

        </p>


        <p>

          <strong>
            Subject:
          </strong>

          {" "}

          {
            sessionData.subject
          }

        </p>


        <p>

          <strong>
            Status:
          </strong>

          {" "}

          {
            sessionData.status
          }

        </p>


        <p>

          <strong>
            Participants:
          </strong>

          {" "}

          {
            sessionData
            .participant_count
          }

        </p>


        <p>

          <strong>
            Current Question:
          </strong>

          {" "}

          {

  Math.min(

    sessionData
    .current_question_index + 1,

    sessionData
    .total_questions
  )
}

          /

          {
            sessionData
            .total_questions
          }

        </p>

      </div>




      {/* Participant Table */}
      <div
        style={{
          marginTop: "30px"
        }}
      >

        <h3>
          🧑‍🎓 Connected Students
        </h3>


        <table
          style={{

            width: "100%",

            marginTop: "15px",

            borderCollapse:
            "collapse"
          }}
        >

          <thead>

            <tr
              style={{
                background:
                "#1f2937"
              }}
            >

              <th
                style={{
                  padding: "12px"
                }}
              >
                Rank
              </th>


              <th
                style={{
                  padding: "12px"
                }}
              >
                Name
              </th>


              <th
                style={{
                  padding: "12px"
                }}
              >
                Regd No
              </th>


              <th
                style={{
                  padding: "12px"
                }}
              >
                Score
              </th>

            </tr>

          </thead>



          <tbody>

            {

              [...sessionData.participants]

              .sort(

                (a, b) =>

                b.score - a.score
              )

              .map(

                (student, index) => (

                  <tr
                    key={
                      student.user_id
                    }

                    style={{
                      textAlign:
                      "center",

                      borderBottom:
                      "1px solid #374151"
                    }}
                  >

                    <td
                      style={{
                        padding:
                        "14px"
                      }}
                    >

                      #{index + 1}

                    </td>


                    <td
                      style={{
                        padding:
                        "14px"
                      }}
                    >

                      {student.name}

                    </td>


                    <td
                      style={{
                        padding:
                        "14px"
                      }}
                    >

                      {student.regd_no}

                    </td>


                    <td
                      style={{
                        padding:
                        "14px"
                      }}
                    >

                      {student.score}

                    </td>

                  </tr>
                )
              )
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default TeacherMonitor;