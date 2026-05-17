function Button({

  text,

  onClick,

  disabled
}) {

  return (

    <button

      type="button"

      onClick={onClick}

      disabled={disabled}

      style={{

        background: disabled
          ? "#475569"
          : "#2563eb",

        color: "white",

        border: "none",

        padding: "14px 20px",

        borderRadius: "10px",

        cursor: "pointer",

        fontSize: "16px",

        width: "100%",

        marginTop: "10px",

        transition: "0.3s"
      }}
    >

      {text}

    </button>
  );
}

export default Button;