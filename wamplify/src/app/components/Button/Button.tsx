import React from 'react'
import button from './button.module.css'

function Button({type, size, text, onClick} : any) {
    var typeClass : string = button.primary;
    var sizeClass : string = button.medium;

    switch (type) {
        case "primary":
            typeClass = button.primary;
            break;
        case "secondary":
            typeClass = button.secondary;
            break;
        case "tertiary":
            typeClass = button.tertiary;
            break;
    }

    switch (size) {
        case "large":
            sizeClass = button.large;
            break;
        case "medium":
            sizeClass = button.medium;
            break;
        case "small":
            sizeClass = button.small;
            break;
    }

  return (
    <button onClick={(e: React.MouseEvent<HTMLElement>) => onClick(e)} className={button.main + " " + typeClass + " " + sizeClass}>
        {text}
    </button>
  )
}

export default Button