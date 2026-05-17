import { useEffect } from "react";
import { useState } from "react";

import API from "../../services/api";

import Container from
"../../components/common/Container";

import QuestionCard from
"../../components/quiz/QuestionCard";

import Timer from
"../../components/quiz/Timer";

import Leaderboard from
"../../components/quiz/Leaderboard";

import QuizFinished from
"../../components/quiz/QuizFinished";

import QuizInstructions from
"../../components/quiz/QuizInstructions";


function LiveQuizPage({

  socket,

  participant,

  sessionId
}) {

  const [question,
    setQuestion] =
    useState(null);

  const [timer,
    setTimer] =
    useState(0);

  const [quizFinished,
    setQuizFinished] =
    useState(false);

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
  // WebSocket Events
  // -----------------------------
  useEffect(() => {

    if (!socket) return;


    socket.onmessage = (

      event
    ) => {

      const message = JSON.parse(
        event.data
      );


      console.log(message);




      // Question
      if (

        message.type ===
        "question"
      ) {

        setQuestion(
          message.data
        );
      }




      // Timer
      if (

        message.type ===
        "timer"
      ) {

        setTimer(
          message.seconds
        );
      }




      // Quiz End
      if (

        message.type ===
        "quiz_end"
      ) {

        setQuizFinished(
          true
        );


        fetchLeaderboard();
      }
    };

  }, [socket]);




  return (

    <Container>

      <h1>
        Live Quiz
      </h1>




      {/* Quiz Finished */}
      {

        quizFinished ? (

          <QuizFinished

            leaderboard={
              leaderboard
            }

            participant={
              participant
            }
          />

        ) : (

      <>

  {/* Show Instructions Before Quiz Starts */}
  {

    !question ? (

      <QuizInstructions />

    ) : (

      <>

        {/* Timer */}
        <Timer
          seconds={timer}
        />


        {/* Question */}
        <QuestionCard

          question={question}

          participant={
            participant
          }

          sessionId={
            sessionId
          }
        />


        {/* Leaderboard */}
        <Leaderboard

          sessionId={
            sessionId
          }
        />

      </>
    )
  }

</>

          
        )
      }

    </Container>
  );
}

export default LiveQuizPage;