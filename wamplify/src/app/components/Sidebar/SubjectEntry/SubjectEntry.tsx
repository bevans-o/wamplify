import React, { useEffect, useState } from 'react'
import entry from './entry.module.css'
import Divider from '../../misc/Divider'
import AssessmentItemEntry from './AssessmentItemEntry';
import SubjectSearch from './SubjectSearch';




function SubjectEntry({_code, _valid, _assessmentItems, _subjectName, id} : any) {
  const [subjectCode, setSubjectCode] = useState(_code ? _code : "");
  const [valid, setValid] = useState(_valid ? _valid : false);
  const [assessmentItems, setAssessmentItems] = useState(_assessmentItems ? _assessmentItems : []);
  const [subjectName, setSubjectName] = useState(_subjectName ? _subjectName : "");

  

  useEffect(() => {
    console.log(subjectCode)
  }, [subjectCode, valid])

  const onSubjectChange = (event: React.SyntheticEvent) => {
    let subjectInput = event.target as HTMLInputElement;
    setSubjectCode(subjectInput.value);

    console.log(`call getPredictiveSearch(${subjectInput.value}) | return array of subject name / code pairs`)
  }

  const onSubjectSelect = (code: string) => {
    setSubjectCode(code);
    console.log(`call getSubjectAssessments(${code}) | return array of assessment items`);
  }

  return (
    <div className={entry.container + " panel"} id={`SubjectEntry--${id}`} tabIndex={-1}>
      <div className="fc pad">
        
        <SubjectSearch 
          value={subjectCode} 
          id={id}
          onChange={(event: React.SyntheticEvent) => onSubjectChange(event)} 
          onSelect={(code: string) => onSubjectSelect(code)}
        />

        {subjectName && 
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