import "./resultcard.css";

export function ResultCard({ score, total, onRestart }) {
  const passingMarks = 50;                 // marks, not percent
  const isPass = score >= passingMarks;

  const percentage = Math.round((score / total) * 100);
  const correct = score / 10;              // assuming 1 Q = 10 marks
  const wrong = total / 10 - correct;

  return (
    <div className="result-wrap">
      <div className="result-card">
        <h1 className="heading">Quiz Result</h1>

        <div className={`badge ${isPass ? "pass" : "fail"}`}>
          {isPass ? "PASS" : "FAIL"}
        </div>

        <h2 className="score">
          Score: {score} / {total} ({percentage}%)
        </h2>

        <div className="stats">
          <p>✅ {correct} correct</p>
          <span className="dot" />
          <p>❌ {wrong} wrong</p>
        </div>

        <p className="target-note">Passing marks: {passingMarks}</p>

        <h3 className={`status ${isPass ? "pass" : "fail"}`}>
          {isPass ? "🎉 Congratulations, You Passed!" : "😕 Sorry, You Failed"}
        </h3>

        <img
          className="result-gif"
          src={
            isPass
              ? "https://media.giphy.com/media/111ebonMs90YLu/giphy.gif"
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgRYBIc3uv0AwjgGPtjhapEKvBaRGsQuZkTg&s"
          }
          alt={isPass ? "Pass Gif" : "Fail Gif"}
        />

        <p className="motivation">
          {isPass
            ? "Great job! Keep practicing to score even higher!"
            : "Tip: review the questions and try again — you’ve got this!"}
        </p>

        <button onClick={onRestart} className="button">🔄 Start Again</button>
      </div>
    </div>
  );
}
