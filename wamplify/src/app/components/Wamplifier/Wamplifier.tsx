import React, { useState } from 'react'
import axios from 'axios'
import wamplifier from './wamplifier.module.css'
import Divider from '../Divider/Divider'
import AssessmentInput from './Assessment/Assessment'
import Slider from '@mui/material/Slider'
import CircularProgress from '@mui/material/CircularProgress'
import CloseIcon from '@mui/icons-material/Close';
import { Assessment, SearchResult, Subject } from '@/app/types/types';
import SubjectSearch from './SubjectSearch/SubjectSearch';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';


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
  const [subject, setSubject] = useState<Subject>({name: "", code: "", assessments: []});
  const [isLoading, setLoading] = useState(false);

  const onSubjectSelect = (subject: SearchResult) => {
    setLoading(true);
    axios.post("/api/getSubjectInfo", subject)
    .then((res) => {
      setSubject(res.data);
      setLoading(false);
    })
    .catch((error) => console.log(error));
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
            
            { subject.name === "" && !isLoading &&
              <SubjectSearch id={id} onSelect={(subject : SearchResult) => onSubjectSelect(subject)}/>  
            }

            <button className={wamplifier.close}>
              <CloseIcon fontSize='medium' onClick={() => onDelete(id)}/>
            </button>
          </div>
            
          <Divider/>

          { isLoading && <CircularProgress/>}

          { !isLoading && 
            <Swiper direction={'vertical'}
              slidesPerView={'auto'}
              freeMode={true}
              scrollbar={true}
              mousewheel={true}
              modules={[FreeMode, Scrollbar, Mousewheel]}
            >
              <SwiperSlide className={wamplifier.assessmentContainer}>
                <div className={wamplifier.currentRate}>
                  <label>Enter the results from your past assignments. At this rate, you’ll get a...</label>
                  <div className={wamplifier.currentScore}>100</div>
                </div>
              

                <div className={wamplifier.assessments}>
                  {subject.assessments.map((assessment: Assessment, index: number) => 
                    <AssessmentInput assessment={assessment} highlighted={index < 2} key={index}/>
                  )}
                </div>
              </SwiperSlide>
            </Swiper>
          }

          <Divider/>

          <div>
            <div className={wamplifier.controls}>
              <div className={wamplifier.note}>Set your target score. Your incomplete assessments will reflect the required scores.</div>
            
              <div className={wamplifier.slider}>
                <Slider
                  aria-label="Target Score"
                  value={targetScore}
                  step={1}
                  min={50}
                  max={100}
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
              
            </div>

            <div className={wamplifier.footer}>
              <div className={wamplifier.target}>
                <div className={wamplifier.targetText}>
                  Your target for <span>{subject.code}</span> is
                </div>
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