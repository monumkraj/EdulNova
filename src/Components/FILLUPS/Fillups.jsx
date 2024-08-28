import React, { useState } from "react";
import "./Fillups.css";

const FILLUPS = () => {
  const [userInput, setUserInput] = useState({});
  const [isSubmitted, setIsSubmitted] = useState({});
  const [feedback, setFeedback] = useState({});

  const questions = [
    {
      id: 1,
      question: "The capital of France is ____.",
      correctAnswer: "Paris",
    },
    {
      id: 2,
      question: "The Red Planet is known as ____.",
      correctAnswer: "Mars",
    },
    {
      id: 3,
      question: "'Hamlet' was written by ____.",
      correctAnswer: "William Shakespeare",
    },
  ];

  const handleInputChange = (questionId, event) => {
    setUserInput({
      ...userInput,
      [questionId]: event.target.value,
    });
  };

  const handleSubmit = (questionId) => {
    setIsSubmitted({
      ...isSubmitted,
      [questionId]: true,
    });

    if (
      userInput[questionId]?.trim().toLowerCase() ===
      questions.find((q) => q.id === questionId).correctAnswer.toLowerCase()
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
          <h2>Fill-Ups Questions</h2>
          <div className="questions">
            {questions.map((question) => (
              <div key={question.id} className="question-type">
                <h3>{question.question}</h3>
                <input
                  type="text"
                  value={userInput[question.id] || ""}
                  onChange={(e) => handleInputChange(question.id, e)}
                  disabled={isSubmitted[question.id]}
                  placeholder="Your answer here"
                />
                <button
                  onClick={() => handleSubmit(question.id)}
                  disabled={isSubmitted[question.id] || !userInput[question.id]}
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

export default FILLUPS;
