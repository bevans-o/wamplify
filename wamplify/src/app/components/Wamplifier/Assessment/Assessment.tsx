import React, { useEffect, useState } from 'react'
import { Assessment } from '@/app/types/types';
import assessmentItem from './assessment.module.css'
import getAssessmentScore from '@/app/lib/functions/getAssessmentScore';

interface AssessmentProps {
  assessment: Assessment;
  highlighted: boolean;
  onChange: Function;
  id: string;
  index: number;
  targetScore: number;
}

function Assessment({assessment, highlighted, onChange, id, index, targetScore} : AssessmentProps) {
  const [score, setScoreInput] = useState("");

  const handleSave = (newScore: number) => {
    localStorage.setItem(index + '-' + id + '-score', Math.round(newScore).toString());
    setScoreInput(Math.round(newScore).toString() + "%");
  }

  const handleDelete = () => {
    localStorage.removeItem(index+ '-' + id + '-score');
  }


  useEffect(() => {
    localStorage.getItem(index+'-'+id+'-score') ? setScoreInput(localStorage.getItem(index+'-'+id+'-score')! + "%") : setScoreInput("");

  }, [])


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
      handleDelete();
      onChange();
      return;
    } 

    //otherwise sets new input field value and assessment score
    if (isValid(score)) {
      let assessmentScore = getAssessmentScore(scoreInput.value);
      handleSave(assessmentScore);
      assessment.score = assessmentScore
      assessment.completed = true;
      onChange();
    }

    
  }

  const getStateName = (assessmentCompleted: boolean, score: string) => {
      if (!isValid(score) && score != "") {
        return assessmentItem.invalid
      }
      if (assessmentCompleted) {
        return assessmentItem.complete
      }

      return assessmentItem.predicted
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
        placeholder={ (assessment.desiredScore ?? targetScore) + "%"}
        value={score} 
        onChange={(e) => setScoreInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur() }
        onBlur={(e) => onScoreChange(e)} 
        className={getStateName(assessment.completed, score)}
        />

      <div className={assessmentItem.wire + " " + (highlighted ? assessmentItem.wireHighlight : "")}></div>

    </div>
      
  )
}

export default Assessment