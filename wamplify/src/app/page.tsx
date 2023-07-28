'use client'

import wamplify from './page.module.css'
import Infobar from './components/Infobar/Infobar'
import Sidebar from './components/Sidebar/Sidebar'
import SubjectEntry from './components/Sidebar/SubjectEntry/SubjectEntry'
import ContentArea from './components/ContentArea/ContentArea'
import Wamplifier from './components/ContentArea/Wamplifier/Wamplifier'
import { useEffect, useState } from 'react'

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
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const newSubject = () => {
    var newArray: Subject[] = [...subjects];
    newArray.push({
      name: "",
      code: "",
      incompleteAssessments: [],
      completeAssessments: []
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
      </ContentArea>

      <Infobar version="0.0.2" message="Subject scores are estimates!"/>
    </main>
  )
}
