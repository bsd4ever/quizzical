import React, { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import decodeHtml from "./decodeHtml"

const Answer = (props) => {
  const [styleBtn, setStyleBtn] = useState("")

  useEffect(() => {
    if (props.isRevealed && props.answer.isCorrect) {
      setStyleBtn("correct")
    } else if (
      props.answer.isChecked &&
      props.isRevealed &&
      !props.answer.isCorrect
    ) {
      setStyleBtn("wrong")
    } else if (
      !props.answer.isChecked &&
      props.isRevealed &&
      !props.answer.isCorrect
    ) {
      setStyleBtn("incorrect")
    } else if (props.answer.isChecked && !props.isRevealed) {
      setStyleBtn("is-checked")
    }
  }, [props.answer.isChecked, props.isRevealed, props.answer.isCorrect])

  return (
    <button className={`answer ${styleBtn}`} onClick={props.checkAnswer}>
      {decodeHtml(props.answer.answer)}
    </button>
  )
}

export default Answer
