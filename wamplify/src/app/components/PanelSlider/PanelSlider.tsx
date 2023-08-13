import React from 'react'
import { useEffect, useState } from 'react'
import slider from './slider.module.css'
import Wamplifier from '../Wamplifier/Wamplifier'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import Button from '../Button/Button';
import AddIcon from '@mui/icons-material/Add';
import { Subject } from '@/app/types/types';

function PanelSlider() {

  const [subjects, setSubjects] = useState<Subject[]>([]);

  const newSubject = () => {
    var newArray: Subject[] = [...subjects];
    newArray.push({
      name: "",
      code: "",
      assessments: []
    });
    setSubjects(newArray);
  }

  useEffect(() => {
    newSubject();
  }, [])

  

  return (
    <div className={slider.container}>

        <Swiper
          slidesPerView={'auto'}
          spaceBetween={0}
          grabCursor={true}
          mousewheel={true}
          freeMode={true}
          preventClicks={false}
          modules={[FreeMode]}
        >
          {subjects.map((subject: Subject, index: number) => 
            <SwiperSlide key={index}>
                <Wamplifier subject={subject} id={index}/>
            </SwiperSlide>
          )}

          <SwiperSlide>
            <div className={slider.addContainer}>
              <button onClick={() => newSubject()} className={slider.add + " swiper-no-swiping"}>
                <AddIcon fontSize='large'/>
              </button>
            </div>
          </SwiperSlide>
          
        </Swiper>
        
    </div>
  )
}

export default PanelSlider