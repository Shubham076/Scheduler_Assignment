import React from 'react'
import "./textError.css"

const TextError = (props) => {
    return (
        <div className = "error_box">
            {props.children}
        </div>
    )
}

export default TextError