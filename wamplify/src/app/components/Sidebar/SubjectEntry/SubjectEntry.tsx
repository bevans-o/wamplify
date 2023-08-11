import React, { useEffect, useState } from 'react'
import entry from './entry.module.css'
import Divider from '../../misc/Divider'
import AssessmentItemEntry from './AssessmentItemEntry';
import SubjectSearch from './SubjectSearch';
import initialSubjectList from '../../../api/Subjects_2023.json';
import { getAssessmentItems } from '@/app/api/getSubjectInfo';


export interface SearchResult {
  code: string,
  name: string
}

function SubjectEntry({_code, _valid, _assessmentItems, _subjectName, id} : any) {
  const [subjectCode, setSubjectCode] = useState(_code ? _code : "");
  const [valid, setValid] = useState(_valid ? _valid : false);
  const [assessmentItems, setAssessmentItems] = useState(_assessmentItems ? _assessmentItems : [
    {
      title: "Assignment 1",
      weight: 30,
      score: -1
    },
    {
      title: "Assignment 2",
      weight: 70,
      score: -1
    },
    {
      title: "Assignment 3",
      weight: 70,
      score: -1
    },
    {
      title: "Assignment 4 - an assignment with an extremely long name that really should be much shorter but the subject coordinator struggles with conciseness",
      weight: 70,
      score: -1
    }
  ]);
  const [subjectName, setSubjectName] = useState(_subjectName ? _subjectName : "Designing Novel Interactions");
  const [searchResults, setSearchResults] = useState<SearchResult[]>(initialSubjectList);

  

  useEffect(() => {

  }, [subjectCode, valid])

  const onSearchChange = (event: React.SyntheticEvent) => {
    let subjectInput = event.target as HTMLInputElement;
    setSubjectCode(subjectInput.value);

    console.log(`call getPredictiveSearch(${subjectInput.value}) | return array of subject name / code pairs`)

    let matches = initialSubjectList.filter(subject => {
      return subject.code.toLowerCase().includes(subjectInput.value.toLowerCase()) || subject.name.toLowerCase().includes(subjectInput.value.toLowerCase())
    }).slice(0,6);

    setSearchResults(matches)
  }

  const onSubjectSelect = (code: string) => {
    setSubjectCode(code);
    setValid(true);
    //console.log(getAssessmentItems(code));
    console.log(`call getSubjectAssessments(${code}) | return array of assessment items`);
  }

  return (
    <div className={entry.container + " panel"} id={`SubjectEntry--${id}`} tabIndex={-1}>
      <button className={entry.remove}>
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m294-214-79-80 185-186-185-186 79-80 186 186 186-186 79 80-185 186 185 186-79 80-186-186-186 186Z"/></svg>
        Remove Subject
      </button>

      <div className="fc pad">
        
        <SubjectSearch 
          value={subjectCode} 
          id={id}
          onChange={(event: React.SyntheticEvent) => onSearchChange(event)} 
          onSelect={(code: string) => onSubjectSelect(code)}
          searchResults={searchResults}
        />

        {subjectName && valid &&
          <h2 className={entry.subject_title + " text-stronger text-fix"}>{subjectName}</h2>
        }

        {!valid && subjectCode && 
          <p className={entry.warning + " text-note warning text-fix"}>Please enter a valid subject code!</p>
        }

      </div>

      
      {valid && 
        <>
          <Divider/>
          <div className="fc pad">
            <label className={entry.assessments__tip + " text-note text-fix"}>Enter your assessment scores as percentages (70%) or as weighted scores (14/20).</label>
            <div className={entry.assessments + " fc text-fix"}>
              {assessmentItems?.map((item : any, index: number) => {
                return (
                  <AssessmentItemEntry item={item} key={index}/>
                )
              })}
            </div>
          </div>
        </>
      }      
    </div>
  )
}

export default SubjectEntry