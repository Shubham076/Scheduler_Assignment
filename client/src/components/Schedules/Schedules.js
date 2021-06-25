import React from 'react';
import Schedule from './Schedule/Schedule';
import './schedules.css'
import {connect} from "react-redux";
export const Schedules = (props) => {
	return(
        <div className= "schedules">
            {
                props.data.length == 0 ? 
                (
                    <div className="schedules_empty">
                        <h1>No Schedules Found</h1>
                    </div>
                )
                :
                (props.data.map((d, i) => {
                    return <Schedule editing={props.editing} openForm= {props.openForm} {...d} key = {i} />
                }))
            }
        </div>
    )
};

const mapStateToProps = (state) => {
	return{
		data: state.calender.schedules
	}
}

const mapDispatchToProps = dispatch => {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedules)
