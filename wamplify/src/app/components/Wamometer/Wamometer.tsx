import React from "react";
import wamometer from "./wamometer.module.css";
import WamometerThermo from "./WamometerThermo";
import HelpIcon from "@mui/icons-material/InfoRounded";
import { isValidUnits, isValidWam } from "@/app/lib/functions/inputValidation";
import { currentWam, unitsCompleted } from "@/app/types/store";
import { useAtom } from "jotai/react";

interface WamometerProps {
  calcPredictedWam: Function;
  creditsInProgress: number;
}

function Wamometer({ calcPredictedWam, creditsInProgress }: WamometerProps) {
  const [currWam, setCurrWam] = useAtom(currentWam);
  const [units, setUnits] = useAtom(unitsCompleted);
  const active = parseInt(currWam) > 0 && parseInt(units) > 0;

  function handleWamChange(e: React.SyntheticEvent) {
    let input = e.target as HTMLInputElement;
    setCurrWam(input.value);
  }

  function handleCreditChange(e: React.SyntheticEvent) {
    let input = e.target as HTMLInputElement;
    setUnits(input.value);
  }

  function getWamDiff() {
    return (calcPredictedWam(currWam, units) - parseFloat(currWam)).toFixed(2);
  }

  function getWamStateName() {
    if (!isValidWam(currWam) && currWam != "") {
      return wamometer.invalid;
    }
  }

  function getUnitsStateName() {
    if (!isValidUnits(units) && units != "") {
      return wamometer.invalid;
    }
  }

  return (
    <div className={wamometer.body + " panel"}>
      <div className={wamometer.title}>Your Wamometer</div>

      {active && (
        <WamometerThermo
          markerSteps={20}
          value={calcPredictedWam(currWam, units)}
        />
      )}

      {!active && <WamometerThermo markerSteps={20} value={0} />}

      <div className={wamometer.wamContainer}>
        <div className={`${wamometer.wam} ${active ? "" : wamometer.disabled}`}>
          <p className={wamometer.wamDiff}>{getWamDiff()} change</p>
          <p className={wamometer.wamScore}>
            {calcPredictedWam(currWam, units)}
          </p>
        </div>
      </div>

      <div className={wamometer.footer}>
        <div className={wamometer.tip}>
          <div className={wamometer.tipTitle}>
            What does this mean? <HelpIcon />
          </div>
          <div className={wamometer.tooltip}>
            <div className={wamometer.tipTitle}>
              What does this mean? <HelpIcon />
            </div>
            <div>
              Enter your current WAM and the number of subjects you have
              <strong> already completed</strong>. 25-credit subjects count as
              two subjects!
            </div>
          </div>
        </div>

        <div className={wamometer.inputs}>
          <div>
            <label>Current WAM</label>
            <input
              value={currWam}
              onChange={(e) => handleWamChange(e)}
              className={getWamStateName()}
            />
          </div>

          <div>
            <label>Subjects</label>
            <input
              value={units}
              onChange={(e) => handleCreditChange(e)}
              className={getUnitsStateName()}
            />
          </div>
        </div>

        <p className={wamometer.points}>
          {isValidUnits(units) ? parseInt(units) * 12.5 : 0} credits complete,{" "}
          {creditsInProgress} in progress.
        </p>
      </div>
    </div>
  );
}

export default Wamometer;
