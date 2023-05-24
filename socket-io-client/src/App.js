import React, { useState } from "react";
import "./App.css";
import TimerComponent from "./components/TimerComponent";
import Button from "react-bootstrap/Button";

function App() {
  const [loadClient, setLoadClient] = useState(true);
  return (
    <div className="main-container">
      {/* LOAD OR UNLOAD THE CLIENT */}
      {loadClient ? (
        <Button
          variant="success"
          onClick={() => setLoadClient((prevState) => !prevState)}
        >
          Unmount timer
        </Button>
      ) : (
        <Button
          variant="warning"
          onClick={() => setLoadClient((prevState) => !prevState)}
        >
          Mount timer
        </Button>
      )}
      {/* SOCKET IO CLIENT*/}
      {loadClient ? <TimerComponent /> : null}
    </div>
  );
}

export default App;
