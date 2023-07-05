import React, { useState } from 'react'
import entry from './entry.module.css'
import Divider from '../../misc/Divider'
import AssessmentItemEntry from './AssessmentItemEntry';

function SubjectEntry({_code, _valid, _assessmentItems, _subjectName} : any) {
  const [subjectCode, setSubjectCode] = useState(_code ? _code : "");
  const [valid, setValid] = useState(_valid ? _valid : false);
  const [assessmentItems, setAssessmentItems] = useState(_assessmentItems ? _assessmentItems : []);
  const [subjectName, setSubjectName] = useState(_subjectName ? _subjectName : "");

  return (
    <div className={entry.container + " panel"}>
      <div className="fc pad">
        <input defaultValue={subjectCode} placeholder="Search for a subject or subject code."/>

        <h2 className={entry.subject_title + " text-stronger text-fix"}>{subjectName}</h2>

        {!valid && subjectCode && 
          <p className="text-note warning text-fix">Please enter a valid subject code!</p>
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