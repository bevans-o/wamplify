import React, { useEffect, useState } from 'react'
import wamplifier from './wamplifier.module.css'

function WamplifierAssessment({assessment, complete} : any) {
  const [score, setScoreInput] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const score : HTMLElement | null = document.querySelector(``)


  })

  const onScoreChange = (event: React.SyntheticEvent) => {
    let scoreInput = event.target as HTMLInputElement;
  }



  return (
    <div className={wamplifier.assessment + " " + (complete ? wamplifier.complete : "")}>
      <span className={wamplifier.assessmentTitle}>{assessment.title}</span>

      {complete && 
        <span className={wamplifier.assessmentCompletedScore}>{assessment.score}</span>
      }

      {!complete && 
        <input onChange={(event) => console.log(`call updateWamplifier(${assessment.title}, ${event.target.valueAsNumber}) | update subject score predictions and rerender wamplifier`)} defaultValue=""/>
      }
      
    </div>
  )
}

export default WamplifierAssessment