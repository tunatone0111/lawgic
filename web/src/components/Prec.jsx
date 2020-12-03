import React from "react";
import { Card, Row, Badge } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";

function Prec({ prec }) {
	const history = useHistory();
	let badge = null;
	switch (prec.courtOrder) {
		case 1:
			badge = <Badge variant="warning">1심</Badge>;
			break;
		case 2:
			badge = <Badge variant="info">2심</Badge>;
			break;
		case 3:
			badge = <Badge variant="dark">대법원</Badge>;
			break;
	}
	const enBanc = <Badge variant="danger">합의체</Badge>;

	function simcolor(sim) {
		if (sim >= 0.7) {
			return "lemonchiffon";
		} else if (sim >= 0.55) {
			return "lightgoldenrodyellow";
		} else {
			return "beige";
		}
	}
	return (
		<Row
			className="mb-4 shadow p-1 hoverable"
			style={{ backgroundColor: simcolor(prec.sim) }}
			onClick={() => history.push("/precs/" + prec.precId)}
		>
			<Card.Body>
				<Card.Subtitle className="d-flex justify-content-between">
					<span>{prec.date.slice(0, 10)}</span>
					<span>피참조횟수:{prec.citationCount}</span>
				</Card.Subtitle>
				<br />
				<Card.Title>
					{prec.title} {badge} {prec.isEnBanc ? enBanc : null}
				</Card.Title>
				{prec.issues &&
					prec.issues.map((i, idx) => (
						<Card.Text key={idx}>{`[${idx + 1}] ${i}`}</Card.Text>
					))}
			</Card.Body>
		</Row>
	);
}

export default Prec;
