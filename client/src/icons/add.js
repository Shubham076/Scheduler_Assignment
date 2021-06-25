import React from 'react'

const add = (props) => {

    let style = props.style;
    return (
        <svg className="icon icon__add" style = {style} onClick= {props.click} viewBox="0 0 24 24">
            <path d="M18.984 12.984h-6v6h-1.969v-6h-6v-1.969h6v-6h1.969v6h6v1.969z"></path>
        </svg>
    )
}

export default add
