import React from 'react'
import './ToneCard.css'

export const ToneCard = ({ tone_name, description, score = "" }) => {

  const renderedScore = score && (
    <div className="tone-score-wrap">
      <h3>Score: </h3>
      <h4>{score.toFixed(2)}</h4>
    </div>
  ) || ""

  return (
    <div className="tone-card">
      <div className={ "tone-title-wrap background-" + tone_name }>

        <h3>{tone_name}</h3>
        <div className="overlay"></div> 
      </div>
      { renderedScore }
      <p>{description}</p>
    </div>
  )
}

export default ToneCard