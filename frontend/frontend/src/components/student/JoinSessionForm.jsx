import { useState } from "react";

import { useNavigate }
from "react-router-dom";

import API from "../../services/api";

import Button from "../common/Button";
import Input from "../common/Input";
import Card from "../common/Card";

import { connectSocket }
from "../../services/websocketService";


function JoinSessionForm({

  setSocket,

  setParticipant,

  setSessionId
}) {

  const navigate =
    useNavigate();


  const [name, setName] =
    useState("");

  const [regdNo, setRegdNo] =
    useState("");

  const [sessionCode,
    setSessionCode] =
    useState("");

  const [loading, setLoading] =
    useState(false);




  // -----------------------------
  // Join Session
  // -----------------------------
  const joinSession = async () => {

    // Prevent Double Click
    if (loading) return;


    // Validation
    if (

      !name ||

      !regdNo ||

      !sessionCode
    ) {

      alert(
        "Fill all fields"
      );

      return;
    }


    try {

      setLoading(true);


      // -----------------------------
      // Join API
      // -----------------------------
      const response = await API.post(

        `/session/${sessionCode}/join`,

        {
          name: name,

          regd_no: regdNo
        }
      );


      // -----------------------------
      // Store Participant
      // -----------------------------
      setParticipant(

        response.data.participant
      );


      // -----------------------------
      // Store Session ID
      // -----------------------------
      setSessionId(
        sessionCode
      );


      // -----------------------------
      // WebSocket Connection
      // -----------------------------
      const ws = connectSocket(
        sessionCode
      );


      // -----------------------------
      // WebSocket Open
      // -----------------------------
      ws.onopen = () => {

        console.log(
          "WebSocket Connected"
        );


        // Store Socket
        setSocket(ws);


        alert(
          "Joined Session"
        );


        // Navigate Live Page
        navigate(
          "/student/live"
        );
      };


      // -----------------------------
      // WebSocket Error
      // -----------------------------
      ws.onerror = (error) => {

        console.log(
          "WebSocket Error:",
          error
        );

        alert(
          "WebSocket Connection Failed"
        );
      };



    } catch (error) {

      console.log(error);

      console.log(
        error.response?.data
      );


      alert(

        error.response?.data?.detail

        || "Failed to join session"
      );

    } finally {

      setLoading(false);
    }
  };




  return (

    <Card>

      <h2>
        Join Quiz Session
      </h2>


      <Input

        type="text"

        placeholder="Name"

        value={name}

        onChange={(e) =>
          setName(
            e.target.value
          )
        }
      />


      <br />
      <br />


      <Input

        type="text"

        placeholder=
        "Registration Number"

        value={regdNo}

        onChange={(e) =>
          setRegdNo(
            e.target.value
          )
        }
      />


      <br />
      <br />


      <Input

        type="text"

        placeholder="Session ID"

        value={sessionCode}

        onChange={(e) =>
          setSessionCode(
            e.target.value
          )
        }
      />


      <br />
      <br />


      <Button

        text={

          loading

          ? "Joining..."

          : "Join Session"
        }

        onClick={
          joinSession
        }

        disabled={loading}
      />

    </Card>
  );
}

export default JoinSessionForm;