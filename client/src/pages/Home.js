import React, { Component } from 'react';
import Month from '../components/Month/Month';
import MonthHeader from '../components/MonthHeader/MonthHeader';
import AddIcon from '../icons/add';
import SideDrawer from '../components/SideDrawer/Sidedrawer';
import Schedules from '../components/Schedules/Schedules';
import Form from '../components/Form/Form';
import { connect } from 'react-redux';
import Search from "../components/Search/Search"
import Spinner from "../components/Spinner/Spinner"
import {
	initializeCalender,
	increaseMonth,
	decreaseMonth,
	changeFormData,
	changeEditingStatus,
} from '../store/actions/index';
export class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			months: [
				'January','February','March','April','May','June','July','August','September','October','November','December'],
			show: false,
			showForm: false,
			showSearch: false
		};
		this.props.initialize_calender();
	}
	toggleSideDrawerHandler = () => {
		this.setState({
			show: !this.state.show
		});
	};

	toggleSearchDrawer = () =>{
		this.setState({
			showSearch: !this.state.showSearch
		})
	}
	openFormHandler = () => {
		this.setState({
			showForm: true
		});
	};

	closeFormHandler = () => {
		this.setState({
			showForm:false
		})
	}

	addBtnHandler = () => {
		let obj = {
			teacherName: '',
			batch: '',
			timing: '',
			date: this.state.months[this.props.activeMonth] + " ",
			id: ''
		};
		this.props.change_form_data(obj);
		this.props.change_editing_status(false);
		this.openFormHandler();
	};
	render() {
		let addBtnStyle = {
			height: '4rem',
			width: '4rem',
			fill: '#fff'
		};
		return (
			<React.Fragment>
				<MonthHeader
					increase={this.props.increase_month}
					decrease={this.props.decrease_month}
					month={this.state.months[this.props.activeMonth]}
					openSearchDrawer = {this.toggleSearchDrawer}
				/>
				{this.props.calender.length > 0 ? (
					<Month
						toggleSidebar={this.toggleSideDrawerHandler}
						openForm={this.openFormHandler}
						data={this.props.calender[this.props.activeMonth]}
					/>
				) : <Spinner/>}
				<div className="addbtn">
					<AddIcon style={addBtnStyle} click={this.addBtnHandler} />
				</div>

				<SideDrawer show={this.state.show} close={this.toggleSideDrawerHandler}>
					<h1 className="schedule_headind">Schedules for the day</h1>
					<Schedules openForm={this.openFormHandler} />
				</SideDrawer>

				<SideDrawer left={true} show={this.state.showForm} close={this.closeFormHandler}>
					<Form closeForm ={ this.closeFormHandler} />
				</SideDrawer>

				<SideDrawer show= {this.state.showSearch} close= {this.toggleSearchDrawer}>
					<Search openForm= {this.openFormHandler}/>
				</SideDrawer>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		activeMonth: state.calender.activeMonth,
		calender: state.calender.calender,
		editing: state.calender.editing,
		teacherName: state.calender.teacherName,
		batch: state.calender.batch,
		timing: state.calender.timing,
		date: state.calender.date
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		initialize_calender: () => dispatch(initializeCalender()),
		increase_month: () => dispatch(increaseMonth()),
		decrease_month: () => dispatch(decreaseMonth()),
		change_form_data: (v) => dispatch(changeFormData(v)),
		change_editing_status: (v) => dispatch(changeEditingStatus(v)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
