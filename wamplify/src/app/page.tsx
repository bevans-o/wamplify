import wamplify from './page.module.css'
import Infobar from './components/Infobar/Infobar'
import Sidebar from './components/Sidebar/Sidebar'
import SubjectEntry from './components/Sidebar/SubjectEntry/SubjectEntry'
import ContentArea from './components/ContentArea/ContentArea'
import Wamplifier from './components/ContentArea/Wamplifier/Wamplifier'

export default function Home() {
  return (
    <main className={wamplify.main}>
      <Sidebar>
        <SubjectEntry/>
        <SubjectEntry/>
        <SubjectEntry/>
        <SubjectEntry/>
      </Sidebar>

      <ContentArea>
        <Wamplifier/>
        <Wamplifier/>
        <Wamplifier/>
        <Wamplifier/>
      </ContentArea>

      <Infobar message="Wamplify 0.0.1"/>
    </main>
  )
}
