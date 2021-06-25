import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import {v4} from 'uuid'; 
import './form.css';
import { addSchedule, updateSchedule, changeFormData } from '../../store/actions/index';
import FormikControl from '../FormElements/formikControl';

const isNumber = (n) => {
	return !isNaN(n);
};

const isPositive = (n) => {
	return Number.parseInt(n) > 0
}

const isInteger = n => {
	return Number.isInteger(parseFloat(n));
}
const checkNumber = n =>{
	return isNumber(n) && isPositive(n) && isInteger(n)
}

const isOverlapping = (fs, fe, ss, se) => {
	fs = parseInt(fs);
	fe = parseInt(fe);
	ss = parseInt(ss);
	se = parseInt(se);

	if(fs <= ss && se <= fe){
		return true;
	}
	return false;
}
const months =  ['January','February','March','April','May','June','July','August','September','October','November','December']

class ScheduleForm extends Component {
	saveData = (data, id) => {
		if (this.props.editing === true) {
			this.props.update_schedule({...data, id: this.props.id});
		} else {
			this.props.add_schedule({...data, id});
			this.props.change_form_data({
				teacherName: '',
				batch: '',
				timing: '',
				date: ''
			});
		}
		
		this.props.closeForm();
	};

	render() {
		const intialState = {
			teacherName: this.props.teacherName ? this.props.teacherName : '',
			batch: this.props.batch ? this.props.batch : '',
			timing: this.props.timing ? this.props.timing : '',
			date: this.props.date ? this.props.date : ''
		};
		let temp = this.props.data;
		let e = this.props.editing
		let name = ""
		let date = ""
		const validationSchema = yup.object({
			teacherName: yup.string().required('This field is required')
				.test("teacher", function(value){
					let {path, createError} = this
					if(value != undefined){
						let a = ["A", "B","C","D"];
						if(!a.includes(value)){
							return createError({ path, message: 'Select Teacher from A, B, C, D' });
						}
						return true;
					}
				}),
			batch: yup.string().required('This field is required').test('isValidBatch', function(value) {
				let { path, createError } = this;
				if(e == true){
					return true
				}
				if (value != undefined) {
					for (let el of temp) {
						if (el.batch === value) {
							return createError({ path, message: 'Batch Already Exists' });
						}
					}
					return true;
				}
			}),
			timing: yup.string().required('This field is required')
					.test('isRangeValid', function(value){
						let { path, createError } = this;
						if(value != undefined){
							let x = value.split("-");
							if(x.length <= 1 || x.length > 2){
								return createError({ path, message: 'Add time in format x-y'});
							}
							if(!checkNumber(x[0]) || !checkNumber(x[1])){
								return createError({ path, message: 'start and end time must be positive integers' });
							}
							if(x[0] === x[1]){
								return createError({ path, message: 'start and end time should be different' });
							}

							for(let el of temp){
								let y = el.timing.split("-");
								if(el.teacherName === name && el.date === date && isOverlapping(x[0], x[1], y[0], y[1])){
									return createError({ path, message: 'Time overlap with previous batches' });
								}
							}
							return true;
						}
					}),
			date: yup.string().required('This field is required').test('isValidDate', function(value) {
				let { path, createError } = this;
				if (value != undefined) {
					let x = value.split(' ');
					if (x.length <= 1) {
						return createError({ path, message: 'Add date in format: Month date' });
					} else {
						if(!months.includes(x[0])){
							return createError({ path, message: 'Add a valid month' });
						}
						if (x[1] === '') {
							return createError({ path, message: 'Add a valid date' });
						}
						if (!checkNumber(x[1])) {
							return createError({ path, message: 'Add a valid date' });
						}
						return true;
					}
				}
			})
		});

		let headerContent = this.props.editing ? 'Edit the details' : 'Enter the details';

		return (
			<div className="form">
				<h1 className="formHeader">{headerContent}</h1>
				<Formik
					initialValues={intialState}
					onSubmit={(values) => {
						this.saveData(values, v4());
					}}
					validationSchema={validationSchema}
					validateOnMount
					enableReinitialize
				>
					{(formik) => {
						name = formik.values.teacherName
						date = formik.values.date
						return (
							<Form
								autoComplete="off"
								noValidate
								style={{
									display: 'flex',
									flexDirection: 'column',
									width: '100%'
								}}
							>
								<FormikControl
									control="input"
									type="text"
									label="Teacher Name"
									name="teacherName"
									dataPresent={this.props.teacherName.length > 0}
									touched={formik.touched.teacherName}
								/>

								<FormikControl
									control="input"
									type="text"
									label="Batch Name"
									name="batch"
									editing={this.props.editing}
									dataPresent={this.props.batch.length > 0}
									touched={formik.touched.batch}
								/>
								<FormikControl
									control="input"
									type="text"
									label="Date"
									name="date"
									dataPresent={this.props.date.length > 0}
									touched={formik.touched.date}
								/>

								<FormikControl
									control="input"
									type="text"
									label="Timing"
									name="timing"
									dataPresent={this.props.timing.length > 0}
									touched={formik.touched.timing}
								/>


								<div
									style={{
										padding: '0 1rem'
									}}
								>
									<button type="submit" disabled={!formik.isValid} className="btn__submit">
										Save
									</button>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		date: state.calender.date,
		editing: state.calender.editing,
		teacherName: state.calender.teacherName,
		batch: state.calender.batch,
		timing: state.calender.timing,
		activeMonth: state.calender.activeMonth,
		data: state.calender.data,
		id: state.calender.id
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		add_schedule: (d) => dispatch(addSchedule(d)),
		update_schedule: (d) => dispatch(updateSchedule(d)),
		change_form_data: (d) => dispatch(changeFormData(d))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleForm);
