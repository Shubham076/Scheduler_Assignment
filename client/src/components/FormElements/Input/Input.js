import React from 'react'
import ErrorBox from "../TextError/TextError"
import { Field, ErrorMessage } from 'formik'
import "./input.css"

const Input = ( props ) => {
    const { label, name, touched, type, dataPresent,editing, ...rest } = props
    return (
        <div className = "input">
            <Field disabled= {editing && name === 'batch'}  id = {name} {...rest} className= "input__field" type={type} name = {name} />
				<label className={"input__label" +' ' +
				(touched || dataPresent === true ? "move" : null)}
		        htmlFor = {name}>
                    {label}
				</label>
                <ErrorMessage component = {ErrorBox} name = {name}/>
                           
        </div>
    )
}

export default Input