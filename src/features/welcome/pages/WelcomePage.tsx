import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../core/socket/SocketProvider";
import { useEffect, useState } from "react";

export default function Welcome() {
  const socket = useSocket();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!socket) return;

    // Remove old listeners (important)
    socket.off("waiting");
    socket.off("match-found");
    socket.off("rejoin-room");

    socket.on("waiting", () => {
      console.log("⏳ Waiting for opponent...");
    });

    socket.on("match-found", ({ roomId }) => {
      console.log("🎉 Match Found:", roomId);
      navigate(`/game/${roomId}`);
    });
    socket.on("rejoin-room", ({ roomId }) => {
      console.log("Rejoining existing room:", roomId);
      navigate(`/game/${roomId}`);
    });
    return () => {
      socket.off("waiting");
      socket.off("match-found");
      socket.off("rejoin-room");
    };
  }, [socket, navigate]);

  const handleStart = () => {
    console.log("Inside HandleStart", socket);
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (!socket) return;
    console.log("Emitting find-match...");
    setLoading(true);

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("find-match");
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={handleStart} disabled={loading}>
        {loading ? "Finding Match..." : "Start Matching"}
      </button>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    padding: "14px 32px",
    fontSize: "18px",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#111",
    color: "#fff",
  },
};
