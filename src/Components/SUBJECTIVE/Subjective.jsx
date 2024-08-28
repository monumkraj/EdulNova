import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Subjective.css";

const Subjective = () => {
  const navigate = useNavigate();

  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState({});
  const [feedback, setFeedback] = useState({});

  const questions = [
    {
      id: 1,
      question: "Describe the significance of the capital city of France.",
      modelAnswer:
        "Paris is the capital and largest city of France. It is an important cultural, political, and economic center.",
    },
    {
      id: 2,
      question: "Explain why Mars is known as the Red Planet.",
      modelAnswer:
        "Mars is often called the Red Planet because of its reddish appearance, which is due to iron oxide or rust on its surface.",
    },
    {
      id: 3,
      question: "Summarize the plot of 'Hamlet' by William Shakespeare.",
      modelAnswer:
        "Hamlet is a tragedy by William Shakespeare where the prince of Denmark seeks revenge against his uncle, who has murdered his father, taken the throne, and married Hamlet's mother.",
    },
    {
      id: 4,
      question:
        "Write about the contributions of William Shakespeare to English literature.",
      modelAnswer:
        "William Shakespeare is considered one of the greatest writers in the English language, known for his plays, sonnets, and poems.",
    },
  ];

  const handleInputChange = (questionId, event) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: event.target.value,
    }));
  };

  const handleSubmit = (questionId) => {
    const modelAnswer = questions
      .find((q) => q.id === questionId)
      .modelAnswer.toLowerCase();
    const userAnswer = userAnswers[questionId]?.toLowerCase() || "";

    setIsSubmitted((prevStatus) => ({
      ...prevStatus,
      [questionId]: true,
    }));

    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [questionId]: userAnswer.includes(modelAnswer)
        ? "Your answer is correct!"
        : "Your answer is incorrect. Please review.",
    }));
  };

  // const handleBack = () => {
  //   navigate(-1);
  // };

  return (
    <div className="app">
      <div className="sidebar">
        <div className="container">
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
                <option value="subjective">Subjective Questions</option>
                <option value="mcq">Multiple Choice Questions</option>
                <option value="assertion-reasoning">
                  Assertion and Reasoning
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="qa-pane">
        {/* <button className="back-btn" onClick={handleBack}>
          Back
        </button> */}
        <h2>Subjective Questions</h2>
        <div className="questions">
          {questions.map((question) => (
            <div key={question.id} className="question-type">
              <h3>{question.question}</h3>
              <textarea
                rows="5"
                cols="50"
                value={userAnswers[question.id] || ""}
                onChange={(e) => handleInputChange(question.id, e)}
                disabled={isSubmitted[question.id]}
              />
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

export default Subjective;
