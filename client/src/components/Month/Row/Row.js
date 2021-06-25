import React from 'react';
import {connect} from "react-redux"
import AddIcon from '../../../icons/add';
import ViewIcon from '../../../icons/view'
import './row.css';
import {changeFormData, changeEditingStatus, getDaySchedules} from "../../../store/actions/index"
const Row = (props) => {
	let addbtnStyle = {
		height: '2rem',
		width: '2rem',
		fill: '#212121'
	};
	let months = ['January','February','March','April','May','June','July','August','September','October','November','December']

	let rowClicked = (el) => {
		let obj = {
			teacherName: "",
			batch: "",
			timing: "",
			date: months[props.activeMonth] + " " + el.no,
			id: ''
		}
		props.change_editing_status(false);
		props.change_form_data(obj);
		props.openForm();
	}

	let viewSchedules = el => {
		let date = months[props.activeMonth] + " " + el.no;
		props.get_day_schedules(date);
		props.toggleSidebar();
	}
	return (
		<div className="row">
			{props.data.map((el, i) => {
				return (
					<div
						key={i}
						className="rowItem"
						style={{
							border: !props.dayName ? '1.5px solid #ccc' : 'none',
							display: 'grid',
							justifyItems: !props.dayName ? 'right' : 'center',
							backgroundColor: el.noOfSchedules && !props.dayName> 0 ? '#ffcaaa' : '#fff'
						}}
					>
						<div
							style={{
								color: props.dayName ? '#F54748' : '#777',
								fontSize: props.dayName ? '1.5rem' : '1.4rem'
							}}
							className={'row1 ' + (!props.dayName ? 'row2' : '')}
						>
							{props.dayName ? el : (el.no !== -1 ? el.no : '')}

							{!props.dayName && el.no !== -1 ? (
								<div className="rowItem__iconSet">
									<AddIcon click= {() => rowClicked(el)} style={addbtnStyle} />
									<ViewIcon click= {() => viewSchedules(el)}/>
								</div>
							) : null}
						</div>
					</div>
				);
			})}
		</div>
	);
};

const mapStateToProps = state => {
	return{
		activeMonth: state.calender.activeMonth,
	}
}

const mapDispatchToProps = dispatch => {
	return{
		change_form_data: (n) => dispatch(changeFormData(n)),
		change_editing_status: (v) => dispatch(changeEditingStatus(v)),
		get_day_schedules: v => dispatch(getDaySchedules(v))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Row);
