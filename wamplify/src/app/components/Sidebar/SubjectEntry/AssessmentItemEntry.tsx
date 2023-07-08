import React from 'react'
import entry from './entry.module.css'

function AssessmentItemEntry({item} : any) {

  const onAssessmentChange = (event: React.SyntheticEvent) => {
    let subjectInput = event.target as HTMLInputElement;

    console.log(`call setScore(${item.title}, ${subjectInput.value}) | return valid / invalid score`)
  }

  return (
    <div className={entry.assessment__container}>
        <p className='text-stronger'>{item.title}</p>
        <input onChange={(event) => onAssessmentChange(event)} defaultValue={item.weight}/>
    </div>
  )
}

export default AssessmentItemEntry