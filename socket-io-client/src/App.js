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
        <div>
          <Button
            variant="success"
            onClick={() => setLoadClient((prevState) => !prevState)}
          >
            Unmount timer
          </Button>{" "}
          <p>Click me to stop the timer.</p>
        </div>
      ) : (
        <div>
          <Button
            variant="warning"
            onClick={() => setLoadClient((prevState) => !prevState)}
          >
            Mount timer
          </Button>
          <p>Click me to start up!</p>
        </div>
      )}
      {/* SOCKET IO CLIENT*/}
      {loadClient ? <TimerComponent /> : null}
    </div>
  );
}

export default App;
