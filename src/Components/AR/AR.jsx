import React, { useState } from "react";
import "./AR.css";

const AR = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState({});
  const [feedback, setFeedback] = useState({});

  const questions = [
    {
      id: 1,
      assertion:
        "Primary growth of the plants contributes to the elongation of the plants along their axis.",
      reason:
        "Root apical meristem and shoot apical meristem are responsible for primary growth of the plants.",
      correctOption: "a", // Assuming the correct answer is [a]
    },
    {
      id: 2,
      assertion:
        "Primary growth of the plants contributes to the elongation of the plants along their axis.",
      reason:
        "Root apical meristem and shoot apical meristem are responsible for primary growth of the plants.",
      correctOption: "a", // Assuming the correct answer is [a]
    },
    {
      id: 3,
      assertion:
        "Primary growth of the plants contributes to the elongation of the plants along their axis.",
      reason:
        "Root apical meristem and shoot apical meristem are responsible for primary growth of the plants.",
      correctOption: "a", // Assuming the correct answer is [a]
    },
    {
      id: 4,
      assertion:
        "Primary growth of the plants contributes to the elongation of the plants along their axis.",
      reason:
        "Root apical meristem and shoot apical meristem are responsible for primary growth of the plants.",
      correctOption: "a", // Assuming the correct answer is [a]
    },
    {
      id: 5,
      assertion:
        "Primary growth of the plants contributes to the elongation of the plants along their axis.",
      reason:
        "Root apical meristem and shoot apical meristem are responsible for primary growth of the plants.",
      correctOption: "a", // Assuming the correct answer is [a]
    },
    // Add more questions here
  ];

  const handleOptionChange = (questionId, option) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: option,
    });
  };

  const handleSubmit = (questionId) => {
    setIsSubmitted({
      ...isSubmitted,
      [questionId]: true,
    });

    const correctAnswer = questions.find(
      (q) => q.id === questionId
    ).correctOption;
    if (userAnswers[questionId] === correctAnswer) {
      setFeedback({
        ...feedback,
        [questionId]: "Your answer is correct!",
      });
    } else {
      setFeedback({
        ...feedback,
        [questionId]: "Your answer is incorrect. Please review.",
      });
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <button className="regenerate-btn">Re-Generate</button>
        <div className="settings">
          <div className="setting-group">
            <label>Number of questions</label>
            <input type="number" value="10" readOnly />
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
              <option value="assertion-reasoning">
                Assertion and Reasoning
              </option>
              <option value="subjective">Subjective Questions</option>
            </select>
          </div>
        </div>
      </div>
      <div className="qa-pane">
        <h2>Assertion and Reasoning Questions</h2>
        <div className="questions">
          {questions.map((question) => (
            <div key={question.id} className="question-type">
              <h3>Assertion: {question.assertion}</h3>
              <h3>Reason: {question.reason}</h3>
              <div className="options">
                <label>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value="a"
                    onChange={() => handleOptionChange(question.id, "a")}
                    disabled={isSubmitted[question.id]}
                  />
                  [a] Both Assertion and Reason are true and Reason is the
                  correct explanation of Assertion.
                </label>
                <label>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value="b"
                    onChange={() => handleOptionChange(question.id, "b")}
                    disabled={isSubmitted[question.id]}
                  />
                  [b] Both Assertion and Reason are true but Reason is not the
                  correct explanation of Assertion.
                </label>
                <label>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value="c"
                    onChange={() => handleOptionChange(question.id, "c")}
                    disabled={isSubmitted[question.id]}
                  />
                  [c] Assertion is true, but Reason is false.
                </label>
                <label>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value="d"
                    onChange={() => handleOptionChange(question.id, "d")}
                    disabled={isSubmitted[question.id]}
                  />
                  [d] Assertion is false, but Reason is true.
                </label>
              </div>
              <button
                onClick={() => handleSubmit(question.id)}
                disabled={isSubmitted[question.id] || !userAnswers[question.id]}
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
  );
};

export default AR;
