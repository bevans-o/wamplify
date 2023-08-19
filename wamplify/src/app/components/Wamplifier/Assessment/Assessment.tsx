import React, { useEffect, useState } from 'react'
import { Assessment } from '@/app/types/types';
import assessmentItem from './assessment.module.css'
import getAssessmentScore from '@/app/utils/scripts/getAssessmentScore';

interface AssessmentProps {
  assessment: Assessment;
  highlighted: boolean;
  onChange: Function;
  targetScore: number;
}

function Assessment({assessment, highlighted, onChange, targetScore} : AssessmentProps) {
  const [score, setScoreInput] = useState("");

  const isValid = (score : string) => {
    //check numbera/numberb is a valid format
    let slashSplit = score.split('/');
    if (slashSplit.length == 2) {
      let a = parseInt(slashSplit[0]);
      let b = parseInt(slashSplit[1]);
      if (isNaN(a) || isNaN(b)) {
        return false
      }
      if (a > b) {
        return false
      }
      return true
    } 

    // check percentage is a valid format
    let percentageSplit = score.split('%');
    if (percentageSplit.length > 2) {
      return false;
    }
    if (percentageSplit.length == 2) {
      if (percentageSplit[1] != '') {
        return false
      }
      let a = parseInt(percentageSplit[0])
      if (isNaN(a)) {
        return false
      }
      if (a > 100 || a < 0) {
        return false
      }
      return true;
    }


    //check integer is valid
    let a = parseInt(score);
    if (isNaN(a) || a > 100 || a < 0) {
      return false;
    }

    return true;
  }

  const onScoreChange = (event: React.SyntheticEvent) => {
    let scoreInput = event.target as HTMLInputElement;

    //resets subject if input is nothing
    if (scoreInput.value.length == 0){
      assessment.completed = false;
      assessment.score = 0;
      onChange();
      return;
    } 

    //otherwise sets new input field value and assessment score
    if (isValid(score)) {
      let assessmentScore = getAssessmentScore(scoreInput.value);
      setScoreInput(assessmentScore.toString() + "%")
      assessment.score = assessmentScore
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
          {assessment.weight > 0 ? assessment.weight + "%" : "No Weight"}
        </span>
      </div>
        <input 
        placeholder={(assessment.desiredScore ?? targetScore) + "%"}
        autoFocus={true}
        value={score} 
        onChange={(e) => setScoreInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur() }
        onBlur={(e) => onScoreChange(e)} 
        className={isValid(score) ? "" : assessmentItem.invalid}
        />

      <div className={assessmentItem.wire + " " + (highlighted ? assessmentItem.wireHighlight : "")}></div>

    </div>
      
  )
}

export default Assessment