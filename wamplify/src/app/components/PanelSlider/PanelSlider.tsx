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
import generateID from '@/app/utils/scripts/generateId';

function PanelSlider() {

  const [wamplifiers, setWamplifiers] = useState<string[]>([]);

  const newSubject = () => {
    var newArray: string[] = [...wamplifiers];
    newArray.push(generateID(24))
    setWamplifiers(newArray);
  }

  const removeSubject = (id: string) => {
    var newArray: string[] = wamplifiers.filter((item) => item != id);
    setWamplifiers(newArray);
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
          {wamplifiers.map((id: string, index: number) => 
            <SwiperSlide key={id}>
                <Wamplifier key={id} id={id} onDelete={(idToRemove: string) => removeSubject(idToRemove)}/>
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