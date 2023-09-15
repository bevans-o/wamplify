'use client'

import wamplify from './page.module.css'
import Infobar from './components/Infobar/Infobar'
import PanelSlider from './components/PanelSlider/PanelSlider'
import { useEffect, useState } from 'react'
import {Subject} from './types/types'
import Header from './components/Header/Header'

export default function Home() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const newSubject = () => {
    var newArray: Subject[] = [...subjects];
    newArray.push({
      name: "",
      code: "",
      assessments: [],
    });
    setSubjects(newArray);
  }

  useEffect(() => {
    newSubject();
  }, [])


  return (
    <main className={wamplify.main}>
      <Header/>

      <PanelSlider/>

      <Infobar version="1.0.3" message="All scores are estimates!"/>
    </main>
  )
}
