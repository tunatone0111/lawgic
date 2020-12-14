import React, { useState, useContext } from "react";
import { Card, Row, Badge } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import config from "../config";
import axios from "axios";
import { UserContext } from "../services/UserContext";

function MyPrec({ prec }) {
	const { user, setUser } = useContext(UserContext);
	const [liked, setLiked] = useState(
		user && user.likedPrecs.filter((i) => i === prec.precId).length !== 0
	);
	const history = useHistory();
	const orderBadges = [
		null,
		<Badge variant="warning">1심</Badge>,
		<Badge variant="info">2심</Badge>,
		<Badge variant="dark">대법원</Badge>
	];
	const enBanc = <Badge variant="danger">합의체</Badge>;

	return (
		<Row>
			<Card>
				<Card.Body>
					<Card.Subtitle className="d-flex justify-content-between">
						<span>{prec.caseNum}</span>
					</Card.Subtitle>
					<Card.Title>
						{prec.title} {orderBadges[prec.courtOrder]}{" "}
						{prec.isEnBanc ? enBanc : null}
						<i
							className={`${liked ? "fas" : "far"} fa-heart mr-2`}
							onClick={toggleLike}
						></i>
					</Card.Title>
					{prec.issues &&
						prec.issues.map((i, idx) => (
							<Card.Text key={idx}>{`[${idx + 1}] ${i}`}</Card.Text>
						))}
				</Card.Body>
			</Card>
		</Row>
	);
}

export default MyPrec;
