import React from 'react'
import infobar from './infobar.module.css'

function Infobar({message} : any) {
  return (
    <div className={infobar.container}>
        <div className={infobar.message}>{message}</div>
        <div className={infobar.credits}>
            <a>Risa</a>
            <span>&</span>
            <a>Ben</a>
        </div>
    </div>
  )
}

export default Infobar