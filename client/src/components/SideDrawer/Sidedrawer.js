import React from 'react';
import Overlay from './Overlay/Overlay';
import './sidedrawer.css';
const Sidedrawer = (props) => {
	return (
		<React.Fragment>
			<Overlay click={props.close} show={props.show} />
			<div
				className={
					'sideDrawer ' +
					(props.show === true ? 'sidedrawer_active ' : '') +
                    (props.left ? 'sidebar_left' : 'sidebar_right')}>
				{props.children}
			</div>
		</React.Fragment>
	);
};

export default Sidedrawer;
