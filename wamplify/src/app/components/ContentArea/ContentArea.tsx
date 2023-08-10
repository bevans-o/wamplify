import React from 'react'
import { useEffect, useState } from 'react'
import content from './content.module.css'
import Wamplifier from './Wamplifier/Wamplifier'
import { Subject, Assessment } from '@/app/page'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import Button from '../Button/Button';

function ContentArea() {

  const [subjects, setSubjects] = useState<Subject[]>([]);

  const newSubject = () => {
    var newArray: Subject[] = [...subjects];
    newArray.push({
      name: "",
      code: "",
      incompleteAssessments: [],
      completeAssessments: []
    });
    setSubjects(newArray);
  }

  useEffect(() => {
    newSubject();
  }, [])

  

  return (
    <div className={content.container}>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={0}
          grabCursor={true}
          mousewheel={true}
          freeMode={true}
          preventClicks={false}
          modules={[FreeMode]}
          className={content.swiper}
        >
          {subjects.map((subject: Subject, index: number) => 
            <SwiperSlide>
                <Wamplifier _subject={subject}/>
            </SwiperSlide>
          )}

          <SwiperSlide>
            <Button 
                text="Add Subject"
                onClick={() => newSubject()}
              >
              Add another subject
            </Button>
          </SwiperSlide>
          
        </Swiper>
    </div>
  )
}

export default ContentArea