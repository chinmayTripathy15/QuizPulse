import { useState } from "react";

import API from "../../services/api";

import Button from "../common/Button";
import Input from "../common/Input";
import Card from "../common/Card";


function CreateSessionForm({

  setSessionId
}) {

  const [subject,
    setSubject] =
    useState("");



  // -----------------------------
  // Create Session
  // -----------------------------
  const createSession = async () => {

    try {

      const response = await API.post(

        "/session/create",

        {
          subject: subject
        }
      );


      setSessionId(

        response.data
        .session.session_id
      );


      alert(
        "Session Created"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to create session"
      );
    }
  };



  return (

    <Card>

      <h2>
        Create Quiz Session
      </h2>


      <Input

        type="text"

        placeholder=
        "Enter Subject"

        value={subject}

        onChange={(e) =>
          setSubject(
            e.target.value
          )
        }
      />


      <Button

        text="Create Session"

        onClick={createSession}
      />

    </Card>
  );
}

export default CreateSessionForm;