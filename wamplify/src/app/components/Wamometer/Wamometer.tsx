import React, { useState, useEffect } from 'react'
import wamometer from './wamometer.module.css'
import WamometerThermo from './WamometerThermo';
import Divider from '../Divider/Divider';

interface WamometerProps {
    calcPredictedWam: Function;
    creditsInProgress: number;
}

function Wamometer({calcPredictedWam, creditsInProgress}: WamometerProps) {
    const [currentWam, setCurrentWam] = useState("0");
    const [unitsCompleted, setUnitsCompleted] = useState("0");
    const active = (currentWam && unitsCompleted);


    function handleWamChange(e: React.SyntheticEvent) {
        let input = e.target as HTMLInputElement;
        localStorage.setItem('current-wam', input.value)
        setCurrentWam(input.value);
    }

    function handleCreditChange(e: React.SyntheticEvent) {
        let input = e.target as HTMLInputElement;
        localStorage.setItem('units-completed', input.value)
        setUnitsCompleted(input.value);
    }

    function getWamDiff() {
        return (calcPredictedWam(currentWam, unitsCompleted) - parseFloat(currentWam)).toFixed(2)
    }

    useEffect(() => {
        localStorage.getItem('current-wam') ? setCurrentWam(String(localStorage.getItem('cuurent-wam'))) : setCurrentWam("0")
        localStorage.getItem('units-completed') ? setUnitsCompleted(String(localStorage.getItem('units-completed'))) : setUnitsCompleted("0")
    }, [])

  return (
    <div className={wamometer.body + " panel"}>
        <div className={wamometer.title}>Your Wamometer</div>
        
        
        <WamometerThermo markerSteps={20} value={calcPredictedWam(currentWam, unitsCompleted)}/>

        <div className={wamometer.wamContainer}>
            <div className={wamometer.wam}>
                <p className={wamometer.wamDiff}>({getWamDiff()})</p>
                <p className={wamometer.wamScore}>{calcPredictedWam(currentWam, unitsCompleted)}</p>
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