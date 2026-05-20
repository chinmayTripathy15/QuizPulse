export const connectSocket = (

  sessionId
) => {

  const socket = new WebSocket(

    `wss://quizpulse-gjxe.onrender.com/ws/${sessionId}`
  );


  socket.onopen = () => {

    console.log(
      "WebSocket Connected"
    );
  };


  socket.onerror = (error) => {

    console.log(
      "WebSocket Error",
      error
    );
  };


  return socket;
};