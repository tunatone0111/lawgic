import React from "react";
import { useHistory } from "react-router-dom";

function Prec(props) {
	const history = useHistory();

	function simcolor(props) {
		if (props.sim >= 0.7) {
			return "lemonchiffon";
		} else if (props.sim >= 0.55) {
			return "lightgoldenrodyellow";
		} else {
			return "beige";
		}
	}
	return (
		<div
			className="card mb-2 shadow p-1 hoverable"
			style={{ backgroundColor: simcolor(props) }}
			onClick={() => history.push("/precs/" + props.id)}
		>
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
