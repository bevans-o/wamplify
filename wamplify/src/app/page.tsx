'use client'

import wamplify from './page.module.css'
import Infobar from './components/Infobar/Infobar'
import ContentArea from './components/ContentArea/ContentArea'

import 'swiper/css';
import 'swiper/css/free-mode';
import Header from './components/Header/Header'

export interface Assessment {
  title: string,
  weight: number,
  score: number
}

export interface Subject {
  name: string,
  code: string,
  incompleteAssessments: Assessment[],
  completeAssessments: Assessment[]
}

export default function Home() {

  return (
    <main className={wamplify.main}>
      <Header/>

      <ContentArea/>

      <Infobar version="0.0.2" message="Subject scores are estimates!"/>
    </main>
  )
}
