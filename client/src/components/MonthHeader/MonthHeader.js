import React from 'react';
import Left from '../../icons/left';
import Right from '../../icons/right';
import SearchIcon from '../../icons/search';
import {removeResults} from "../../store/actions/index"
import {connect} from "react-redux"
import './MontHeader.css';
const MonthHeader = (props) => {
	let btnClickHandler = () => {
		props.openSearchDrawer();
		props.remove_results();
	}
	return (
		<div className="monthheader">
			<div onClick= {props.increase} className="monthheader__name">{props.month}</div>
			<div style= {{
                marginLeft: "3rem"
            }}>
				<Left click= {props.decrease} />
				<Right click= {props.increase} />
			</div>
			<button onClick={btnClickHandler} className= "search_btn" >Search
				<SearchIcon/>
			</button>
		</div>
	);
};
const mapStateToProps = state =>{
	return{

	}
}

const mapDispatchToprops = dispatch => {
	return{
		remove_results : () => dispatch(removeResults())
	}
}

export default connect(mapStateToProps, mapDispatchToprops)(MonthHeader);
