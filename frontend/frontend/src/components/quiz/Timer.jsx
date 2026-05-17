function Timer({

  seconds
}) {

  return (

    <div
      style={{

        marginTop: "20px",

        background:
        "#7f1d1d",

        padding: "12px",

        borderRadius: "10px",

        textAlign: "center",

        fontWeight: "bold",

        fontSize: "20px"
      }}
    >

      Time Remaining:
      {" "}

      {seconds}s

    </div>
  );
}

export default Timer;