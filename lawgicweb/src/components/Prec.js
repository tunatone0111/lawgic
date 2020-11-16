import React from "react";

function Prec(props) {
	return (
		<div className="card">
			<div className="card-body">
				<h6 className="card-title">{props.title}</h6>
				<p className="card-text">{props.content}</p>
			</div>
		</div>
	);
}

export default Prec;
