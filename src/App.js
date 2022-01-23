import InitPage from "./InitPage"
import React, { useEffect, useState } from "react"
import Quiz from "./Quiz"
import "./styles.css"

function App() {
  const [isInitPage, setIsInitPage] = useState(true)
  const [questions, setQuestions] = useState([])
  const [isReveal, setIsReveal] = useState(false)

  const getData = async () => {
    const response = await fetch("https://opentdb.com/api.php?amount=5")
    const data = await response.json()
    setQuestions(data.results)
    console.log(data.results)
  }

  useEffect(() => {
    getData()
  }, [isReveal])

  const startGame = () => {
    setIsInitPage((prev) => !prev)
  }

  return (
    <div className="app">
      {isInitPage ? (
        <InitPage changePage={startGame} />
      ) : (
        <Quiz
          questions={questions}
          isReveal={isReveal}
          setIsReveal={setIsReveal}
        />
      )}
    </div>
  )
}

export default App
