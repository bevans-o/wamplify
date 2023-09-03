import React from 'react'
import wamometer from './wamometer.module.css'

function WamometerThermo({markerSteps, value}: {markerSteps: number, value: number}) {

    const markers = [...Array(markerSteps + 1)];
    markers[2] = "90°C";
    markers[4] = "80°C";
    markers[6] = "70°C";
    markers[8] = "60°C";
    markers[10] = "50°C";

    return (
        <div className={wamometer.thermo}>
            <div className={wamometer.thermoMarkers}>
                {markers.map((marker, index) => 
                    <div key={index} className={`${wamometer.thermoMarker} ${(index >= markerSteps - (value / (100 / markerSteps)) ? wamometer.thermoMarkerActive : "")}`}>
                        {marker && <p aria-hidden>{marker}</p>}
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