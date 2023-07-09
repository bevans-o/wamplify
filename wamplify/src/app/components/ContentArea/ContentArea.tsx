import React from 'react'
import content from './content.module.css'
import Wamplifier from './Wamplifier/Wamplifier'
import { Subject, Assessment } from '@/app/page'

function ContentArea({children} : any) {

  const testSubjects : Subject[] = [
    {
      name: "People, Culture, Society, Language, Power, Self & Other",
      code: "ANTH30121",
      incompleteAssessments: [
        {
          title: "pee pee wee wee",
          weight: 30,
          score: -1
        },
        {
          title: "essay with quite long title investigating the collision of causality and effectuationism",
          weight: 40,
          score: -1
        }
      ],
      completeAssessments: [
        {
          title: "completed assessment",
          weight: 30,
          score: 23
        }
      ]
    },
    {
      name: "Advanced Interface Prototyping",
      code: "INFO30005",
      incompleteAssessments: [
        {
          title: "Assignment 2",
          weight: 70,
          score: -1
        }
      ],
      completeAssessments: [
        {
          title: "Assignment 1",
          weight: 30,
          score: 30
        }
      ]
    },
    {
      name: "Advanced Studies in Kahooting",
      code: "QUIZ90002",
      incompleteAssessments: [
        {
          title: "another one",
          weight: 5,
          score: -1
        },
        {
          title: "exam",
          weight: 50,
          score: -1
        }
      ],
      completeAssessments: [
        {
          title: "little annoying quiz",
          weight: 5,
          score: 4
        },
        {
          title: "little annoying quiz",
          weight: 5,
          score: 3
        },
        {
          title: "little annoying quiz",
          weight: 5,
          score: 4.5
        },
        {
          title: "little annoying quiz",
          weight: 5,
          score: 3
        },
        {
          title: "little annoying quiz",
          weight: 5,
          score: 4
        },
        {
          title: "little annoying quiz",
          weight: 5,
          score: 5
        },
        {
          title: "little annoying quiz",
          weight: 5,
          score: 5
        },
        {
          title: "little annoying quiz",
          weight: 5,
          score: 2
        },
        {
          title: "little annoying quiz",
          weight: 5,
          score: 3
        }
      ]
    }
  ]


  return (
    <div className={content.container}>
        {children}

        {testSubjects.map((subject: Subject, index) => 
          <Wamplifier _subject={subject}/>
        )}
    </div>
  )
}

export default ContentArea