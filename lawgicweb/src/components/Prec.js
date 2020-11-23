import React from "react";
import {useHistory} from "react-router-dom";

function Prec(props) {
	const history = useHistory();

	return (
		<div className="card" onClick={() => history.push('/precs/' + props.caseNum)} >
			<div className="card-body">
				<div className="card-title">
					<h5>{props.title}</h5>
					<span>{props.caseNum}</span>
				</div>
				{props.issues.map((i, idx) => (
					<p className="card-text" key={idx}>{`[${idx + 1}] ${i}`}</p>
				))}
			</div>
		</div>
	);
}

export default Prec;
