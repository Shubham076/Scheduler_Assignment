import React, { useState } from 'react';
import Row from './Row/Row';
import './month.css';
const Month = (props) => {
	let [ days, _ ] = useState([ 'Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat' ]);
	return (
		<div className= "month">
			<Row dayName = {true} data={days} />
			{props.data.map((el, i) => {
				return <Row openForm = {props.openForm}
				toggleSidebar= {props.toggleSidebar} key={i} data={el} />;
			})}
		</div>
	);
};

export default Month;
