function Card({

  children
}) {

  return (

    <div

      style={{

        background: "#1e293b",

        padding: "25px",

        borderRadius: "16px",

        marginBottom: "25px",

        border:
        "1px solid #334155",

        boxShadow:
        "0 4px 20px rgba(0,0,0,0.3)"
      }}
    >

      {children}

    </div>
  );
}

export default Card;