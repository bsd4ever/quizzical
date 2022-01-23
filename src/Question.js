import React from "react"
import Answer from "./Answer"

const Question = (props) => {
  function decodeHtml(html) {
    var txt = document.createElement("textarea")
    txt.innerHTML = html
    return txt.value
  }

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
      <hr />
    </div>
  )
}

export default Question
