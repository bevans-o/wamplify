import React, { useState } from 'react'
import entry from './entry.module.css'
import Divider from '../../misc/Divider'

function SubjectEntry({_code, _valid, _assessmentItems} : any) {
  const [subjectCode, setSubjectCode] = useState(_code);
  const [valid, setValid] = useState(_valid);
  const [assessmentItems, setAssessmentItems] = useState(_assessmentItems);

  return (
    <div className={entry.container}>
      <div className="fc">
        <label className={entry.subject_title}>...Subject Name</label>
        <input defaultValue={subjectCode}/>
      </div>

      {!valid && subjectCode && 
        <p>Please enter a valid subject code!</p>
      }

      {valid && 
        <>
          <Divider/>
          <div>
            {assessmentItems?.map((item : any, index: number) => {
              return (
                <div key={index}>
                  <p>{item.title}</p>
                  <input defaultValue={item.weight}/>
                </div>
              )
            })}
          </div>
        </>
      }

      

      
    </div>
  )
}

export default SubjectEntry