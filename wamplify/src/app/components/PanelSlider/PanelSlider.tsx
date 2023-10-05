import React, { useEffect } from 'react'
import { useState } from 'react'
import slider from './slider.module.css'
import Wamplifier from '../Wamplifier/Wamplifier'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import AddIcon from '@mui/icons-material/Add'
import generateID from '@/app/lib/functions/generateId'
import Wamometer from '../Wamometer/Wamometer'
import { newSubjectAtom, subjectsAtom, addSubjectAtom, removeSubjectAtom } from '@/app/types/store'
import { useAtom } from 'jotai'
import { Subject } from '@/app/types/types'
import { PrimitiveAtom } from 'jotai'


function PanelSlider() {
  const CREDITS_PER_UNIT = 12.5;
  const [mobile, setMobile] = useState(false);
  const [blankSubject, setNewSubject] = useAtom(newSubjectAtom);
  const [subjectList, setSubjectList] = useAtom(subjectsAtom);
  const [, addSubject] = useAtom(addSubjectAtom);
  const [, deleteSubject] = useAtom(removeSubjectAtom);
  const [totalTargetScore, setTotalTarget] = useState(0);
  const [newCredits, setNewCredits] = useState(0);
  const [wamplifiers, setWamplifiers] = useState<string[]>([generateID(32)]);

  const newSubject = () => {
    addSubject();
  }

  const removeSubject = (id: string) => {
    deleteSubject(id)
  }

  const getWamPrediction = (currWam: string, unitsCompleted: string) => {
    const totalPoints = parseFloat(currWam)*parseInt(unitsCompleted)*CREDITS_PER_UNIT  + totalTargetScore
    const totalCredits = parseInt(unitsCompleted)*CREDITS_PER_UNIT + newCredits
    return (isNaN(totalPoints/totalCredits) ? 0 : totalPoints/totalCredits).toFixed(2)
  }

  useEffect(() => {

    function handleResize() {
      if (window.innerWidth < 800) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    // unsubscribe on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  

  return (
    <div className={slider.container}>

        <Swiper
          slidesPerView={'auto'}
          spaceBetween={0}
          grabCursor={true}
          centeredSlides={mobile}
          freeMode={!mobile}
          preventClicks={false}
          modules={[FreeMode, Mousewheel]}
          cssMode={mobile}
          mousewheel={{forceToAxis: true}}
          className={slider.swiper}
        >
          <SwiperSlide className={slider.swiperSlide}>
            <Wamometer calcPredictedWam={getWamPrediction} creditsInProgress={newCredits}/>
          </SwiperSlide>

          {subjectList.map((subject , index ) => 
            <SwiperSlide key={index} className={slider.swiperSlide}>
                <Wamplifier subject={subject} id={generateID(32)} onDelete={removeSubject}/>
            </SwiperSlide>
          )}

          <SwiperSlide className={slider.swiperSlide}>
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