'use client'

import wamplify from './page.module.css'
import Infobar from './components/Infobar/Infobar'
import PanelSlider from './components/PanelSlider/PanelSlider'
import Header from './components/Header/Header'

export default function Home() {
  return (
    <main className={wamplify.main}>
      <Header/>

      <PanelSlider/>

      <Infobar version="1.0.3" message="All scores are estimates!"/>
    </main>
  )
}
