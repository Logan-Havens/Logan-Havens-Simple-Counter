
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

import "../styles/index.css";

function SimpleCounter(props) {
  return (
    <div className="bigCounter">
      <div className="clock">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-stopwatch" viewBox="0 0 16 16">
          <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z"/>
          <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z"/>
        </svg>
      </div>
      <div className="four">{props.digitFour % 10}</div>
      <div className="three">{props.digitThree % 10}</div>
      <div className="two">{props.digitTwo % 10}</div>
      <div className="one">{props.digitOne % 10}</div>
    </div>
  );
}

SimpleCounter.propTypes = {
    digitFour: PropTypes.number,
    digitThree: PropTypes.number,
    digitTwo: PropTypes.number,
    digitOne: PropTypes.number,
};

function Timer() {
  const [counter, setCounter] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const handleStop = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setRunning(true);
    setCounter(0);
  };

  useEffect(() => {
    if (counter === 10) {
      alert("Your time has been reached!");
      setRunning(false);
    }
  }, [counter]);

  return (
    <div>
      <SimpleCounter
        digitOne={Math.floor(counter / 1) % 10}
        digitTwo={Math.floor(counter / 10) % 10}
        digitThree={Math.floor(counter / 100) % 10}
        digitFour={Math.floor(counter / 1000)}
      />
      <div>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={() => setRunning(true)}>Resume</button>
      </div>
    </div>
  );
}

ReactDOM.render(<Timer />, document.querySelector("#app"));
