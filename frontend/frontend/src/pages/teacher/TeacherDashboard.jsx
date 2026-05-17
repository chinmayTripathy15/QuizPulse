import { useState } from "react";

import Container from
"../../components/common/Container";

import CreateSessionForm from
"../../components/teacher/CreateSessionForm";

import GenerateQuizForm from
"../../components/teacher/GenerateQuizForm";

import QuizPreview from
"../../components/teacher/QuizPreview";

import TeacherMonitor from
"../../components/teacher/TeacherMonitor";

import Button from
"../../components/common/Button";

import Card from
"../../components/common/Card";

import API from
"../../services/api";




function TeacherDashboard() {

  const [sessionId,
    setSessionId] =
    useState("");

  const [questions,
    setQuestions] =
    useState([]);




  // -----------------------------
  // Start Quiz
  // -----------------------------
  const startQuiz = async () => {

    try {

      await API.post(

        `/session/${sessionId}/start`
      );


      alert(
        "Quiz Started"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to start quiz"
      );
    }
  };




  return (

    <Container>

      {/* Header */}
      <h1
        style={{
          marginBottom: "30px"
        }}
      >

        👨‍🏫 Teacher Dashboard

      </h1>




      {/* Create Session */}
      <CreateSessionForm

        setSessionId={
          setSessionId
        }
      />




      {/* Session Card */}
      {

        sessionId && (

          <Card>

            <h3>

              📌 Session ID:

              {" "}

              {sessionId}

            </h3>

          </Card>
        )
      }




      {/* Generate Quiz */}
      {

        sessionId && (

          <GenerateQuizForm

            sessionId={
              sessionId
            }

            setQuestions={
              setQuestions
            }
          />
        )
      }




      {/* Quiz Preview */}
      {

        questions.length > 0 && (

          <QuizPreview

            questions={
              questions
            }
          />
        )
      }




      {/* Start Quiz */}
      {

        questions.length > 0 && (

          <div
            style={{
              marginTop: "30px"
            }}
          >

            <Button

              text="🚀 Start Live Quiz"

              onClick={
                startQuiz
              }
            />

          </div>
        )
      }




      {/* Teacher Monitor */}
      {

        sessionId &&

        questions.length > 0 && (

          <TeacherMonitor

            sessionId={
              sessionId
            }
          />
        )
      }

    </Container>
  );
}

export default TeacherDashboard;