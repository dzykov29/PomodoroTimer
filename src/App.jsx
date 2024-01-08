import React, { useState, useEffect } from 'react';
import './App.css';
import MyBtn from './MyBtn';

function App() {
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(true)
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerId;

    if (isRunning) {
      timerId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(timerId);
            setTimeLeft(true)
            setIsRunning(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [isRunning]);

  const handleStart = (seconds) => {
    setIsRunning(true);
    setTimeLeft(false);
    setTimer(seconds)
  };

  const handlePause = () => {
    setIsRunning((value) => !value);
  };

  const handleClearTimer = () => {
    setIsRunning(false);
    setTimeLeft(true);
    setTimer(0);
  };

  const secondsToMinutes = (timer) => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="App">
      {timeLeft ?
        <h1>Время вышло</h1>
        :
        <h1>{secondsToMinutes(timer)}</h1>
      }
      <div>
        <MyBtn time="300" handleStart={handleStart}>5 minutes</MyBtn>
        <MyBtn time="600" handleStart={handleStart}>10 minutes</MyBtn>
        <MyBtn time="900" handleStart={handleStart}>15 minutes</MyBtn>
      </div>
      <div>
        {isRunning ? 
          <button style={{ margin: 10 }} onClick={handlePause}>Пауза</button>
          :
          <button style={{ margin: 10 }} onClick={handlePause}>Продолжить</button>
        }
        <button style={{ margin: 10 }} onClick={handleClearTimer}>Сброс</button>
      </div>
      
    </div>
  );
}

export default App;
