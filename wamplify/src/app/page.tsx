'use client'

import wamplify from './page.module.css'
import Infobar from './components/Infobar/Infobar'
import Sidebar from './components/Sidebar/Sidebar'
import SubjectEntry from './components/Sidebar/SubjectEntry/SubjectEntry'
import ContentArea from './components/ContentArea/ContentArea'
import Wamplifier from './components/ContentArea/Wamplifier/Wamplifier'
import { useEffect, useState } from 'react'

interface Assessment {
  title: string,
  weight: number
}

interface Subject {
  name: string,
  code: string,
  assessments: Assessment[]
}

export default function Home() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const newSubject = () => {
    var newArray: Subject[] = [...subjects];
    newArray.push({
      name: "",
      code: "",
      assessments: []
    });
    setSubjects(newArray);
  }

  useEffect(() => {
    newSubject();
  }, [])


  return (
    <main className={wamplify.main}>
      <Sidebar addNew={() => newSubject()}>
        {subjects.map((subject: Subject, index) => 
          <SubjectEntry id={index}/>
        )}
      </Sidebar>

      <ContentArea>
        {subjects.map((subject: Subject, index) => 
          <Wamplifier/>
        )}
      </ContentArea>

      <Infobar message="Wamplify 0.0.1"/>
    </main>
  )
}
