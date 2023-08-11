import React, { useState } from 'react'
import wamplifier from './wamplifier.module.css'
import Divider from '../Divider/Divider'
import AssessmentInput from './Assessment'
import Slider from '@mui/material/Slider';
import { Assessment, Subject } from '@/app/types/types';
import SubjectSearch from './SubjectSearch/SubjectSearch';


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

interface WamplifierProps {
  subject: Subject;
  id: number; 
}

function Wamplifier({id}: WamplifierProps) {
  const [targetScore, setTargetScore] = useState(50);
  const [subject, setSubject] = useState<Subject>({name: "", code: "", assessments: []});

  const onSubjectSelect = (code: string) => {
    console.log(`TODO: implement and call getSubject(${code})`);
  }

  return (
        <div className={wamplifier.body + " panel"} tabIndex={-1} id={`Wamplifier--${id}`}>
          <div className={wamplifier.header + " fc pad"}>
            <h2 className={wamplifier.title}>{subject.name}</h2>
            <h3 className={wamplifier.code}>{subject.code}</h3>
            <SubjectSearch id={id} onSelect={(code : string) => onSubjectSelect(code)}/>
          </div>
            
          <Divider/>

          <div className={wamplifier.assessmentContainer + " fc pad"}>
            <div> 
              <h3>Complete</h3>
              <div className={wamplifier.assessments + " " + wamplifier.complete}>
                {subject.assessments.map((assessment: Assessment, index: number) => 
                  <AssessmentInput assessment={assessment} complete={true} key={index}/>
                )}
              </div>
            </div>
            
            <div>
              <h3>Incomplete</h3>
              <div className={wamplifier.assessments}>
                {subject.assessments.map((assessment: Assessment, index: number) => 
                  <AssessmentInput assessment={assessment} complete={false} key={index}/>
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
  )
}

export default Wamplifier