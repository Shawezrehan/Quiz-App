import "./options.css";

export function Options({ correctAnswer, incorrectAnswer, onAnswer, answer }) {
  const allOptions = [correctAnswer, ...incorrectAnswer].sort();

  return (
    <div className="options-container">
      {allOptions.map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            name="quiz-option"
            value={option}
            checked={answer === option}
            onChange={() => onAnswer(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
}
