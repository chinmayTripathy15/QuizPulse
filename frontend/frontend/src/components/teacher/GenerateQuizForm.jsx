import { useState } from "react";

import API from "../../services/api";

import Button from "../common/Button";
import Input from "../common/Input";
import Card from "../common/Card";


function GenerateQuizForm({

  sessionId,

  setQuestions
}) {

  const [subject,
    setSubject] =
    useState("");

  const [customPrompt,
    setCustomPrompt] =
    useState("");

  const [difficulty,
    setDifficulty] =
    useState("");

  const [totalQuestions,
    setTotalQuestions] =
    useState(5);

  const [loading,
    setLoading] =
    useState(false);




  // -----------------------------
  // Generate AI Quiz
  // -----------------------------
  const generateQuiz = async () => {

    try {

      setLoading(true);


      const response = await API.post(

        "/ai/generate-quiz",

        {

          session_id:
          sessionId,

          subject:
          subject,

          custom_prompt:
          customPrompt,

          difficulty:
          difficulty,

          total_questions:
          totalQuestions
        }
      );


      setQuestions(

        response.data.questions
      );


      alert(
        "AI Quiz Generated"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to generate quiz"
      );

    } finally {

      setLoading(false);
    }
  };



  return (

    <Card>

      <h2>
        Generate AI Quiz
      </h2>


      {/* Subject */}
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


      <br />
      <br />


      {/* Teacher Prompt */}
      <textarea

        placeholder=
        "Enter custom instructions for AI..."

        value={customPrompt}

        onChange={(e) =>
          setCustomPrompt(
            e.target.value
          )
        }

        style={{

          width: "100%",

          minHeight: "140px",

          padding: "15px",

          borderRadius: "10px",

          background:
          "#0f172a",

          color: "white",

          border:
          "1px solid #334155",

          fontSize: "16px",

          resize: "none"
        }}
      />


      <br />
      <br />


      {/* Difficulty */}
      <Input

        type="text"

        placeholder=
        "Difficulty"

        value={difficulty}

        onChange={(e) =>
          setDifficulty(
            e.target.value
          )
        }
      />


      <br />
      <br />


      {/* Total Questions */}
      <Input

        type="number"

        placeholder=
        "Total Questions"

        value={totalQuestions}

        onChange={(e) =>
          setTotalQuestions(
            e.target.value
          )
        }
      />


      <Button

        text={

          loading

          ? "Generating..."

          : "Generate AI Quiz"
        }

        onClick={generateQuiz}
      />

    </Card>
  );
}

export default GenerateQuizForm;