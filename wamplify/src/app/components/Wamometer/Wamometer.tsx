import React, { useState } from 'react'
import wamometer from './wamometer.module.css'
import WamometerThermo from './WamometerThermo';
import Divider from '../Divider/Divider';

interface WamometerProps {
    calcPredictedWam: Function;
}

function Wamometer({calcPredictedWam}: WamometerProps) {
    const [currentWam, setCurrentWam] = useState("0");
    const [unitsCompleted, setUnitsCompleted] = useState("0");
    const active = (currentWam && unitsCompleted);


    function handleWamChange(e: React.SyntheticEvent) {
        let input = e.target as HTMLInputElement;
        setCurrentWam(input.value);
    }

    function handleCreditChange(e: React.SyntheticEvent) {
        let input = e.target as HTMLInputElement;
        setUnitsCompleted(input.value);
    }

    function getWamDiff() {
        return (calcPredictedWam(currentWam, parseFloat(unitsCompleted)*12.5) - parseFloat(currentWam)).toFixed(2)
    }

  return (
    <div className={wamometer.body + " panel"}>
        <div className={wamometer.title}>Your Wamometer</div>
        
        
        <WamometerThermo markerSteps={20} value={calcPredictedWam(currentWam, parseFloat(unitsCompleted)*12.5)}/>

        <div className={wamometer.wamContainer}>
            <div className={wamometer.wam}>
                <p className={wamometer.wamDiff}>({getWamDiff()})</p>
                <p className={wamometer.wamScore}>{calcPredictedWam(currentWam, parseFloat(unitsCompleted)*12.5)}</p>
            </div>
        </div>
        
        
        <div className={wamometer.footer}>
            <p className={wamometer.tip}>Enter your WAM and completed credit points to see your Wamplified score.</p>
                
            <div className={wamometer.inputs}>
                <div>
                    <label>Current WAM</label>
                    <input value={currentWam} onChange={(e) => handleWamChange(e)}/>
                </div>

                <div>
                    <label>Units</label>
                    <input value={unitsCompleted} onChange={(e) => handleCreditChange(e)}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Wamometer