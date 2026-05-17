function Input(props) {

  return (

    <input

      {...props}

      style={{

        width: "100%",

        padding: "14px",

        marginTop: "10px",

        borderRadius: "10px",

        border:
        "1px solid #475569",

        background: "#0f172a",

        color: "white",

        fontSize: "16px",

        outline: "none"
      }}
    />
  );
}

export default Input;