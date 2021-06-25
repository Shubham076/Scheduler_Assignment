import React from 'react'

const left = (props) => {
    return (
        <svg onClick= {props.click} className = "icon icon__left" viewBox="0 0 32 32">
            <path d="M20.121 6.125l-10.195 8.736c-0.321 0.277-0.524 0.684-0.524 1.139s0.202 0.862 0.522 1.137l0.002 0.002 10.195 8.736c0.973 0.834 2.476 0.142 2.476-1.139v-17.475c0-1.281-1.503-1.973-2.476-1.136z"></path>
        </svg>
    )
}

export default left
