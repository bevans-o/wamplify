import React, { useState, useEffect } from 'react'
import axios from 'axios'
import wamplifier from './wamplifier.module.css'
import Divider from '../Divider/Divider'
import AssessmentInput from './Assessment/Assessment'
import Slider from '@mui/material/Slider'
import CloseIcon from '@mui/icons-material/Close'
import { Assessment, SearchResult, Subject } from '@/app/types/types'
import SubjectSearch from './SubjectSearch/SubjectSearch';
import { calculateSubjectAverage, getMaxScore, getRemainingTarget } from '@/app/lib/functions/subjectScoreCalculations'
import { newSubjectAtom, updateSubjectAtom } from '@/app/types/store'

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import LoadingBox from '../LoadingBox/LoadingBox'
import { useAtom } from 'jotai'


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
  //onUpdateTarget: Function;
  //onUpdateCredits: Function;
  //onUpdateSubject: Function;
  subject: Subject
}

function Wamplifier({subject, id, onDelete} : WamplifierProps) {
  const [,updateSubject] = useAtom(updateSubjectAtom);
  const [isLoading, setLoading] = useState(false);

  //Function to load subject assessments from API
  const onSubjectSelect = (subjectSelection: SearchResult) => {
    setLoading(true);
    axios.post("/api/getSubjectInfo", subjectSelection)
    .then((res) => {
      updateSubject({...res.data, id: subject.id, targetScore: subject.targetScore});
      setLoading(false);
    }).catch((error) => console.error(error));
  }

  //Updates assessment default input based on target and current assessment
  const updateDesiredScores = (subject: Subject) => {
    let remainingTarget = getRemainingTarget(subject.assessments, subject.targetScore)
    let newSubject = {...subject}
    let weightRemaining = 100;
    newSubject.assessments.forEach((assessment) => {
      if (assessment.completed) {
        weightRemaining -= assessment.weight;
      }
    })
    let desiredScore = (remainingTarget/weightRemaining) * 100
    newSubject.assessments.forEach((assessment) => {
      if (!assessment.completed && assessment.weight > 0){
        assessment.desiredScore = Math.round(desiredScore);
      }
      if (!assessment.completed && assessment.weight == 0){
        assessment.desiredScore = 100;
      }
    });
  
    return newSubject
  }
  

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
          <CloseIcon fontSize='medium' onClick={() => onDelete(subject.id)}/>
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
          mousewheel={{forceToAxis: true}}
          grabCursor={true}
          modules={[FreeMode, Mousewheel]}
          className={wamplifier.swiper}
        >
          <SwiperSlide className={wamplifier.assessmentContainer}>
              <div className={wamplifier.currentRate}>
                <label>Enter the results from your past assignments. At this rate, you’ll get a...</label>
                <div className={wamplifier.currentScore}>{Math.round(calculateSubjectAverage(subject.assessments))}</div>
              </div>

              <div className={wamplifier.assessments}>
                {subject.assessments.map((assessment: Assessment, index: number) => 
                  <AssessmentInput 
                    assessment={assessment} 
                    highlighted={index < 2} 
                    onChange={() =>  {
                      let newMax = getMaxScore(subject.assessments);
                      let newTargetScore = subject.targetScore > newMax ? newMax : subject.targetScore;
                      updateSubject(updateDesiredScores({...subject, targetScore: newTargetScore}))
                    }} 
                  id={id}
                  key={index} 
                  index={index}
                  targetScore={subject.targetScore}/>
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
              value={subject.targetScore}
              step={1}
              min={50}
              max={getMaxScore(subject.assessments)}
              valueLabelDisplay="auto"
              marks={sliderMarks}
              className="slider swiper-no-swiping"
              onChange={(e, value) => {
                if (Array.isArray(value)) {
                  updateSubject(updateDesiredScores({...subject, targetScore: value[0]}));
                }
                else {
                  updateSubject(updateDesiredScores({...subject, targetScore: value}));
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
              value={subject.targetScore.toFixed(0)}
              onChange={(e) => {
                if (!isNaN(Number(e.target.value)) && Number(e.target.value) <= 100) {
                  let newTargetScore = parseInt(e.target.value == "" ? "0" : e.target.value);
                  updateSubject(updateDesiredScores({...subject, targetScore: newTargetScore}))
                }
              }}
              onKeyDown={(e) => e.key == "Enter" && e.currentTarget.blur()}
              onBlur={(e) => {
                let newTargetScore = subject.targetScore;
                if (!isNaN(Number(e.target.value)) && Number(e.target.value) <= 100) {
                  newTargetScore = parseInt(e.target.value == "" ? "0" : e.target.value);
                  updateSubject(updateDesiredScores({...subject, targetScore: newTargetScore}));
                }
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
