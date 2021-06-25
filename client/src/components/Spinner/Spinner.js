import React from 'react'
import "./spinner.css"
const Spinner = () => {
    return (
        <div style= {{
            height: '100%',
            width: '100%',
            position:'fixed',
            left:'0',
            top:'0'
        }}>
            <div className="room_spinner"></div>
        </div>
    )
}

export default Spinner
