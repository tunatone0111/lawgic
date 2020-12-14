import React, { useState, useContext } from "react";
import { Card, Row, Badge } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import config from "../config";
import axios from "axios";
import { UserContext } from "../services/UserContext";

function Prec({ prec }) {
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

	function toggleLike() {
		const newLiked = !liked;
		setLiked(newLiked);
		if (newLiked === true) {
			axios
				.put(
					`${config.base_url}/api/precs/my`,
					{ precId: prec.precId },
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`
						}
					}
				)
				.then(() => {
					const { likedPrecs: newLikedPrecs } = user;
					newLikedPrecs.push(prec.precId);
					setUser({ ...user, likedPrecs: newLikedPrecs });
				})
				.catch(() => {
					alert("something failed");
					setLiked(!newLiked);
				});
		} else {
			axios
				.delete(`${config.base_url}/api/precs/my/${prec.precId}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then(() => {
					const { likedPrecs: newLikedPrecs } = user;
					setUser({
						...user,
						likedPrecs: newLikedPrecs.filter((p) => p !== prec.precId)
					});
				})
				.catch(() => {
					alert("something failed");
					setLiked(!newLiked);
				});
		}
	}

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
		>
			<Card.Body>
				<Card.Subtitle className="d-flex justify-content-between">
					<span>
						<i
							className={`${liked ? "fas" : "far"} fa-heart mr-2`}
							onClick={toggleLike}
						></i>
						<span>{prec.date.slice(0, 10)}</span>
					</span>
					<span>피참조횟수:{prec.citationCount}</span>
				</Card.Subtitle>
				<br />
				<Card.Subtitle>{prec.caseNum}</Card.Subtitle>
				<Card.Title onClick={() => history.push("/precs/" + prec.precId)}>
					{prec.title} {orderBadges[prec.courtOrder]}{" "}
					{prec.isEnBanc ? enBanc : null}
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
