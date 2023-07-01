import Image from 'next/image'
import wamplify from './page.module.css'
import Infobar from './components/Infobar/Infobar'
import Sidebar from './components/Sidebar/Sidebar'
import SubjectEntry from './components/Sidebar/SubjectEntry/SubjectEntry'

export default function Home() {
  return (
    <main className={wamplify.main}>
      <Sidebar>
        <SubjectEntry/>
        <SubjectEntry/>
        <SubjectEntry/>
        <SubjectEntry/>
      </Sidebar>

      <div className={`${wamplify.content} debug`}>

      </div>

      <Infobar message="Wamplify 0.0.1"/>
    </main>
  )
}
