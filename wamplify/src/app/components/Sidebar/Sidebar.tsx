import React from 'react'
import sidebar from './sidebar.module.css'
import Logo from './Logo/Logo'

function Sidebar({children} : any) {
  return (
    <div className={sidebar.container}>
        <header className={sidebar.header}>
            <Logo/>
        </header>

        <div className={sidebar.content}>
            {children}
        </div>
    </div>
  )
}

export default Sidebar