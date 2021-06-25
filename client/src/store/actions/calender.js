import * as actionTypes from "./actionTypes"
import axios from "../../server"

export const initializeCalender = () => {
    return dispatch => {
        axios.get("/schedules")
        .then(res => {
            dispatch(setInitialdata(res.data.data, res.data.calender))
        })
        .catch(err => {
            console.log(err.response);
        })
    }
}

const setInitialdata = (data, calender) => {
    return{
        type: actionTypes.INTIALIZE_CALENDER,
        data: data,
        calender: calender
    }
}

export const increaseMonth = () => {
    return {
        type: actionTypes.INCREASE_MONTH
    }
}

export const decreaseMonth = () => {
    return {
        type: actionTypes.DECREASE_MONTH
    }
}

export const changeEditingStatus = (val) =>{
    return {
        type: val === true ? actionTypes.CHANGE_EDITING_STATUS_TO_TRUE:actionTypes.CHANGE_EDITING_STATUS_TO_FALSE 
    }
}

export const changeFormData = (data) => {
    return{
        type: actionTypes.CHANGE_FORM_DATA,
        teacherName: data.teacherName,
        batch: data.batch,
        timing: data.timing,
        date: data.date,
        id: data.id
    }
}

export const getDaySchedules = (date) => {
    return{
        type: actionTypes.GET_DAY_SCHEDULES,
        date: date
    }
}

export const addSchedule = data =>{
    return dispatch => {
       dispatch(addScheduleHelper(data));
       axios.post("/schedule", {data: data})
       .then(res => {
    })
    .catch(err => {
        console.log(err.response.data.message);
    })
    }
}

const addScheduleHelper = data => {
    return{
        type: actionTypes.ADD_SCHEDULE,
        data: data
    }
}

export const updateSchedule = data => {
    return dispatch =>{
        dispatch(updateSchedulehelper(data));
        axios.put(`/schedule/${data.id}`, {timing: data.timing, teacherName: data.teacherName, date:data.date})
        .then(res => {

        })
        .catch(err => {
            console.log(err.response.data.message)
        })
    }
}

export const updateSchedulehelper = data => {
    return{
        type:actionTypes.UPDATE_SCHEDULE,
        data: data
    }
}

export const removeSchedule = data => {
    return dispatch =>{
        dispatch(removeScheduleHelper(data));
        axios.delete(`/schedule/${data.id}`)
        .then(res => {

        })
        .catch(err => {
            console.log(err.response.data.message)
        })
    }
}

const removeScheduleHelper = (data) => {
    return {
        type:actionTypes.REMOVE_SCHEDULE,
        data: data
    }
}

export const getTeacherSchedules = name => {
    return{
        type: actionTypes.SEARCH_TEACHER_SCHEDULES,
        teacherName: name
    }
}

export const removeResults = () => {
    return{
        type: actionTypes.REMOVE_SEARCH_RESULTS
    }
}