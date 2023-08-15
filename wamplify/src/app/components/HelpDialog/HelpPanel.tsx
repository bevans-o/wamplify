import React from 'react'
import help from '../HelpDialog/help.module.css'

function ModalPanel({children} : any) {
   
  return (
    <div className={`${help.panel} panel`}>
      {children}
    </div>
  )
}

export default ModalPanel