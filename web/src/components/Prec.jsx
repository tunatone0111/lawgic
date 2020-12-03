import React from "react";
import { Card, Row } from "react-bootstrap";
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
		<Row
			className="mb-2 shadow-sm p-1 hoverable"
			style={{ backgroundColor: simcolor(props) }}
			onClick={() => history.push("/precs/" + props.id)}
		>
			<Card.Body>
				<Card.Title>{props.title}</Card.Title>
				{props.issues.map((i, idx) => (
					<Card.Text key={idx}>{`[${idx + 1}] ${i}`}</Card.Text>
				))}
			</Card.Body>
		</Row>
	);
}

export default Prec;
