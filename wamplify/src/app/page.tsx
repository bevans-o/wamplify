import Image from 'next/image'
import wamplify from './page.module.css'
import Infobar from './components/Infobar/Infobar'

export default function Home() {
  return (
    <main className={wamplify.main}>
      <div className={`${wamplify.sidebar} debug`}>

      </div>

      <div className={`${wamplify.content} debug`}>

      </div>

      <Infobar message="Wamplify 0.0.1"/>
    </main>
  )
}
