import React from 'react'
import entry from './entry.module.css'

function AssessmentItemEntry({item} : any) {
  return (
    <div className={entry.assessment__container}>
        <p className='text-stronger'>{item.title}</p>
        <input defaultValue={item.weight}/>
    </div>
  )
}

export default AssessmentItemEntry