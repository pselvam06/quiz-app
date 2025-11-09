import React, { useState } from 'react';
import './App.css'; 

const quizData = {
  question: "Which HTML tag is used to define an internal style sheet?",
  options: ["<script>", "<style>", "<css>", "<link>"],
  correctAnswer: "<style>",
};

// --- Main Quiz Component ---
function QuizPage() {
  // State to hold the user's selected option
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // State to determine if the selected answer is correct
  const [isCorrect, setIsCorrect] = useState(null);
  // State to prevent multiple selections
  const [answered, setAnswered] = useState(false);

  const handleAnswerSelect = (answer) => {
    // Stop if the user has already answered
    if (answered) return;

    setSelectedAnswer(answer);
    setAnswered(true);
    
    // Check for correctness
    setIsCorrect(answer === quizData.correctAnswer);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setAnswered(false);
  };

  // Function to determine the class for visual feedback
  const getOptionClass = (option) => {
    if (!answered) {
      return 'option';
    }
    
    // If answered, check if this option was the one selected
    if (option === selectedAnswer) {
      return isCorrect ? 'option correct' : 'option wrong';
    }
    
    // If answered and it's not the selected one, highlight the correct answer
    if (option === quizData.correctAnswer) {
      return 'option correct-unselected';
    }
    
    return 'option disabled'; // Gray out other wrong answers
  };

  return (
    <div className="quiz-container">
      <h1>Simple React Quiz</h1>
      
      {/* 1. Question */}
      <h3 className="question-text">{quizData.question}</h3>
      
      {/* 2. Options List */}
      <ul className="options-list">
        {quizData.options.map((option) => (
          <li 
            key={option}
            onClick={() => handleAnswerSelect(option)}
            // Conditional class name based on state
            className={getOptionClass(option)}
          >
            {option}
          </li>
        ))}
      </ul>

      {/* 3. Conditional Feedback Rendering (shows only after 'answered' is true) */}
      {answered && (
        <div className="feedback-section">
          {/* Display feedback based on isCorrect state */}
          {isCorrect ? (
            <p className="feedback correct-text">
              ✅ **Correct!** You know your HTML.
            </p>
          ) : (
            <p className="feedback wrong-text">
              ❌ **Wrong!** The correct answer was **{quizData.correctAnswer}**.
            </p>
          )}
          <button onClick={resetQuiz} className="next-button">
            Try Again / Next Question
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizPage;