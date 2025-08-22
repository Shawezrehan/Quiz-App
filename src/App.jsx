import { useState } from "react";
import { Options } from "./components/options";
import { ResultCard } from "./components/resultcard";
import "./App.css";   

export default function Quizapp() {
  const [mcqs, setmcqs] = useState([]);
  const [quizstarted, setquizstarted] = useState(false);
  const [CurrentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [Score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [ShowResult, setShowResult] = useState(false);
  const total = 100;

  async function getQuizquestions() {
    const data = await fetch(
      "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
    );
    const question = await data.json();
    setmcqs(question.results);
    setquizstarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
  }

  function nextQuestion() {
    if (CurrentQuestionIndex < mcqs.length - 1) {
      if (mcqs[CurrentQuestionIndex].correct_answer === answer) {
        setScore(Score + 10);
      }
      setCurrentQuestionIndex(CurrentQuestionIndex + 1);
      setAnswer("");
    } else {
      setquizstarted(false);
      setShowResult(true);
    }
  }

  function handleAnswer(answer) {
    setAnswer(answer);
  }
    function handleShowResult() {
    setShowResult(true); 
  }
  function handleRestart() {
    setShowResult(false); 
    setScore(0);
  }
  return (<div>
  {/* Header */}
  <header className="header">
    <h1>Quiz App</h1>
  </header>

  {!quizstarted && !ShowResult && (
    <div className="quiz-container">
      <h1>Quiz App</h1>
      <button onClick={getQuizquestions}>Start Quiz</button>
    </div>
  )}

  {quizstarted && !ShowResult && (
    <div className="quiz-container">
      <h3>Question: {CurrentQuestionIndex + 1}</h3>
      <h2>{mcqs[CurrentQuestionIndex].question}</h2>

      <Options
        correctAnswer={mcqs[CurrentQuestionIndex].correct_answer}
        incorrectAnswer={mcqs[CurrentQuestionIndex].incorrect_answers}
        onAnswer={handleAnswer}
        answer={answer}
      />

      <button onClick={nextQuestion} disabled={!answer}>
        {CurrentQuestionIndex === mcqs.length - 1 ? "Show Result" : "Next Question"}
      </button>
    </div>
  )}

  {ShowResult && (
    <ResultCard
      score={Score}
      total={mcqs.length * 10}
      onRestart={getQuizquestions}
    />
  )}
</div>
);
}