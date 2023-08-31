import React, { useState } from 'react'
import wamometer from './wamometer.module.css'

interface WamometerProps {
    predictedWam: number;
    onCurrentWamChange?: Function;
    onCreditPointsChange?: Function;
}

function Wamometer({predictedWam, onCurrentWamChange, onCreditPointsChange}: WamometerProps) {
    const [currentWam, setCurrentWam] = useState("");
    const [creditPoints, setCreditPoints] = useState("");


    function handleWamChange(e: React.SyntheticEvent) {
        let input = e.target as HTMLInputElement;
        setCurrentWam(input.value);

        if (!onCurrentWamChange) return;
        onCurrentWamChange(input.value);
    }

    function handleCreditChange(e: React.SyntheticEvent) {
        let input = e.target as HTMLInputElement;
        setCreditPoints(input.value);

        if (!onCreditPointsChange) return;
        onCreditPointsChange(input.value);
    }

  return (
    <div className={wamometer.body + " panel"}>
        <div className={wamometer.inputs}>
            <div>
                <input value={currentWam} onChange={(e) => handleWamChange(e)}/>
                <label>Your Current WAM</label>
            </div>

            <div>
                <input value={creditPoints} onChange={(e) => handleCreditChange(e)}/>
                <label>Credit Points Completed</label>
            </div>
        </div>
        
        <div className={wamometer.thermo}>

        </div>
        
        <div className={wamometer.footer}>
            Diff (new - current wam)
            {predictedWam}
        </div>
    </div>
  )
}

export default Wamometer