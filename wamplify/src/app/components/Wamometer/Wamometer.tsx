import React, { useState } from 'react'
import wamometer from './wamometer.module.css'
import WamometerThermo from './WamometerThermo';
import Divider from '../Divider/Divider';

interface WamometerProps {
    predictedWam: number;
    onCurrentWamChange?: Function;
    onCreditPointsChange?: Function;
}

function Wamometer({predictedWam, onCurrentWamChange, onCreditPointsChange}: WamometerProps) {
    const [currentWam, setCurrentWam] = useState("");
    const [creditPoints, setCreditPoints] = useState("");
    const active = (predictedWam && currentWam && creditPoints);


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
        <div className={wamometer.title}>Your Wamometer</div>
        
        
        <WamometerThermo markerSteps={20} value={predictedWam}/>

        <div className={wamometer.wamContainer}>
            <div className={wamometer.wam}>
                <p className={wamometer.wamDiff}>({predictedWam - parseFloat(currentWam)})</p>
                <p className={wamometer.wamScore}>{predictedWam}</p>
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