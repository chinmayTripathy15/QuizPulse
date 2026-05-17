import { useState } from "react";

import {

  BrowserRouter,

  Routes,

  Route

} from "react-router-dom";



import HomePage from
"./pages/HomePage";

import TeacherDashboard from
"./pages/teacher/TeacherDashboard";

import StudentJoinPage from
"./pages/student/StudentJoinPage";

import LiveQuizPage from
"./pages/student/LiveQuizPage";

import TeacherAuthPage from
"./pages/auth/TeacherAuthPage";

import StudentAuthPage from
"./pages/auth/StudentAuthPage";




function App() {

  const [socket,
    setSocket] =
    useState(null);

  const [participant,
    setParticipant] =
    useState(null);

  const [sessionId,
    setSessionId] =
    useState("");




  return (

    <BrowserRouter>

      <Routes>

        {/* Home */}
        <Route

          path="/"

          element={
            <HomePage />
          }
        />




        {/* Teacher Authentication */}
        <Route

          path="/teacher/auth"

          element={
            <TeacherAuthPage />
          }
        />




        {/* Teacher Dashboard */}
        <Route

          path="/teacher"

          element={
            <TeacherDashboard />
          }
        />


{/* Student Authentication */}
<Route

  path="/student/auth"

  element={
    <StudentAuthPage />
  }
/>

        {/* Student Join */}
        <Route

          path="/student/join"

          element={

            <StudentJoinPage

              setSocket={
                setSocket
              }

              setParticipant={
                setParticipant
              }

              setSessionId={
                setSessionId
              }
            />
          }
        />




        {/* Live Quiz */}
        <Route

          path="/student/live"

          element={

            <LiveQuizPage

              socket={socket}

              participant={
                participant
              }

              sessionId={
                sessionId
              }
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;