"use client";
import React, { useState } from "react";
import QuizResult from "./component/QuizResult"; // Ensure this path is correct
import { Questions } from "./Data/Questions";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const changeQuestion = () => {
    if (clickedOption !== null) {
      // Check if the selected option is correct
      if (clickedOption === Questions[currentQuestion].answer) {
        setScore(prevScore => prevScore + 1);
      }

      // Move to the next question or show results
      if (currentQuestion < Questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setClickedOption(null); // Reset clicked option for next question
      } else {
        setShowResult(true); // Show results if it was the last question
      }
    } else {
      alert("Please select an option!"); // Alert if no option is selected
    }
  };

  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(null);
    setScore(0);
  };

  return (
    <div>
      <h2 className="heading-txt">Quiz APP</h2>
      <div className="container">
        {showResult ? (
          <QuizResult score={score} totalScore={Questions.length} tryAgain={resetAll} />
        ) : (
          <>
            <div className="question">
              <span id="question-number">{currentQuestion + 1}. </span>
              <span id="question-txt">{Questions[currentQuestion].question}</span>
            </div>
            <div className="option-container">
              {Questions[currentQuestion].options.map((option, i) => (
                <button
                  className={`option-btn ${clickedOption === i + 1 ? "checked" : ""}`}
                  key={i}
                  onClick={() => setClickedOption(i + 1)} // Set clicked option
                >
                  {option}
                </button>
              ))}
            </div>
            <input
              type="button"
              value="Next"
              id="next-button"
              onClick={changeQuestion} // Proceed to next question
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;