import InitPage from "./InitPage"
import React, { useEffect, useState } from "react"
import Quiz from "./Quiz"
import "./styles.css"

function App() {
  const [isInitPage, setIsInitPage] = useState(true)
  const [questions, setQuestions] = useState([])
  const [isReveal, setIsReveal] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const url = "https://opentdb.com/api.php?amount=5"

  const getData = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setQuestions(data.results)
  }

  useEffect(() => {
    getData()
    console.log(isPlaying)
  }, [isPlaying])

  const startGame = () => {
    setIsInitPage((prev) => !prev)
    setIsPlaying(true)
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
          setIsPlaying={setIsPlaying}
          isPlaying={isPlaying}
        />
      )}
    </div>
  )
}

export default App
