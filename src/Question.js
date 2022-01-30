import React from "react"
import Answer from "./Answer"
import decodeHtml from "./decodeHtml"

const Question = (props) => {
  return (
    <div className="question-container">
      <div className="question">
        <h1>{decodeHtml(props.question.question)}</h1>
      </div>
      <div className="answers">
        {props.question.answers.map((answer) => (
          <Answer
            key={answer.id}
            answer={answer}
            isRevealed={props.isReveal}
            checkAnswer={() => props.checkAnswer(answer.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Question
