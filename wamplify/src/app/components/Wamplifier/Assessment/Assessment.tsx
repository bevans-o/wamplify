import React, { useEffect, useState } from 'react'
import { Assessment } from '@/app/types/types';
import assessmentItem from './assessment.module.css'

interface AssessmentProps {
  assessment: Assessment;
  highlighted: boolean;
  onChange: Function;
}

function Assessment({assessment, highlighted, onChange} : AssessmentProps) {
  const [score, setScoreInput] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    //const score : HTMLElement | null = document.querySelector(`input`)
  })

  const onScoreChange = (event: React.SyntheticEvent) => {
    console.log("calling onScoreChange");
    let scoreInput = event.target as HTMLInputElement;
    if (scoreInput.value.length == 0){
      setScoreInput("");
      assessment.completed = false;
      onChange();
    }
    else {
      setScoreInput(scoreInput.value);
      assessment.score = parseInt(scoreInput.value);
      assessment.completed = true;
      onChange();
    }
  }



  return (
    <div className={assessmentItem.container}>
      <div className={assessmentItem.text}>
        <span className={assessmentItem.title}>
          {assessment.title}
        </span>
        <span className={assessmentItem.description}>
          TODO: descriptions
        </span>
      </div>

      <input value={score} onChange={(e) => onScoreChange(e)}/>

      <div className={assessmentItem.wire + " " + (highlighted ? assessmentItem.wireHighlight : "")}></div>
      
      
    </div>
  )
}

export default Assessment