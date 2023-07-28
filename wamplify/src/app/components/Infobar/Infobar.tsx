import React from 'react'
import infobar from './infobar.module.css'

function Infobar({version, message} : any) {
  return (
    <div className={infobar.container}>
      <div>
        <span className={infobar.version}>Wamplify {version}</span>
        <span className={infobar.message}>{message}</span>
      </div>
        
      <div className={infobar.credits}>
        <a>Risa</a>
        <span>&</span>
        <a>Ben</a>
      </div>
    </div>
  )
}

export default Infobar