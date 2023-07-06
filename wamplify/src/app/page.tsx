'use client'

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
        <SubjectEntry index={1} _code={"INFO30005"} _valid={true} _subjectName={"Advanced Interface Prototyping"} _assessmentItems={
          [
            {
              title: "Assignment 1",
              weight: 30
            },
            {
              title: "Assignment 2",
              weight: 70
            }
          ]
        }/>
        <SubjectEntry index={2} _code={"lalalala"} _valid={false}/>
        <SubjectEntry index={3}/>
        <SubjectEntry index={4} _code={"MAST10007"} _valid={true} _subjectName={"Linear Algebra"} _assessmentItems={
          [
            {
              title: "Assignment 1",
              weight: 30
            },
            {
              title: "Assignment 2",
              weight: 70
            },
            {
              title: "Assignment 3",
              weight: 70
            },
            {
              title: "Assignment 4 - an assignment with an extremely long name that really should be much shorter but the subject coordinator struggles with conciseness",
              weight: 70
            }
          ]
        }/>
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
