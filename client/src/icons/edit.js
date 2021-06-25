import React from 'react'

const edit = (props) => {
    return (
        <svg onClick= {props.click} className="icon icon__pencil"  viewBox="0 0 32 32">
            <path d="M22.89 0.11l-17.89 17.89-5 14 13.99-5 17.9-17.89c1-4-5-10-9-9zM9 22l-2-2 17-17 2 2-17 17z"></path>
        </svg>
    )
}

export default edit
