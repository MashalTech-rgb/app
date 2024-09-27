import React from 'react';
import Confetti from './Confetti';
const QuizResult = (props) => {
  return (
    <>
    <h1 id="canvas">Your Result</h1>
          <Confetti/>
      <div className='show-score'>
        Your Score: {props.score}<br />
        Total Score: {props.totalScore}
      </div>
      <button id="next-button" onClick={props.tryAgain}>Try Again</button>
    </>
  );
};
export default QuizResult;