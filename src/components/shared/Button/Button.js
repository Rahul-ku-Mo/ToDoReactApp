import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./navbarButton.css"
const Button = ({btnInput,icon}) => {
  return (
    <div className="navbar-btn text-base special-btn w-full"><FontAwesomeIcon icon={icon} className="pr-2"/>{btnInput}</div>
  )
}

export default Button;