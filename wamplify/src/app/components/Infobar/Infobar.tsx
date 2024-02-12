import React from 'react'
import infobar from './infobar.module.css'

interface InfobarProps {
  version: string;
  message: string;
}

function Infobar({version, message} : InfobarProps) {
  return (
    <div className={infobar.container}>
      <div>
        <span className={infobar.version}>Wamplify {version}</span>
        <span className={infobar.message}>{message}</span>
      </div>
        
      <div className={infobar.credits}>
        👹
        <a target='_blank' href='https://www.linkedin.com/in/risa-pais/'>Risa</a>
        <span> & </span>
        <a target='_blank' href='https://www.linkedin.com/in/ben-evans-48b4111ab/'>Ben</a>
      </div>
    </div>
  )
}

export default Infobar