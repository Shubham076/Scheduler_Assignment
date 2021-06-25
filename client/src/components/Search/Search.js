import React, {useEffect} from 'react';
import {connect} from "react-redux"
import {getTeacherSchedules} from "../../store/actions/index"
import "./Seach.css"
import Schedules from "../Schedules/Schedules"
const Search = (props) => {
    useEffect(() => {
        let input = document.querySelector(".select input")
        input.value = "";
    },[])
    let isValid = (val) => {
        let arr = ["A", "B", "C", "D"];
        return arr.includes(val);
    }
    let changeHandler = e => {
        let error_box = document.querySelector(".input_errors");
        if(e.target.value.length == 0){
            error_box.classList.add("hide")
        }
        if(!isValid(e.target.value)){
            error_box.classList.remove("hide")
        }
        else{
            error_box.classList.add("hide")
            props.get_teacher_schedules(e.target.value);
            return;
        }
    }
	return (
		<React.Fragment>
            <h1 className= "search__header">Search</h1>
			<div className="select">
                <input type="text"onChange= {e => changeHandler(e)} placeholder= "Search for a teacher"/>
                <div className="input_errors hide">Select a teacher from A, B, C, D</div>
			</div>
            <div style={{height: '3rem'}}></div>
            <Schedules editing= {false} openForm = {props.openForm}/>
		</React.Fragment>
	);
};
const mapStateToProps = state => {
    return{

    }
}

const mapDispatchToProps = dispatch => {
    return{
        get_teacher_schedules: n => dispatch(getTeacherSchedules(n))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);
