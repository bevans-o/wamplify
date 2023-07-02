import React from 'react'
import content from './content.module.css'

function ContentArea({children} : any) {
  return (
    <div className={content.container}>
        {children}
    </div>
  )
}

export default ContentArea