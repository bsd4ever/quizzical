import React, { useState } from "react"
import Question from "./Question"
import { nanoid } from "nanoid"

const Quiz = (props) => {
  const countCorrectAnswers = () => {
    let answersCount = 0
    questions.forEach((question) => {
      question.answers.forEach((answer) => {
        if (answer.isChecked && answer.isCorrect) {
          answersCount += 1
        }
      })
    })
    return answersCount
  }

  const properObjectStructure = (object) => {
    const questionId = nanoid()

    const correctAnswerObject = {
      questionId,
      id: nanoid(),
      answer: object.correct_answer,
      isCorrect: true,
      isChecked: false,
    }
    const inCorrectAnswersObjectsArray = object.incorrect_answers.map(
      (answer) => ({
        questionId,
        id: nanoid(),
        answer: answer,
        isCorrect: false,
        isChecked: false,
      })
    )

    const allAnswersArray = shuffle([
      correctAnswerObject,
      ...inCorrectAnswersObjectsArray,
    ])
    return { ...object, answers: allAnswersArray, questionId }
  }
  const properQuestionsObjectsArray = props.questions.map((question) =>
    properObjectStructure(question)
  )
  const [questions, setQuestions] = useState(properQuestionsObjectsArray)

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }

    return array
  }

  function revealAnswers() {
    if (!props.isReveal) {
      props.setIsReveal(true)
      props.setIsPlaying(false)
    } else {
      props.setIsReveal(false)
      props.setIsPlaying(true)
    }
  }

  const checkAnswer = (id) => {
    // Resetting all answer checkups in question
    if (props.isPlaying) {
      let questionId

      questions.forEach((question) => {
        if (question.answers.find((answer) => answer.id === id)) {
          questionId = question.questionId
        }
      })

      setQuestions((prev) =>
        prev.map((question) => {
          if (question.questionId === questionId) {
            return {
              ...question,
              answers: question.answers.map((answer) => ({
                ...answer,
                isChecked: false,
              })),
            }
          } else {
            return question
          }
        })
      )

      //Checking up the answer
      setQuestions((prev) =>
        prev.map((question) => {
          return {
            ...question,
            answers: question.answers.map((answer) => {
              if (answer.id === id) {
                console.log(!answer.isChecked)
                return { ...answer, isChecked: true }
              } else {
                return answer
              }
            }),
          }
        })
      )
    }
  }

  return (
    <div className="quiz">
      {questions.map((question) => {
        return (
          <Question
            key={nanoid()}
            question={question}
            isReveal={props.isReveal}
            checkAnswer={(id) => checkAnswer(id)}
          />
        )
      })}
      <div className="message-container">
        {props.isReveal && <p>You scored {countCorrectAnswers()} answers</p>}
        <button onClick={revealAnswers} className="play-again-btn">
          {props.isReveal ? "Play again" : "Check answers"}
        </button>
      </div>
    </div>
  )
}

export default Quiz
