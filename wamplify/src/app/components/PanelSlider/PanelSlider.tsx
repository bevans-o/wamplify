import React, { useEffect } from 'react'
import { useState } from 'react'
import slider from './slider.module.css'
import Wamplifier from '../Wamplifier/Wamplifier'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import AddIcon from '@mui/icons-material/Add'
import generateID from '@/app/lib/functions/generateId';
import Wamometer from '../Wamometer/Wamometer'


function PanelSlider() {
  const CREDITS_PER_UNIT = 12.5;
  const [mobile, setMobile] = useState(false);
  const [totalTargetScore, setTotalTarget] = useState(0);
  const [newCredits, setNewCredits] = useState(0);
  const [wamplifiers, setWamplifiers] = useState<string[]>([generateID(32)]);

  
  const updateTotalTarget = (prevTarget: number, newTarget: number) => {
    setTotalTarget(totalTargetScore - prevTarget + newTarget)
    localStorage.setItem('total-target', (totalTargetScore - prevTarget + newTarget).toString())
  }

  const updateNewCredits = (prevCredits: number, addedCredits: number) => {
    setNewCredits(newCredits - prevCredits + addedCredits)
    localStorage.setItem('new-credits', (newCredits - prevCredits + addedCredits).toString())
  }
  
  const handleSave = (newWamplifiers: string[]) => {
    setWamplifiers(newWamplifiers);
    localStorage.setItem('wamplifiers', JSON.stringify(newWamplifiers));
  }

  const newSubject = () => {
    var newArray: string[] = [...wamplifiers];
    newArray.push(generateID(32))
    handleSave(newArray);
  }

  const removeSubject = (id: string) => {
    var newArray: string[] = wamplifiers.filter((item) => item != id);
    handleSave(newArray);
  }

  const getWamPrediction = (currWam: string, unitsCompleted: string) => {
    const totalPoints = parseFloat(currWam)*parseInt(unitsCompleted)*CREDITS_PER_UNIT  + totalTargetScore
    const totalCredits = parseInt(unitsCompleted)*CREDITS_PER_UNIT + newCredits
    return (isNaN(totalPoints/totalCredits) ? 0 : totalPoints/totalCredits).toFixed(2)
  }

  useEffect(() => {
    localStorage.getItem('wamplifiers') ? setWamplifiers(JSON.parse(localStorage.getItem('wamplifiers')!)) : setWamplifiers([generateID(32)]);
    localStorage.getItem('total-target') ? setTotalTarget(Number(localStorage.getItem('total-target'))) : setTotalTarget(0);
    localStorage.getItem('new-credits') ? setNewCredits(Number(localStorage.getItem('new-credits'))) : setNewCredits(0);
    

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

  
  console.log(totalTargetScore + " " + newCredits + " " + "Prediction: " + totalTargetScore/newCredits);
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

          {wamplifiers.map((id: string, index: number) => 
            <SwiperSlide key={id} className={slider.swiperSlide}>
                <Wamplifier id={id} onDelete={(idToRemove: string) => removeSubject(idToRemove)} onUpdateTarget={(prevTarget: number, currentTarget: number) => updateTotalTarget(prevTarget, currentTarget)} onUpdateCredits={(prevCredits: number, newCredits: number) => updateNewCredits(prevCredits, newCredits)}/>
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