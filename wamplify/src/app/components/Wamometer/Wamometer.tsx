import React, { useState, useEffect } from 'react'
import wamometer from './wamometer.module.css'
import WamometerThermo from './WamometerThermo';
import Divider from '../Divider/Divider';
import { isValidUnits, isValidWam } from '@/app/lib/functions/inputValidation';

interface WamometerProps {
    calcPredictedWam: Function;
    creditsInProgress: number;
}

function Wamometer({calcPredictedWam, creditsInProgress}: WamometerProps) {
    const [currentWam, setCurrentWam] = useState("0");
    const [unitsCompleted, setUnitsCompleted] = useState("0");
    const active = (parseInt(currentWam) > 0 && parseInt(unitsCompleted) > 0);


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

    function getWamStateName(currentWam : string) {
        if(!isValidWam(currentWam) && currentWam != "") {
            return wamometer.invalid
        }
    }

    function getUnitsStateName(units : string) {
        if(!isValidUnits(units) && units != "") {
            return wamometer.invalid
        }
    }

    useEffect(() => {
        localStorage.getItem('current-wam') ? setCurrentWam(String(localStorage.getItem('current-wam'))) : setCurrentWam("0")
        localStorage.getItem('units-completed') ? setUnitsCompleted(String(localStorage.getItem('units-completed'))) : setUnitsCompleted("0")
    }, [])

  return (
    <div className={wamometer.body + " panel"}>
        <div className={wamometer.title}>Your Wamometer</div>
        
        {active &&
            <WamometerThermo markerSteps={20} value={calcPredictedWam(currentWam, unitsCompleted)}/>
        }
        
        {!active &&
            <WamometerThermo markerSteps={20} value={0}/>
        }

        <div className={wamometer.wamContainer}>
            <div className={`${wamometer.wam} ${active ? "" : wamometer.disabled}`}>
                <p className={wamometer.wamDiff}>{getWamDiff()} change</p>
                <p className={wamometer.wamScore}>{calcPredictedWam(currentWam, unitsCompleted)}</p>
            </div>
        </div>
        
        <div className={wamometer.footer}>
            <p className={wamometer.tip}>Enter your WAM and completed units to see your Wamplified score.</p>
                
            <div className={wamometer.inputs}>
                <div>
                    <label>Current WAM</label>
                    <input 
                    value={currentWam} 
                    onChange={(e) => handleWamChange(e)}
                    className={getWamStateName(currentWam)}/>
                </div>

                <div>
                    <label>Units</label>
                    <input 
                    value={unitsCompleted}
                    onChange={(e) => handleCreditChange(e)}
                    className={getUnitsStateName(unitsCompleted)}/>
                </div>
            </div>

            <p className={wamometer.points}>{parseInt(unitsCompleted) * 12.5} points complete, {creditsInProgress} in progress.</p>
        </div>
    </div>
  )
}

export default Wamometer