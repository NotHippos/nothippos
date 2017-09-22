import React from 'react';
import Home from './Home.jsx'
const Hidden = (props) => {
	return <div>
			<div onClick={(event) => {
				console.log(props.tag)
				props.tagClicked(props.tag)}}>
				<h4 className="clicked">{props.tag}</h4>
			</div>
		</div>
}
export default Hidden;