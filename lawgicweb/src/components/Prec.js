import React from "react";

function Prec(props) {
	return (
		<div className="card">
			<div className="card-body">
				<div className="card-title">
					<h5>{props.title}</h5>
					<span>{props.caseNum}</span>
				</div>
				{props.issues.map((i, idx) => (
					<p className="card-text">{`[${idx + 1}] ${i}`}</p>
				))}
			</div>
		</div>
	);
}

export default Prec;
