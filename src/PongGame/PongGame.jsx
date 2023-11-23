import React, { useState, useEffect } from "react";
import Field from "./Components/Field";
import Paddle from "./Components/Paddle"
import Ball from "./Components/Ball";
import Timer from "./Components/Timer"
import { constants } from "./Constants/constants";
import Menu from "./Components/Menu";

const PongGame = () => {
  const [ballPosition, setBallPosition] = useState(constants.initialBallPosition);
  const [leftPaddlePosition, setLeftPaddlePosition] = useState(70);
  const [rightPaddlePosition, setRightPaddlePosition] = useState(70)
  const [ballSpeed, setBallSpeed] = useState({ x: 4, y: 4 });
  const [score, setScore] = useState({ leftPlayer: 0, rightPlayer: 0 });
  const [paused, setPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (paused) {
        return;
      }
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [paused]);

  useEffect(() => {
    if (paused) {
      return
    }
    let currentLeftPaddlePosition = leftPaddlePosition;
    let currentRightPaddlePosition = rightPaddlePosition;

    const handleKeyPress = (e) => {
      if (e.key === "w" && leftPaddlePosition > constants.fieldTopOffset) {
        currentLeftPaddlePosition -= constants.paddleSpeed;
      } else if (e.key === "s" && leftPaddlePosition < constants.fieldHeight + constants.fieldTopOffset - constants.paddleHeight) {
        currentLeftPaddlePosition += constants.paddleSpeed;
      } else if (e.key === "ArrowUp" && rightPaddlePosition > constants.fieldTopOffset) {
        currentRightPaddlePosition -= constants.paddleSpeed;
      } else if (e.key === "ArrowDown" && rightPaddlePosition < constants.fieldHeight + constants.fieldTopOffset - constants.paddleHeight) {
        currentRightPaddlePosition += constants.paddleSpeed;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    const gameInterval = setInterval(() => {
      if (paused) {
        return;
      }
      let currentBallSpeed = ballSpeed;

      if (ballPosition.y <= constants.fieldTopOffset || ballPosition.y >= constants.fieldHeight + constants.fieldTopOffset - constants.ballSize) {
        currentBallSpeed = {...ballSpeed, y: -ballSpeed.y};
      }

      if (
        ballPosition.x >= constants.fieldWidth - 15 - constants.ballSize &&
        ballPosition.y >= rightPaddlePosition &&
        ballPosition.y <= rightPaddlePosition + constants.paddleHeight
      ) {
        currentBallSpeed = { ...ballSpeed, x: -ballSpeed.x };
      }

      if (
        ballPosition.x <= 15 &&
        ballPosition.y >= leftPaddlePosition &&
        ballPosition.y <= leftPaddlePosition + constants.paddleHeight
      ) {
        currentBallSpeed = { ...ballSpeed, x: -ballSpeed.x };
      }

      if ((ballPosition.x <= 0 || ballPosition.x >= constants.fieldWidth - constants.ballSize) && 
        (ballPosition.y <= constants.backBorderHeight + constants.fieldTopOffset || 
          ballPosition.y >= 2 * constants.backBorderHeight + constants.fieldTopOffset
        )
      ) {
        currentBallSpeed = { ...ballSpeed, x: -ballSpeed.x};
      }

      if (ballPosition.x <= 0 &&
         ballPosition.y > constants.backBorderHeight + constants.fieldTopOffset &&
          ballPosition.y < 2 * constants.backBorderHeight + constants.fieldTopOffset) {
        setScore({ ...score, rightPlayer: score.rightPlayer + 1});
        setBallPosition(constants.initialBallPosition);
        setPaused(true);
        return;
      }

      if (ballPosition.x >= constants.fieldWidth &&
        ballPosition.y > constants.backBorderHeight + constants.fieldTopOffset &&
         ballPosition.y < 2 * constants.backBorderHeight + constants.fieldTopOffset) {
       setScore({ ...score, leftPlayer: score.leftPlayer + 1});
       setBallPosition(constants.initialBallPosition);
       setPaused(true);
       return;
     }

      setLeftPaddlePosition(currentLeftPaddlePosition);
      setRightPaddlePosition(currentRightPaddlePosition);
      setBallSpeed(currentBallSpeed);
      setBallPosition({
        x: ballPosition.x + currentBallSpeed.x,
        y: ballPosition.y + currentBallSpeed.y,
      });
    }, 30);

    return () => {
      clearInterval(gameInterval);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [ballPosition, ballSpeed, leftPaddlePosition, rightPaddlePosition, paused, score]);

  const restartGame = () => {
    setScore({ leftPlayer: 0, rightPlayer: 0 });
    setBallPosition(constants.initialBallPosition);
    setPaused(true)
  }

  const togglePause = () => {
    setPaused(!paused);
  }

  return (
    <div style={{ width: `${constants.fieldWidth}px` }}>
      <Timer seconds={seconds} />
      <Field>
        <Paddle hPosition={constants.fieldWidth - 15} paddlePosition={rightPaddlePosition} />
        <Paddle hPosition={10} paddlePosition={leftPaddlePosition} />
        <Ball ballPosition={ballPosition}/>
      </Field>
      <Menu score={score} paused={paused} onPause={togglePause} onRestart={restartGame} />
    </div>
  );
};

export default PongGame;
