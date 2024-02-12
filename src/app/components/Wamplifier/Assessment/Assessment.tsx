import React, { useState } from "react";
import { Assessment } from "@/app/types/types";
import assessmentItem from "./assessment.module.css";
import getAssessmentScore from "@/app/lib/functions/getAssessmentScore";
import {
  isValidScoreOutOf,
  isValidScorePercentage,
  isValidScore,
} from "@/app/lib/functions/inputValidation";

function Assessment({
  assessment,
  highlighted,
  onChange,
  targetScore,
}: {
  assessment: Assessment;
  highlighted: boolean;
  onChange: Function;
  targetScore: number;
}) {
  const [score, setScoreInput] = useState(
    assessment.score > 0 ? assessment.score.toString() + "%" : ""
  );

  const isValid = (score: string) => {
    // check a / b is a valid format

    if (isValidScoreOutOf(score)) {
      return true;
    }

    if (isValidScorePercentage(score)) {
      return true;
    }

    if (isValidScore(score)) {
      return true;
    }
    return false;
  };

  const onScoreChange = (event: React.SyntheticEvent) => {
    let scoreInput = event.target as HTMLInputElement;

    // resets subject if input is nothing
    if (scoreInput.value.length == 0) {
      onChange({ ...assessment, score: 0, completed: false });
      return;
    }

    // otherwise sets new input field value and assessment score
    if (isValid(score)) {
      let assessmentScore = getAssessmentScore(scoreInput.value);
      setScoreInput(assessmentScore.toString() + "%");
      onChange({ ...assessment, score: assessmentScore, completed: true });
    }
  };

  const getStateName = (assessmentCompleted: boolean, score: string) => {
    if (!isValid(score) && score != "") {
      return assessmentItem.invalid;
    }
    if (assessmentCompleted) {
      return assessmentItem.complete;
    }

    return assessmentItem.predicted;
  };

  return (
    <div className={assessmentItem.container}>
      <div className={assessmentItem.text}>
        <span className={assessmentItem.title}>{assessment.title}</span>
        {assessment.title.length > 20 && (
          <span className={assessmentItem.tooltip}>{assessment.title}</span>
        )}
        <span className={assessmentItem.description}>
          {assessment.weight > 0 ? assessment.weight + "%" : "No Weight"}
        </span>
      </div>
      <input
        type="text"
        placeholder={(assessment.desiredScore ?? targetScore) + "%"}
        value={score}
        onChange={(e) => setScoreInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
        onBlur={(e) => onScoreChange(e)}
        className={getStateName(assessment.completed, score)}
      />

      <div
        className={
          assessmentItem.wire +
          " " +
          (highlighted ? assessmentItem.wireHighlight : "")
        }
      ></div>
    </div>
  );
}

export default Assessment;
