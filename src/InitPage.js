import React from "react"
import "./styles.css"

const InitPage = (props) => {
  return (
    <div className="init-page">
      <div className="container start">
        <h1 className="title">Quizzical</h1>
        <button onClick={props.changePage}>Start quiz</button>
      </div>
    </div>
  )
}

export default InitPage
