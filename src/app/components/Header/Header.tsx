import React, { useState } from 'react'
import header from './header.module.css'
import Logo from '../Logo/Logo'
import Button from '../Button/Button'
import HelpDialog from '../HelpDialog/HelpDialog'

function Header() {
    const [open, setOpen] = useState(false);

    const openHelp = () => {
        setOpen(true);
    }

    return (
        <div className={header.container}>
            <Logo/>
            <Button 
                text="What's Wamplify?" 
                onClick={(e : React.MouseEvent<HTMLElement>) => openHelp()}
                type="secondary"
                size="small"
            />
            
            <HelpDialog open={open} onClose={() => setOpen(false)}/>
        </div>
    )
}

export default Header