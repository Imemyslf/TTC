import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "../styles/Game.css";

const socket = io("http://localhost:4000", { autoConnect: false });

export const Game = () => {
  const [playerTurn, setPlayerTurn] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.emit("joinGame");

    socket.on("playerRole", (playerRole) => setRole(playerRole));

    socket.on("gameStart", (game) => {
      setBoard(game.board);
      setPlayerTurn(game.turn);
      setWinner(null);
    });

    socket.on("updateBoard", (game) => {
      setBoard(game.board);
      setPlayerTurn(game.turn);
    });

    socket.on("gameEnd", (data) => {
      setBoard(data.board);
      setWinner(data.winner);
    });

    socket.on("playerLeft", () => {
      alert("Opponent left the game!");
      window.location.reload();
    });

    return () => {
      socket.off("playerRole");
      socket.off("gameStart");
      socket.off("updateBoard");
      socket.off("gameEnd");
      socket.off("playerLeft");
    };
  }, []);

  const handleClick = (index) => {
    if (board[index] || winner || role !== playerTurn) return;
    socket.emit("move", { index, role });
  };

  return (
    <>
      <h2>{role ? `You are ${role}` : "Waiting for opponent..."}</h2>
      <div className="box_container">
        {board.map((cell, i) => (
          <div key={i} className="box" onClick={() => handleClick(i)}>
            {cell}
          </div>
        ))}
      </div>
      {winner ? (
        <h3>{winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`}</h3>
      ) : (
        <h3>Turn: {playerTurn}</h3>
      )}
      {winner && (
        <button onClick={() => window.location.reload()}>Restart</button>
      )}
    </>
  );
};
