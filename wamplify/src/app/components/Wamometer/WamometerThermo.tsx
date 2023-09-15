import React from 'react'
import wamometer from './wamometer.module.css'

function WamometerThermo({markerSteps, value}: {markerSteps: number, value: number}) {

    const leftMarkers = [...Array(markerSteps + 1)];
    leftMarkers[2] = "90°C";
    leftMarkers[4] = "80°C";
    leftMarkers[6] = "70°C";
    leftMarkers[8] = "60°C";
    leftMarkers[10] = "50°C";

    const rightMarkers = [...Array(markerSteps + 1)];
    rightMarkers[4] = "H1";
    rightMarkers[6] = "H2";
    rightMarkers[8] = "H3";
    rightMarkers[10] = "P";

    return (
        <div className={wamometer.thermo}>
            <div className={wamometer.thermoMarkers}>
                {leftMarkers.map((marker, index) => 
                    <div key={index} className={`${wamometer.thermoMarker} ${(index >= markerSteps - (value / (100 / markerSteps)) ? wamometer.thermoMarkerActive : "")}`}>
                        {leftMarkers[index] && <p aria-hidden className={wamometer.leftMarker}>{leftMarkers[index]}</p>}
                        {rightMarkers[index] && <p aria-hidden className={wamometer.rightMarker}>{rightMarkers[index]}</p>}
                    </div>
                )}
            </div>

            <div>
                <div className={wamometer.thermoBulbBack}></div>
                <div className={wamometer.thermoTrackBack}></div>
            </div>
            
            {value > 0 && <div>
                <div className={wamometer.thermoBulbFront}></div>
                <div className={wamometer.thermoTrackContainer}>
                    <div className={wamometer.thermoTrackFront} style={{height: `${Math.min(value + 1, 100)}%`}}></div>
                </div>
            </div>}

        </div>
    )
}

export default WamometerThermo