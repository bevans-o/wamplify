import React, { useState, useEffect } from 'react'
import axios from 'axios'
import wamplifier from './wamplifier.module.css'
import Divider from '../Divider/Divider'
import AssessmentInput from './Assessment/Assessment'
import Slider from '@mui/material/Slider'
import CircularProgress from '@mui/material/CircularProgress'
import CloseIcon from '@mui/icons-material/Close'
import { Assessment, SearchResult, Subject } from '@/app/types/types'
import SubjectSearch from './SubjectSearch/SubjectSearch';
import { calculateSubjectAverage, getMaxScore, getRemainingTarget } from '@/app/utils/scripts/subjectScoreCalculations'

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import LoadingBox from '../LoadingBox/LoadingBox'
import Logo from '../Logo/Logo'


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
  id: string; 
  onDelete: Function;
}

function Wamplifier({id, onDelete}: WamplifierProps) {
  const [targetScore, setTargetScore] = useState(50);
  const [maxScore, setMaxScore] = useState(100);
  const [subject, setSubject] = useState<Subject>({name: "", code: "", assessments: []});
  const [averageMark, setAverageMark] =  useState(calculateSubjectAverage(subject.assessments));
  const [isLoading, setLoading] = useState(false);


  useEffect(() => {
    
  }, [maxScore])

  const onSubjectSelect = (subjectSelection: SearchResult) => {
    setLoading(true);
    axios.post("/api/getSubjectInfo", subjectSelection)
    .then((res) => {
      setSubject(res.data);
      setLoading(false);
    }).catch((error) => console.log(error));
  }

  const updateDesiredScores = (remainingTarget: number) => {
    let newSubject = {...subject}
    let weightRemaining = 100;
    newSubject.assessments.forEach((assessment) => {
      if (assessment.completed) {
        weightRemaining -= assessment.weight;
      }
    })
    //console.log("remaining target " + remainingTarget)
    let desiredScore = (remainingTarget/weightRemaining) * 100
    newSubject.assessments.forEach((assessment) => {
      if (!assessment.completed && assessment.weight > 0){
        assessment.desiredScore = Math.round(desiredScore);
      }
    });

    setSubject(newSubject);

  }

 // updateDesiredScores(getRemainingTarget(subject.assessments, targetScore));
  
  

  return (
        <div className={wamplifier.body + " panel"} tabIndex={-1} id={`Wamplifier--${id}`}>
          <div className={wamplifier.header}>
            { subject.name != "" &&
            <div className='fc'>
              <h2 className={wamplifier.title}>{subject.name}</h2>
              <h3 className={wamplifier.code}>{subject.code}</h3>
            </div>
            }
            
            { (subject.name === "" || isLoading) &&
              <SubjectSearch id={id} onSelect={(subject : SearchResult) => onSubjectSelect(subject)}/>  
            }

            <button className={wamplifier.close}>
              <CloseIcon fontSize='medium' onClick={() => onDelete(id)}/>
            </button>
          </div>
            
          <Divider/>
          

          { (isLoading || subject.code == "") && 
          <div className={wamplifier.contentEmpty}>
            <LoadingBox isLoading={isLoading} rows={3}/>
            
          </div>
          }

          { !isLoading && subject.code != "" &&
            <Swiper direction={'vertical'}
              slidesPerView={'auto'}
              freeMode={true}
              mousewheel={true}
              grabCursor={true}
              modules={[FreeMode, Mousewheel]}
              className={wamplifier.swiper}
            >
              <SwiperSlide className={wamplifier.assessmentContainer}>
                  <div className={wamplifier.currentRate}>
                    <label>Enter the results from your past assignments. At this rate, you’ll get a...</label>
                    <div className={wamplifier.currentScore}>{Math.round(averageMark)}</div>
                  </div>

                  <div className={wamplifier.assessments}>
                    {subject.assessments.map((assessment: Assessment, index: number) => 
                      <AssessmentInput 
                        assessment={assessment} 
                        highlighted={index < 2} 
                        onChange={() =>  {
                          setAverageMark(calculateSubjectAverage(subject.assessments));
                          let newMax = getMaxScore(subject.assessments)
                          setMaxScore(newMax);
                          targetScore > newMax && setTargetScore(newMax); 
                          targetScore > newMax ? updateDesiredScores(getRemainingTarget(subject.assessments, newMax)) :
                          updateDesiredScores(getRemainingTarget(subject.assessments, targetScore));
                        }} 
                      key={index} targetScore={targetScore}/>
                    )}
                  </div>
                
              </SwiperSlide>
            </Swiper>
          }

          <Divider/>

          { (isLoading || subject.code == "") && 
          <div className={wamplifier.footerEmpty}>
            <LoadingBox isLoading={isLoading} rows={1}/>
          </div>
          }

          { !isLoading && subject.code != "" && <div>
            <div className={wamplifier.controls}>
              <div className={wamplifier.note}>Set your target score. Your incomplete assessments will reflect the required scores.</div>
            
              <div className={wamplifier.slider}>
                <Slider
                  aria-label="Target Score"
                  value={targetScore}
                  step={1}
                  min={50}
                  max={maxScore}
                  valueLabelDisplay="auto"
                  marks={sliderMarks}
                  className="slider swiper-no-swiping"
                  onChange={(e, value) => {
                    if (Array.isArray(value)) {
                      setTargetScore(value[0]);
                      updateDesiredScores(getRemainingTarget(subject.assessments, value[0]));
                    }
                    else {
                      setTargetScore(value)
                      updateDesiredScores(getRemainingTarget(subject.assessments, value));
                    }
                  }}
                />
              </div>
              
            </div>

            <div className={wamplifier.footer}>
              <div className={wamplifier.target}>
                <div className={wamplifier.targetText}>
                  Your target for <span>{subject.code}</span> is
                </div>
                <input 
                  value={targetScore.toFixed(0)}
                  onChange={(e) => {
                    !isNaN(Number(e.target.value)) && Number(e.target.value) <= 100 &&
                    setTargetScore(parseInt(e.target.value == "" ? "0" : e.target.value));
                    updateDesiredScores(getRemainingTarget(subject.assessments, targetScore));
                  }}
                  onBlur={(e) => {
                    !isNaN(Number(e.target.value)) && Number(e.target.value) <= 100 &&
                    setTargetScore(parseInt(e.target.value == "" ? "0" : e.target.value));
                    updateDesiredScores(getRemainingTarget(subject.assessments, targetScore));
                  }
                  }
                  />
              </div>
            </div>
            
          </div>}
        
        </div>
  )
}

export default Wamplifier