import React from 'react'

const right = (props) => {
    return (
        <svg onClick= {props.click} className ="icon icon__right" viewBox="0 0 32 32">
            <path d="M11.879 25.875l10.195-8.736c0.321-0.277 0.524-0.684 0.524-1.139s-0.202-0.862-0.522-1.137l-0.002-0.002-10.195-8.736c-0.973-0.834-2.476-0.143-2.476 1.139v17.475c0 1.281 1.503 1.973 2.476 1.136z"></path>
        </svg>
    )
}

export default right
