import React, { useState } from "react";
import "./MCQ.css";

const MCQ = () => {
  const [selectedOption, setSelectedOption] = useState({});
  const [isSubmitted, setIsSubmitted] = useState({});
  const [feedback, setFeedback] = useState({});

  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
    },
    {
      id: 3,
      question: "Who wrote 'Hamlet'?",
      options: [
        "Charles Dickens",
        "William Shakespeare",
        "Mark Twain",
        "Ernest Hemingway",
      ],
      correctAnswer: "William Shakespeare",
    },
    {
      id: 4,
      question: "Who wrote 'Hamlet'?",
      options: [
        "Charles Dickens",
        "William Shakespeare",
        "Mark Twain",
        "Ernest Hemingway",
      ],
      correctAnswer: "William Shakespeare",
    },
    {
      id: 5,
      question: "Who wrote 'Hamlet'?",
      options: [
        "Charles Dickens",
        "William Shakespeare",
        "Mark Twain",
        "Ernest Hemingway",
      ],
      correctAnswer: "William Shakespeare",
    },
  ];

  const handleOptionChange = (questionId, event) => {
    setSelectedOption({
      ...selectedOption,
      [questionId]: event.target.value,
    });
  };

  const handleSubmit = (questionId) => {
    setIsSubmitted({
      ...isSubmitted,
      [questionId]: true,
    });

    if (
      selectedOption[questionId] ===
      questions.find((q) => q.id === questionId).correctAnswer
    ) {
      setFeedback({
        ...feedback,
        [questionId]: "Correct!",
      });
    } else {
      setFeedback({
        ...feedback,
        [questionId]: "Incorrect. Try again!",
      });
    }
  };

  return (
    <>
      <div className="app">
        <div className="sidebar">
          <button className="regenerate-btn">Re-Generate</button>
          <div className="settings">
            <div className="setting-group">
              {/* <label>Number of questions</label> */}
              {/* <input type="number" value="10" readOnly /> */}
            </div>
            <div className="setting-group">
              <label>Difficulty Level</label>
              <div className="difficulty-options">
                <label>
                  <input type="radio" name="difficulty" value="easy" />
                  Easy
                </label>
                <label>
                  <input type="radio" name="difficulty" value="medium" />
                  Medium
                </label>
                <label>
                  <input type="radio" name="difficulty" value="hard" />
                  Hard
                </label>
              </div>
            </div>
            <div className="setting-group">
              <label>Questions Types</label>
              <select>
                <option value="mixed">Mixed</option>
                <option value="mcq">Multiple Choice Questions</option>
                {/* <option value="msq">Multiple Select Questions</option> */}
                <option value="assertion-reasoning">
                  Assertion and Reasoning
                </option>
                <option value="subjective">Subjective Questions</option>
              </select>
            </div>
          </div>
        </div>
        <div className="qa-pane">
          <h2>QA Pane</h2>
          <div className="questions">
            {questions.map((question) => (
              <div key={question.id} className="question-type">
                <h3>{question.question}</h3>
                {question.options.map((option, index) => (
                  <div key={index} className="option">
                    <input
                      type="radio"
                      id={`option-${question.id}-${index}`}
                      name={`question-${question.id}`}
                      value={option}
                      checked={selectedOption[question.id] === option}
                      onChange={(e) => handleOptionChange(question.id, e)}
                      disabled={isSubmitted[question.id]}
                    />
                    <label htmlFor={`option-${question.id}-${index}`}>
                      {option}
                    </label>
                  </div>
                ))}
                <button
                  onClick={() => handleSubmit(question.id)}
                  disabled={
                    isSubmitted[question.id] || !selectedOption[question.id]
                  }
                >
                  Submit
                </button>
                {isSubmitted[question.id] && (
                  <p className="feedback">{feedback[question.id]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="extras">
          <h3>Extras</h3>
          <ul>
            <li>Same Kind</li>
            <li>Similar questions</li>
            <li>Textbook questions</li>
            <li>Competitive exam questions</li>
            <li>Year wise questions</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MCQ;
