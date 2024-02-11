import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import "./style.css"
const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault(); // Prevents Page Refreshing after submitting the form
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      console.log(email)
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className=" container d-flex flex-column align-items-center justify-content-center h-100">
      <div className="content" >
        <h1 className="text-center mb-4 text-light mt-5">Lobby</h1>
        <form onSubmit={handleSubmitForm} className="card">
      
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email ID</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="room" className="form-label">Room Number</label>
          <input
            type="text"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="form-control"
          />
        </div>
        <button className=" mt-2 btn btn-primary btn-block">Join</button>
      </form>
    </div>
    </div>
  );
};

export default LobbyScreen;
