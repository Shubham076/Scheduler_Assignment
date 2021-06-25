import React from 'react'

const view = (props) => {
    return (
        <svg onClick= {props.click} className="icon icon__view" viewBox="0 0 20 20">
            <path d="M16 16v2h-12v-2h-4v-12h4v-2h12v2h4v12h-4zM14 5.5v-1.5h-8v12h8v-10.5zM16 6v8h2v-8h-2zM4 6h-2v8h2v-8z"></path>
        </svg>
    )
}

export default view
