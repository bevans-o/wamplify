import React, { useState } from 'react'
import wamometer from './wamometer.module.css'
import WamometerThermo from './WamometerThermo';
import Divider from '../Divider/Divider';

interface WamometerProps {
    calcPredictedWam: Function;
}

function Wamometer({calcPredictedWam}: WamometerProps) {
    const [currentWam, setCurrentWam] = useState("0");
    const [creditPoints, setCreditPoints] = useState("0");
    const active = (currentWam && creditPoints);


    function handleWamChange(e: React.SyntheticEvent) {
        let input = e.target as HTMLInputElement;
        setCurrentWam(input.value);
    }

    function handleCreditChange(e: React.SyntheticEvent) {
        let input = e.target as HTMLInputElement;
        setCreditPoints(input.value);
    }

    function getWamDiff() {
        return (calcPredictedWam(currentWam, creditPoints) - parseFloat(currentWam)).toPrecision(2)
    }

  return (
    <div className={wamometer.body + " panel"}>
        <div className={wamometer.title}>Your Wamometer</div>
        
        
        <WamometerThermo markerSteps={20} value={calcPredictedWam(currentWam, creditPoints)}/>

        <div className={wamometer.wamContainer}>
            <div className={wamometer.wam}>
                <p className={wamometer.wamDiff}>({getWamDiff()})</p>
                <p className={wamometer.wamScore}>{calcPredictedWam(currentWam, creditPoints)}</p>
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
                    <label>Credit Points</label>
                    <input value={creditPoints} onChange={(e) => handleCreditChange(e)}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Wamometer