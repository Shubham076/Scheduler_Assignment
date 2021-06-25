import React from 'react';
import './schedule.css';
import EditIcon from "../../../icons/edit"
import DeleteIcon from '../../../icons/delete';
import {connect} from "react-redux"
import {changeEditingStatus, changeFormData, removeSchedule} from "../../../store/actions/index"
const Schedule = ({ teacherName, batch, timing, date, openForm,id, ...props }) => {
	let edithandler = () => {
		props.change_form_data({teacherName,batch, timing, date, id})
		props.change_edting_status(true);
		openForm();
	}
	return (
		<div className="schedule">
				<div style={{
					display: 'flex',
					justifyContent: 'space-between'
				}}>
					<div className="schedule__batchname">{batch}</div>
					<div className="schedule__icons">
						{props.editing != false ? <EditIcon click= {edithandler}/> : null}
						<DeleteIcon click= {() => props.delete_schedule({teacherName, batch,timing, date,id})}/>
					</div>
				</div>
				<div className="schedule__teacher_name">{teacherName}</div>
                <div style= {{display: 'flex', fontSize: '1.3rem', justifyContent:'space-between'}}>
                    <div className="schedule__timing">{timing}</div>
                    <div className="schedule__day">{date}</div>
                </div>
			</div>
	);
};
const mapStateToProps = state => {
	return{
		
	}
}
const mapDispatchToprops = dispatch => {
	return{
		change_edting_status: (v) => dispatch(changeEditingStatus(v)),
		change_form_data: (n) => dispatch(changeFormData(n)),
		delete_schedule : d => dispatch(removeSchedule(d))
	}
}
export default connect(mapStateToProps, mapDispatchToprops)(Schedule);
