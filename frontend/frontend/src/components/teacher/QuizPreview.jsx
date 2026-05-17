import Card from "../common/Card";

function QuizPreview({
  questions,
  sessionId
}) {

  if (
    !questions ||
    questions.length === 0
  ) {
    return null;
  }

  return (
    <div>

      <h2
        style={{
          marginTop: "30px"
        }}
      >
        AI Quiz Preview
      </h2>

    

      {
        questions.map(
          (question, index) => (
            <Card
              key={index}
            >

              <h3>
                {index + 1}.{" "}
                {question.question}
              </h3>

              <div
                style={{
                  marginTop: "15px"
                }}
              >

                {
                  question.options.map(
                    (option, i) => (
                      <p key={i}>
                        • {option}
                      </p>
                    )
                  )
                }

              </div>

              <div
                style={{
                  marginTop: "20px"
                }}
              >

                <strong>
                  Correct Answer:
                </strong>{" "}

                {
                  question.correct_answer
                }

              </div>

              <div
                style={{
                  marginTop: "10px"
                }}
              >

                <strong>
                  Time Limit:
                </strong>{" "}

                {
                  question.time_limit
                } sec

              </div>

            </Card>
          )
        )
      }

    </div>
  );
}

export default QuizPreview;