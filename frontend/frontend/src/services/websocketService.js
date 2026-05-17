export const connectSocket = (

  sessionId
) => {

  const socket = new WebSocket(

    `ws://127.0.0.1:8000/ws/${sessionId}`
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