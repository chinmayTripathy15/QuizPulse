import JoinSessionForm from
"../../components/student/JoinSessionForm";

import Container from
"../../components/common/Container";


function StudentJoinPage({

  setSocket,

  setParticipant,

  setSessionId
}) {

  return (

    <Container>

      <div
        style={{
          marginBottom: "30px"
        }}
      >

        <h1>
          Student Portal
        </h1>

        <p>
          Join realtime AI quiz
          sessions instantly
        </p>

      </div>


      <JoinSessionForm

        setSocket={setSocket}

        setParticipant={setParticipant}

        setSessionId={setSessionId}
      />

    </Container>
  );
}

export default StudentJoinPage;