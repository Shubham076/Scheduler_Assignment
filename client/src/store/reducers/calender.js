import * as actionTypes from '../actions/actionTypes';
const months =  ['January','February','March','April','May','June','July','August','September','October','November','December']

function changeCalender(calender, date, activeMonth, val) {
	let temp = JSON.parse(JSON.stringify(calender));
	let arrs = temp[activeMonth];
	for (let arr of arrs) {
		for (let el of arr) {
			if (el.no == date.split(' ')[1]) {
				if(el.noOfSchedules === 0 && val === -1){

				}
				else{
					el.noOfSchedules += val;
				}
			}
		}
	}
	return temp;
}

function removeFromSchedules(arr, data){
	let temp = [...arr];
	temp = temp.filter(el => el.batch !== data.batch);
	return temp;
}

function updateSchedules(arr, date){
	let arr1 = JSON.parse(JSON.stringify(arr));
	let temp = arr1.filter(el => el.date === date);
	return temp;
}
const initialState = {
	calender: [],
	activeMonth: 0,
	editing: false,
	// formdata
	teacherName: '',
	batch: '',
	timing: '',
	date: '',
	id: '',
	data:[],
	schedules: []
};
const calenderReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.INTIALIZE_CALENDER:
			return {
				...state,
				data: action.data,
				calender: action.calender
			};

		case actionTypes.INCREASE_MONTH:
			let n = state.activeMonth;
			if (state.activeMonth <= 10) {
				n++;
			}
			return {
				...state,
				activeMonth: n
			};

		case actionTypes.DECREASE_MONTH:
			let m = state.activeMonth;
			if (state.activeMonth >= 1) {
				m--;
			}
			return {
				...state,
				activeMonth: m
			};

		case actionTypes.CHANGE_EDITING_STATUS_TO_TRUE:
			return {
				...state,
				editing: true
			};

		case actionTypes.CHANGE_EDITING_STATUS_TO_FALSE:
			return {
				...state,
				editing: false
			};

		case actionTypes.CHANGE_FORM_DATA:
			return {
				...state,
				teacherName: action.teacherName,
				batch: action.batch,
				timing: action.timing,
				date: action.date,
				id: action.id
			};
		case actionTypes.GET_DAY_SCHEDULES:
			let rdata = state.data.filter((el) => el.date === action.date);
			return {
				...state,
				schedules: rdata
			};

		case actionTypes.ADD_SCHEDULE: {
			let temp = [ ...state.data ];
			temp.push(action.data);
			let month = action.data.date.split(" ")[0];
			let idx = months.findIndex(m => m === month);
			let newArr = changeCalender(state.calender, action.data.date, idx,1)
			return {
				...state,
				data: temp,
				calender: newArr
			};
		}

		case actionTypes.REMOVE_SCHEDULE: {
			let temp = [ ...state.data ];
			let i = state.data.findIndex((el) => el.batch === action.data.batch);
			temp.splice(i, 1);
			let month = action.data.date.split(" ")[0];
			let idx = months.findIndex(m => m === month);
			let newArr = changeCalender(state.calender, action.data.date, idx,-1)
			let newSchedules = removeFromSchedules(state.schedules, action.data);
			return {
				...state,
				data: temp,
				calender: newArr,
				schedules: newSchedules
			};
		}

		case actionTypes.UPDATE_SCHEDULE: {
			let temp = [ ...state.data ];
			let i = state.data.findIndex((el) => el.batch === action.data.batch);
			let olddata = temp[i];
			temp[i] = { ...action.data };
			let newSchedules = updateSchedules(temp, olddata.date);

			//updating the calender
			let oldmonth = olddata.date.split(" ")[0];
			let newMonth = action.data.date.split(" ")[0];
			let idx = months.findIndex(m => m === oldmonth);
			let newIdx = months.findIndex(m => m === newMonth);
			let k = changeCalender(state.calender, olddata.date, idx,-1)
			k = changeCalender(k, action.data.date, newIdx,1);

			return {
				...state,
				data: temp,
				schedules: newSchedules,
				calender: k
			};
		}

		case actionTypes.SEARCH_TEACHER_SCHEDULES:{
			let arr = state.data.filter(el => el.teacherName === action.teacherName);
			return{
				...state,
				schedules: arr
			}
		}

		case actionTypes.REMOVE_SEARCH_RESULTS:
			return {
				...state,
				schedules: []
			}
		default:
			return state;
	}
};

export default calenderReducer;
