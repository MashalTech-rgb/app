import React from 'react';

const QuizResult = (props) => {
  return (
    <>
    <h1>Your Result</h1>
      <div className='show-score'>
        Your Score: {props.score}<br />
        Total Score: {props.totalScore}
      </div>
      <button id="next-button" onClick={props.tryAgain}>Try Again</button>
    </>
  );
};
export default QuizResult;