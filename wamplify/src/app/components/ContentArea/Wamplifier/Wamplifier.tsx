import React, { useState } from 'react'
import wamplifier from './wamplifier.module.css'
import Divider from '../../misc/Divider'
import WamplifierAssessment from './WamplifierAssessment'
import Slider from '@mui/material/Slider';
import { Assessment } from '@/app/types/types';

const sliderMarks = [
  {
    value: 50,
    label: 'P',
  },
  {
    value: 65,
    label: 'H3',
  },
  {
    value: 70,
    label: 'H2B',
  },
  {
    value: 75,
    label: 'H2A',
  },
  {
    value: 80,
    label: 'H1',
  },
];

function Wamplifier({_subject}: any) {
  const [targetScore, setTargetScore] = useState(50);

  return (
    <div>
        <div className={wamplifier.body + " panel"}>
          <div className={wamplifier.header + " fc pad"}>
            <h2 className={wamplifier.title}>{_subject.name}</h2>
            <h3 className={wamplifier.code}>{_subject.code}</h3>
          </div>
            
          <Divider/>

          <div className={wamplifier.assessmentContainer + " fc pad"}>
            <div> 
              <h3>Complete</h3>
              <div className={wamplifier.assessments + " " + wamplifier.complete}>
                {_subject.completeAssessments.map((assessment: Assessment, index: number) => 
                  <WamplifierAssessment assessment={assessment} complete={true} key={index}/>
                )}
              </div>
            </div>
            
            <div>
              <h3>Incomplete</h3>
              <div className={wamplifier.assessments}>
                {_subject.incompleteAssessments.map((assessment: Assessment, index: number) => 
                  <WamplifierAssessment assessment={assessment} complete={false} key={index}/>
                )}
              </div>
            </div>
          </div>

          <Divider/>

          <div className={wamplifier.controls + " pad"}>
            <div className={wamplifier.slider}>
              <Slider
                aria-label="Target Score"
                value={targetScore}
                step={1}
                min={50}
                valueLabelDisplay="auto"
                marks={sliderMarks}
                className="slider swiper-no-swiping"
                onChange={(e, value) => {
                  if (Array.isArray(value)) {
                    setTargetScore(value[0]);
                  }
                  else {
                    setTargetScore(value)
                  }
                }}
              />
            </div>

            <div className={wamplifier.scores}>
              <div>
                <span>
                  Your current average
                </span>
                <input/>
              </div>

              <div>
                <span>
                  Your wamplified score
                </span>
                <input 
                  value={targetScore}
                  onChange={(e) => {
                    setTargetScore(parseInt(e.target.value));
                  }}/>
              </div>
              
            </div>
          </div>

        </div>
    </div>
  )
}

export default Wamplifier