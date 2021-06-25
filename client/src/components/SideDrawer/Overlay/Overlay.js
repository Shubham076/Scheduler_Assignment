import React from 'react'

const Overlay = (props) => {
    return (
        <div onClick= {props.click} style= {{
            display: props.show === true? 'block' : 'none',
            position: 'fixed',
            left: '0',
            top: '0',
            height: '100vh',
            width: '100vw',
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 100,
            cursor: 'pointer'
        }}>
            
        </div>
    )
}

export default Overlay
