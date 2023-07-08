import React from 'react'
import sidebar from './sidebar.module.css'
import Logo from './Logo/Logo'

function Sidebar({addNew, children} : any) {
  return (
    <div className={sidebar.container}>
        <header className={sidebar.header}>
            <Logo/>
        </header>

        <div className={sidebar.content}>
            {children}
            <button 
              className={sidebar.addSubject + " text-stronger"}
              onClick={() => addNew()}
            >
              Add another subject
            </button>
        </div>
    </div>
  )
}

export default Sidebar