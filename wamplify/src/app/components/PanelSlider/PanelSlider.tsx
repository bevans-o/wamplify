import React, { useEffect } from 'react'
import { useState } from 'react'
import slider from './slider.module.css'
import Wamplifier from '../Wamplifier/Wamplifier'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import AddIcon from '@mui/icons-material/Add'
import Wamometer from '../Wamometer/Wamometer'
import { subjectsAtom, addSubjectAtom, removeSubjectAtom } from '@/app/types/store'
import { useAtom } from 'jotai'


function PanelSlider() {
  const CREDITS_PER_UNIT = 12.5;
  const [mobile, setMobile] = useState(false);
  const [subjectList, setSubjectList] = useAtom(subjectsAtom);
  const [, addSubject] = useAtom(addSubjectAtom);
  const [, deleteSubject] = useAtom(removeSubjectAtom);

  const newSubject = () => {
    addSubject();
  }

  const removeSubject = (id: string) => {
    deleteSubject(id)
  }

  const getWamPrediction = (currWam: string, unitsCompleted: string) => {
    let totalPoints = parseFloat(currWam)*parseInt(unitsCompleted)*CREDITS_PER_UNIT
    subjectList.forEach(subject => {
      totalPoints += subject.credits*subject!.targetScore
    });
    let totalCredits = parseInt(unitsCompleted)*CREDITS_PER_UNIT + getCreditsInProgress()
    return (isNaN(totalPoints/totalCredits) ? 0 : totalPoints/totalCredits).toFixed(2)
  }

  const getCreditsInProgress = () => {
    let credits = 0
    subjectList.forEach((subject) => credits += subject.credits)
    return credits
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
            <Wamometer calcPredictedWam={getWamPrediction} creditsInProgress={getCreditsInProgress()}/>
          </SwiperSlide>

          {subjectList.map((subject , index ) => 
            <SwiperSlide key={index} className={slider.swiperSlide}>
                <Wamplifier subject={subject} onDelete={removeSubject}/>
            </SwiperSlide>
          )}

          <SwiperSlide className={slider.swiperSlide}>
            <div className={`${slider.addContainer} ${subjectList.length > 0 ? "" : slider.promptAdd}`}>
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