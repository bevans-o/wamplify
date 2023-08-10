import React, { useState } from 'react'
import header from './header.module.css'
import Logo from '../Logo/Logo'
import Button from '../Button/Button'
import Dialog from '@mui/material/Dialog'
import ModalPanel from '../ModalPanel/ModalPanel'

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
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            PaperComponent={ModalPanel}
        >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

            <Button
                text="Wamplify me!"
                onClick={() => setOpen(false)}
            />
            
        </Dialog>
    </div>
  )
}

export default Header