import React from 'react'

function ModalPanel({children} : any) {
   
  return (
    <div className="panel pad-2 fc dialog" style={{maxWidth: "24rem", gap: "1.5rem"}}>
      {children}
    </div>
  )
}

export default ModalPanel