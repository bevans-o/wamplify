import React from 'react'
import wamplifier from './wamplifier.module.css'
import Divider from '../../misc/Divider'

function Wamplifier() {
  return (
    <div>
        <div className={wamplifier.body + " panel"}>
            <h2></h2>
            <Divider/>
            <div></div>
            <Divider/>
            <div></div>

        </div>
    </div>
  )
}

export default Wamplifier