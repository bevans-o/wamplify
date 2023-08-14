import React, { useEffect } from 'react'
import { useState } from 'react'
import slider from './slider.module.css'
import Wamplifier from '../Wamplifier/Wamplifier'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import AddIcon from '@mui/icons-material/Add';
import generateID from '@/app/utils/scripts/generateId';
import { AnimatePresence, motion } from 'framer-motion';

function PanelSlider() {

  const [mobile, setMobile] = useState(false);
  const [wamplifiers, setWamplifiers] = useState<string[]>([generateID(32)]);

  const newSubject = () => {
    var newArray: string[] = [...wamplifiers];
    newArray.push(generateID(32))
    setWamplifiers(newArray);
  }

  const removeSubject = (id: string) => {
    var newArray: string[] = wamplifiers.filter((item) => item != id);
    setWamplifiers(newArray);
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
          mousewheel={true}
          freeMode={!mobile}
          preventClicks={false}
          modules={[FreeMode]}
          cssMode={mobile}
          className={slider.swiper}
        >
          {wamplifiers.map((id: string, index: number) => 
            <SwiperSlide key={id}>
                <Wamplifier id={id} onDelete={(idToRemove: string) => removeSubject(idToRemove)}/>
            </SwiperSlide>
          )}

          <SwiperSlide className={slider.finalSlide}>
            <div className={slider.addContainer}>
              <button onClick={() => newSubject()} className={slider.add + " swiper-no-swiping"}>
                <AddIcon fontSize='large'/>
              </button>
            </div>
          </SwiperSlide>
          
        </Swiper>

        {/*
        <div className={slider.mobile}>
          {wamplifiers.map((id: string, index: number) => 
            <AnimatePresence>
              <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", duration: 0.25, bounce: 0.1}}
              key={id}>
                  <Wamplifier id={id} onDelete={(idToRemove: string) => removeSubject(idToRemove)}/>
              </motion.div>
            </AnimatePresence>
            
          )}

          <div className={slider.addContainer}>
            <button onClick={() => newSubject()} className={slider.add + " swiper-no-swiping"}>
              <AddIcon fontSize='large'/>
            </button>
          </div>
        </div>
        */}
        
    </div>
  )
}

export default PanelSlider