import React, { useEffect, useState } from 'react'
import assessmentItem from './assessment.module.css'

function Assessment({assessment, highlighted} : any) {
  const [score, setScoreInput] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    //const score : HTMLElement | null = document.querySelector(``)


  })

  const onScoreChange = (event: React.SyntheticEvent) => {
    let scoreInput = event.target as HTMLInputElement;
  }



  return (
    <div className={assessmentItem.container}>
      <div className={assessmentItem.text}>
        <span className={assessmentItem.title}>{assessment.title}</span>
        <span className={assessmentItem.description}>TODO: descriptions</span>
      </div>

      <input/>

      <div className={assessmentItem.wire + " " + (highlighted ? assessmentItem.wireHighlight : "")}></div>
      
      
    </div>
  )
}

export default Assessment