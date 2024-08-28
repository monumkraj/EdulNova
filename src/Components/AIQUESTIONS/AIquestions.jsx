import React, { useState } from "react";
import "./AIquestions.css";
import backbutton from "../../assets/back.png";
import home from "../../assets/homepage.jpg";
import MCQ from "../MCQ/MCQ.jsx";
import SUBJECTIVE from "../SUBJECTIVE/Subjective.jsx";
import AR from "../AR/AR.jsx";
import Fillups from "../FILLUPS/Fillups.jsx";

const AIquestions = ({ onBackToHome }) => {
  const [step, setStep] = useState(1);
  const [feature, setFeature] = useState("");
  const [topic, setTopic] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);

  const handleFeatureSelect = (selectedFeature) => {
    setFeature(selectedFeature);
    setStep(2);
  };

  const handleTopicSubmit = (e) => {
    e.preventDefault();
    if (!topic && !file) {
      setError("Please enter a topic or upload a file.");
    } else {
      setStep(3);
      setError("");
    }
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleQuestionTypeSubmit = (e) => {
    e.preventDefault();
    if (questionType) {
      fetchQuestions(questionType);
      setStep(4);
      setQuestionIndex(0);
      setError("");
    } else {
      setError("Please select a valid question type.");
    }
  };

  // const fetchQuestions = (type) => {
  //     // Same switch case as before...
  // };
  const fetchQuestions = (type) => {
    let fetchedQuestions = [];
    switch (type.toLowerCase()) {
      case "mcq":
        fetchedQuestions = [
          {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
          },
          {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic", "Indian", "Arctic", "Pacific"],
          },
        ];
        break;
      case "subjective":
        fetchedQuestions = [
          { question: "Explain the theory of relativity." },
          { question: "Describe the process of photosynthesis." },
        ];
        break;
      case "case based":
        fetchedQuestions = [
          {
            question: "Analyze the case study of Company X’s market strategy.",
          },
          { question: "Discuss the case of Economic Recession of 2008." },
        ];
        break;
      case "diagrams":
        fetchedQuestions = [
          { question: "Draw and explain the structure of a plant cell." },
          { question: "Illustrate the water cycle." },
        ];
        break;
      case "fillups":
        fetchedQuestions = [
          { question: "The capital of Japan is ______.", answer: "Tokyo" },
          {
            question: "The chemical formula for water is ______.",
            answer: "H2O",
          },
        ];
        break;
      case "matching":
        fetchedQuestions = [
          {
            question: "Match the following:",
            pairs: { 1: "A", 2: "B", 3: "C" },
            options: { 1: "Apple", 2: "Banana", 3: "Cherry" },
          },
        ];
        break;
      case "assertion reasoning":
        fetchedQuestions = [
          {
            assertion: "The earth is flat.",
            reason: "It appears flat from our perspective.",
            options: [
              "Both Assertion and Reason are true and Reason is the correct explanation of the Assertion.",
              "Both Assertion and Reason are true and Reason is not the correct explanation of the Assertion.",
              "Assertion is true but Reason is false.",
              "Assertion is false but Reason is true.",
            ],
          },
          {
            assertion: "Water boils at 100 degrees Celsius.",
            reason: "Water is a good conductor of heat.",
            options: [
              "Both Assertion and Reason are true and Reason is the correct explanation of the Assertion.",
              "Both Assertion and Reason are true and Reason is not the correct explanation of the Assertion.",
              "Assertion is true but Reason is false.",
              "Assertion is false but Reason is true.",
            ],
          },
        ];
        break;

      default:
        fetchedQuestions = [];
    }
    setQuestions(fetchedQuestions);
  };

  const handleAnswerSubmit = (answer) => {
    alert(`Your answer "${answer}" has been submitted!`);
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === 4) setStep(3);
  };

  const currentQuestion = questions[questionIndex];

  return (
    <div className="container">
      <div className="ai-questions-container">
        {(step === 1 || step === 2 || step === 3 || step === 4) && (
          <img
            src={home}
            alt="Back"
            className="back-to-home-button"
            onClick={onBackToHome}
          />
        )}
        {(step === 1 || step === 2 || step === 3 || step === 4) && (
          <img
            src={backbutton}
            alt="Back"
            className="top-corner-back-button"
            onClick={handleBack}
          />
        )}

        <h1 className="heading">Generative Assessment</h1>

        {step === 1 && (
          <div className="feature-selection">
            <div className="p1">
              Unlock the Future of Learning with Generative Assessment
              Tailor-Made
              <br></br>
              Questions Just for You Explore, Practice, and Master with Ease
              Elevate
              <br></br>
              Your Skills with Every Click<br></br>
            </div>
            <h2 id="feature-id">Choose a Feature</h2>
            <div className="feature-buttons">
              <button onClick={() => handleFeatureSelect("explore")}>
                Explore
              </button>
              <button onClick={() => handleFeatureSelect("quick")}>
                Quick
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="topic-selection">
            <form className="topic-form" onSubmit={handleTopicSubmit}>
              <h2 id="feature-id">
                Step 1: Choose Your Topic for{" "}
                {feature === "explore" ? "Explore" : "Quick"}
              </h2>
              <p>Type your topic:</p>
              <div className="input-container">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter your topic..."
                  required={feature === "quick"}
                />
              </div>
              <div className="or">OR</div>
              <div className="file-upload-container">
                <label htmlFor="file-upload">Upload a file:</label>
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileUpload}
                />
              </div>
              <div className="next-submit">
                <button type="submit">
                  {feature === "explore" ? "Next" : "Start Practice"}
                </button>
              </div>
            </form>
            <button className="back-button" onClick={handleBack}>
              Back to Feature Selection
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="question-type-selection">
            <h2 id="feature-id">
              Step 2: {feature === "explore" ? "Select" : "Practice"} Question
              Type
            </h2>
            {feature === "explore" ? (
              <form onSubmit={handleQuestionTypeSubmit}>
                <label htmlFor="questionType">Choose a question type:</label>
                <select
                  id="questionType"
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                  required
                >
                  <option value="">Select a question type</option>
                  <option value="mcq">MCQ</option>
                  <option value="subjective">Subjective</option>
                  <option value="case based">Case Based</option>
                  <option value="diagrams">Diagrams</option>
                  <option value="fillups">Fillups</option>
                  <option value="matching">Matching</option>
                  <option value="assertion reasoning">
                    Assertion Reasoning
                  </option>
                </select>
                <button type="submit">Generate Questions</button>
              </form>
            ) : (
              <div className="question-type-buttons">
                <button
                  onClick={() => {
                    setQuestionType("mcq");
                    fetchQuestions("mcq");
                    setStep(4);
                    setQuestionIndex(0);
                  }}
                >
                  MCQ
                </button>
                <button
                  onClick={() => {
                    setQuestionType("subjective");
                    fetchQuestions("subjective");
                    setStep(4);
                    setQuestionIndex(0);
                  }}
                >
                  Subjective
                </button>
                <button
                  className="ar"
                  onClick={() => {
                    setQuestionType("assertion reasoning");
                    fetchQuestions("assertion reasoning");
                    setStep(4);
                    setQuestionIndex(0);
                  }}
                >
                  Assertion Reasoning
                </button>
                {/* Other buttons */}
              </div>
            )}
            <button className="back-button" onClick={handleBack}>
              Back to{" "}
              {feature === "explore" ? "Topic Selection" : "Feature Selection"}
            </button>
          </div>
        )}

        {step === 4 && (
          <div
            className="question-section"
            style={{
              height: "10vh",
              // width: "15vw",
              // padding: "15px",
            }}
          >
            <h2 id="feature-id">
              Practice {questionType.toUpperCase()} for {topic}
            </h2>
            {error && <p className="error-message">{error}</p>}
            {questions.length === 0 ? (
              <p>
                No questions available for this type. Please choose a different
                type.
              </p>
            ) : (
              <>
                {questionType === "mcq" && (
                  <MCQ
                    question={currentQuestion}
                    onAnswerSubmit={handleAnswerSubmit}
                  />
                )}
                {questionType === "subjective" && (
                  <SUBJECTIVE
                    question={currentQuestion}
                    onAnswerSubmit={handleAnswerSubmit}
                  />
                )}
                {questionType === "assertion reasoning" && (
                  <AR
                    question={currentQuestion}
                    onAnswerSubmit={handleAnswerSubmit}
                  />
                )}
                {questionType === "fillups" && (
                  <Fillups
                    question={currentQuestion}
                    onAnswerSubmit={handleAnswerSubmit}
                  />
                )}
                {/* // <Subjective question={currentQuestion} onAnswerSubmit={handleAnswerSubmit} />
                                // <MCQ question={currentQuestion} onAnswerSubmit={handleAnswerSubmit} />
                                // <MCQ question={currentQuestion} onAnswerSubmit={handleAnswerSubmit} />
                                // <MCQ question={currentQuestion} onAnswerSubmit={handleAnswerSubmit} />
                                // <MCQ question={currentQuestion} onAnswerSubmit={handleAnswerSubmit} /> */}

                {/* Other question types */}
                <div className="navigation-buttons">
                  {questionIndex > 0 && (
                    <button onClick={() => setQuestionIndex(questionIndex - 1)}>
                      Previous Question
                    </button>
                  )}
                  {questionIndex < questions.length - 1 && (
                    <button onClick={() => setQuestionIndex(questionIndex + 1)}>
                      Next Question
                    </button>
                  )}
                  <button onClick={handleBack}>
                    Back to Question Type Selection
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIquestions;
