import React from 'react'
import entry from './entry.module.css'
import Divider from '../../misc/Divider'

function SubjectEntry() {
  return (
    <div className={entry.container}>
      <div className="fc">
        <label className={entry.subject_title}>Designing Novel Interactions</label>
        <input></input>
      </div>

      <Divider/>

      <div>

      </div>
    </div>
  )
}

export default SubjectEntry