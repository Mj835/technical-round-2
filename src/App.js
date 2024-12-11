import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [timerSec, setTimerSec] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [clickAndTime, setClickAndTime] = useState([]);
  const [lastClickTime, setLastClickTime] = useState(null);

  let getRandomScreenValue = () => {
    return Math.floor(Math.random() * 350);
  };

  useEffect(() => {
    if (isStarted === false) return;

    const time = setInterval(
      () => setCurrentPosition(getRandomScreenValue()),
      Number(timerSec) * 1000
    );

    return () => clearInterval(time);
  }, [currentPosition, isStarted, timerSec]);

  const inputCheck = () => {
    if (timerSec < 1) {
      alert("Please enter a valid number");
      setIsStarted(false);
    } else if (timerSec > 10) {
      alert("Please enter a number less than 10");
      setIsStarted(false);
    } else {
      setIsStarted(true);
    }
  };

  const handleStart = () => {
    if (!timerSec) {
      alert("Please enter a number to Start");
      return;
    }
    inputCheck();
  };

  const handlePause = () => {
    setIsStarted(false);
    setCurrentPosition((prev) => prev);
    setTimerSec((prev) => prev);
  };

  const handleReset = () => {
    setIsStarted(false);
    setCurrentPosition(0);
    setTimerSec("");
    setClickAndTime([]);
  };

  const handleClicks = () => {
    const now = Date.now();
    const reactionTime = lastClickTime ? now - lastClickTime : 0;
    setLastClickTime(now);

    setClickAndTime((prev) => [
      ...prev,
      { clickCount: prev.length + 1, time: reactionTime / 1000 + " sec" },
    ]);
  };

  return (
    <div className="App">
      <div className="buttons-container">
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div className="buttons-container">
        <input
          type="string"
          placeholder="Enter timer sec"
          minLength={1}
          value={timerSec}
          onChange={(e) => setTimerSec(e.target.value)}
          disabled={isStarted}
        />
      </div>

      <div className="box-container">
        <button
          className="box-dot"
          style={{
            position: "absolute",
            left: currentPosition + "px",
            top: currentPosition + "px",
          }}
          onClick={handleClicks}
        ></button>
      </div>

      <div className="response-column">
        <table>
          <thead>
            <tr>
              <th>Mouse Click Number</th>
              <th>Reaction Time</th>
            </tr>
          </thead>
          <tbody>
            {clickAndTime.map((item, index) => (
              <tr key={index}>
                <td>{item.clickCount}</td>
                <td>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
