import React from "react";
import { useState, useEffect } from "react";
import "../styles/Game.css";

export const Game = () => {
  const [playerTurn, setPlayerTurn] = useState("X");
  const [board, setBoard] = useState(new Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [Xturn, setXTurn] = useState([]);
  const [Oturn, setOTurn] = useState([]);

  const gameBoardPlayer = (index) => {
    if (board[index] || winner) return;

    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[index] = playerTurn;
      return newBoard;
    });

    if (playerTurn === "X") {
      setXTurn((prevXTurn) => {
        const newXTurn = [...prevXTurn, index];
        if (newXTurn.length > 3) {
          const removedIndex = newXTurn.shift();
          if (removedIndex !== undefined) {
            setBoard((prevBoard) => {
              const updatedBoard = [...prevBoard];
              updatedBoard[removedIndex] = null;
              return updatedBoard;
            });
          }
        }
        return newXTurn;
      });
    } else {
      setOTurn((prevOTurn) => {
        const newOTurn = [...prevOTurn, index];
        if (newOTurn.length > 3) {
          const removedIndex = newOTurn.shift();
          if (removedIndex !== undefined) {
            setBoard((prevBoard) => {
              const updatedBoard = [...prevBoard];
              updatedBoard[removedIndex] = null;
              return updatedBoard;
            });
          }
        }
        return newOTurn;
      });
    }

    setPlayerTurn((prevTurn) => (prevTurn === "X" ? "O" : "X"));
  };

  useEffect(() => {
    const winningPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const [a, b, c] of winningPattern) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
  }, [board, winner, playerTurn]);

  const handleClick = (index) => {
    gameBoardPlayer(index);
  };

  return (
    <>
      <div className="container">
        <div className="box_container">
          {board.map((cell, i) => (
            <div
              key={i}
              className={`box ${cell ? "pop-up" : ""}
              ${cell === "X" ? "x-player" : ""}
              ${cell === "O" ? "o-player" : ""}
              ${
                playerTurn === "X" && Xturn.length === 3 && i === Xturn[0]
                  ? "blur"
                  : ""
              }
              ${
                playerTurn === "O" && Oturn.length === 3 && i === Oturn[0]
                  ? "blur"
                  : ""
              }`}
              onClick={() => handleClick(i)}
            >
              {cell}
            </div>
          ))}
        </div>
      </div>
      <div className="center_rows">
        <h2 className={"winner-text"}>
          {winner ? (
            `🎉 ${winner} Wins!`
          ) : (
            <>
              It's{" "}
              <span
                style={{
                  color: "#ffca28",
                  fontWeight: "bold",
                  fontSize: "40px",
                }}
              >
                {playerTurn}
              </span>{" "}
              turn
            </>
          )}
        </h2>

        <div className="reset_btn">
          <div
            className="reset"
            onClick={() => {
              setBoard(new Array(9).fill(null));
              setWinner(null);
              setPlayerTurn("X");
              setXTurn([]);
              setOTurn([]);
            }}
          >
            Reset
          </div>
        </div>
      </div>
    </>
  );
};
