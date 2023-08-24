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
  const emptySubject = {name: "", code: "", assessments: []}
  const [targetScore, setTargetScore] = useState(50);
  const [maxScore, setMaxScore] = useState(100);
  const [subject, setSubject] = useState<Subject>(emptySubject);
  const [averageMark, setAverageMark] =  useState(calculateSubjectAverage(subject.assessments));
  const [isLoading, setLoading] = useState(false);

  const handleSaveAverageMark = (newAverageMark : number) => {
    localStorage.setItem(id+'-average-mark', newAverageMark.toFixed());
    setAverageMark(newAverageMark);
  }

  const handleSaveTargetScore = (newTargetScore: number) => {
    localStorage.setItem(id+'-target-score',newTargetScore.toString());
    setTargetScore(newTargetScore);
  }

  const handleSaveMaxScore = (newMaxScore: number) => {
    localStorage.setItem(id+'-max-score',newMaxScore.toString());
    setMaxScore(newMaxScore);
  }

  const handleSaveSubject = (newSubject: Subject) => {
    localStorage.setItem(id+'-subject',JSON.stringify(newSubject));
    setSubject(newSubject);
  }



  const handleDelete = (id: string) => {
    onDelete(id);
    localStorage.removeItem(id+'-target-score');
    localStorage.removeItem(id+'-max-score');
    localStorage.removeItem(id+'-subject');
    localStorage.removeItem(id+'-average-mark');
    subject.assessments.forEach((assessment, index) => 
      {console.log(index + '-' + id);
      localStorage.removeItem(index+'-'+id+'-score')}
    )
  }


  useEffect(() => {
    localStorage.getItem(id+'-target-score') ? setTargetScore(Number(localStorage.getItem(id+'-target-score'))) : setTargetScore(50);
    localStorage.getItem(id+'-max-score') ? setMaxScore(Number(localStorage.getItem(id+'-max-score'))) : setMaxScore(100);
    localStorage.getItem(id+'-subject') ? setSubject(JSON.parse(localStorage.getItem(id+'-subject')!))  : setSubject(emptySubject);
    localStorage.getItem(id+'-average-mark') ? setAverageMark(Number(localStorage.getItem(id+'-average-mark'))) : calculateSubjectAverage(subject.assessments);
    
  }, [])

  const onSubjectSelect = (subjectSelection: SearchResult) => {
    setLoading(true);
    axios.post("/api/getSubjectInfo", subjectSelection)
    .then((res) => {
      handleSaveSubject(res.data);
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
    let desiredScore = (remainingTarget/weightRemaining) * 100
    newSubject.assessments.forEach((assessment) => {
      if (!assessment.completed && assessment.weight > 0){
        assessment.desiredScore = Math.round(desiredScore);
      }
      if (!assessment.completed && assessment.weight == 0){
        assessment.desiredScore = 100;
      }
    });
  
    handleSaveSubject(newSubject);

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
              <CloseIcon fontSize='medium' onClick={() => handleDelete(id)}/>
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
                    <div className={wamplifier.currentScore}>{Math.round(averageMark)}</div>
                  </div>

                  <div className={wamplifier.assessments}>
                    {subject.assessments.map((assessment: Assessment, index: number) => 
                      <AssessmentInput 
                        assessment={assessment} 
                        highlighted={index < 2} 
                        onChange={() =>  {
                          let newAverage = calculateSubjectAverage(subject.assessments);
                          let newMax = getMaxScore(subject.assessments);
                          let newTargetScore = targetScore > newMax ? newMax : targetScore;

                          handleSaveMaxScore(newMax);
                          handleSaveTargetScore(newTargetScore);
                          updateDesiredScores(getRemainingTarget(subject.assessments, newTargetScore));
                          handleSaveAverageMark(newAverage);
                        }} 
                      id={id}
                      key={index} 
                      index={index}
                      targetScore={targetScore}/>
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
                      handleSaveTargetScore(value[0]);
                      updateDesiredScores(getRemainingTarget(subject.assessments, value[0]));
                    }
                    else {
                      handleSaveTargetScore(value);
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
                    if (!isNaN(Number(e.target.value)) && Number(e.target.value) <= 100) {
                      let newTargetScore = parseInt(e.target.value == "" ? "0" : e.target.value);
                      handleSaveTargetScore(newTargetScore);
                    }
                  }}
                  onKeyDown={(e) => e.key == "Enter" && e.currentTarget.blur()}
                  onBlur={(e) => {
                    let newTargetScore = targetScore;
                    if (!isNaN(Number(e.target.value)) && Number(e.target.value) <= 100) {
                      newTargetScore = parseInt(e.target.value == "" ? "0" : e.target.value);
                      handleSaveTargetScore(newTargetScore);
                    }
                    updateDesiredScores(getRemainingTarget(subject.assessments, newTargetScore));
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
