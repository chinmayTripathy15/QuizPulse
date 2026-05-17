import { useEffect } from "react";
import { useState } from "react";

import API from "../../services/api";


function QuestionCard({

  question,

  participant,

  sessionId
}) {

  const [selectedAnswer,
    setSelectedAnswer] =
    useState("");

  const [answerLocked,
    setAnswerLocked] =
    useState(false);

  const [correctAnswer,
    setCorrectAnswer] =
    useState("");

  const [earnedScore,
    setEarnedScore] =
    useState(0);

  const [isCorrect,
    setIsCorrect] =
    useState(false);




  // -----------------------------
  // Reset For New Question
  // -----------------------------
  useEffect(() => {

    setSelectedAnswer("");

    setAnswerLocked(false);

    setCorrectAnswer("");

    setEarnedScore(0);

    setIsCorrect(false);

  }, [question]);




  // -----------------------------
  // Submit Answer
  // -----------------------------
  const submitAnswer = async (

    selectedOption
  ) => {

    // Prevent Multiple Click
    if (answerLocked) return;


    try {

      // Lock Immediately
      setSelectedAnswer(
        selectedOption
      );

      setAnswerLocked(true);


      // API Request
      const response = await API.post(

        "/answer/submit",

        {

          session_id:
          sessionId,

          user_id:
          participant.user_id,

          question_id:
          question.question_id,

          selected_answer:
          selectedOption
        }
      );


      // Backend Response
      const result =
        response.data;


      setCorrectAnswer(

        result.correct_answer
      );


      setEarnedScore(

        result.earned_score
      );


      setIsCorrect(
        result.correct
      );


    } catch (error) {

      console.log(error);

      alert(
        "Failed to submit answer"
      );
    }
  };




  // -----------------------------
  // No Question
  // -----------------------------
  if (!question) {

    return (

      <div
        style={{

          background:
          "#111827",

          padding: "30px",

          borderRadius: "18px",

          textAlign: "center",

          marginTop: "20px",

          border:
          "1px solid #374151"
        }}
      >

        <h2>
          Waiting for Question...
        </h2>

      </div>
    );
  }




  return (

    <div
      style={{

        background:
        "#111827",

        padding: "28px",

        borderRadius: "18px",

        marginTop: "20px",

        border:
        "1px solid #374151",

        boxShadow:
        "0 4px 20px rgba(0,0,0,0.3)"
      }}
    >

      {/* Question */}
      <h2
        style={{

          fontSize: "24px",

          lineHeight: "1.5",

          marginBottom: "25px"
        }}
      >

        {question.question}

      </h2>




      {/* Options */}
      <div>

        {

          question.options.map(

            (option, index) => {


              // -----------------------------
              // Default Button Color
              // -----------------------------
              let background =
                "#1f2937";


              // Correct Answer
              if (

                answerLocked &&

                option === correctAnswer
              ) {

                background =
                  "#166534";
              }


              // Wrong Selected
              if (

                answerLocked &&

                option === selectedAnswer &&

                option !== correctAnswer
              ) {

                background =
                  "#991b1b";
              }




              return (

                <button

                  key={index}

                  disabled={
                    answerLocked
                  }

                  onClick={() =>
                    submitAnswer(
                      option
                    )
                  }

                  style={{

                    width: "100%",

                    padding: "16px",

                    marginBottom: "16px",

                    background:
                    background,

                    color: "white",

                    border:
                    "1px solid #4b5563",

                    borderRadius: "12px",

                    cursor:

                    answerLocked

                    ? "not-allowed"

                    : "pointer",

                    opacity:

                    answerLocked

                    ? 0.92

                    : 1,

                    fontSize: "16px",

                    fontWeight: "500",

                    transition:
                    "0.3s"
                  }}
                >

                  {option}

                </button>
              );
            }
          )
        }

      </div>




      {/* Result Box */}
      {

        answerLocked && (

          <div
            style={{

              marginTop: "25px",

              padding: "18px",

              borderRadius: "12px",

              background:

              isCorrect

              ? "#14532d"

              : "#7f1d1d",

              textAlign: "center"
            }}
          >

            <h3>

              {

                isCorrect

                ? "✅ Correct Answer"

                : "❌ Wrong Answer"
              }

            </h3>


            <p
              style={{
                marginTop: "10px"
              }}
            >

              Earned Score:

              {" "}

              <strong>

                {earnedScore}

              </strong>

            </p>

          </div>
        )
      }

    </div>
  );
}

export default QuestionCard;