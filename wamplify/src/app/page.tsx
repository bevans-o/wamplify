'use client'

import wamplify from './page.module.css'
import Infobar from './components/Infobar/Infobar'
import PanelSlider from './components/PanelSlider/PanelSlider'
import Wamplifier from './components/Wamplifier/Wamplifier'
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

      <Infobar version="0.1.3" message="Subject scores are estimates!"/>
    </main>
  )
}
