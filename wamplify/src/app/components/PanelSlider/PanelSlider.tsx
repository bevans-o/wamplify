import React, { useEffect } from 'react'
import { useState } from 'react'
import slider from './slider.module.css'
import Wamplifier from '../Wamplifier/Wamplifier'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import AddIcon from '@mui/icons-material/Add';
import generateID from '@/app/lib/functions/generateId';
        
function PanelSlider() {

  const [mobile, setMobile] = useState(false);
  const [wamplifiers, setWamplifiers] = useState<string[]>([generateID(32)]);

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

  useEffect(() => {
    localStorage.getItem('wamplifiers') ? setWamplifiers(JSON.parse(localStorage.getItem('wamplifiers')!)) : setWamplifiers([generateID(32)]);

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
          {wamplifiers.map((id: string, index: number) => 
            <SwiperSlide key={id} className={slider.swiperSlide}>
                <Wamplifier id={id} onDelete={(idToRemove: string) => removeSubject(idToRemove)}/>
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