import React, { useState, useEffect, useContext } from "react";
import config from "../config";
import { Card, Badge, Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../services/UserContext";
import axios from "axios";

function Mypage({ history }) {
	const [precs, setPrecs] = useState(null);
	const { user, setUser } = useContext(UserContext);

	const orderBadges = [
		null,
		<Badge variant="warning">1심</Badge>,
		<Badge variant="info">2심</Badge>,
		<Badge variant="dark">대법원</Badge>
	];
	const enBanc = <Badge variant="danger">합의체</Badge>;

	useEffect(() => {
		const token = localStorage.getItem("token");

		fetch(`${config.base_url}/api/precs/my`, {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.statusCode === 401) {
					history.push("/login");
				}
				setPrecs(res);
			})
			.catch();
	}, []);

	function handleDelete(precId) {
		axios
			.delete(`${config.base_url}/api/precs/my/${precId}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`
				}
			})
			.then(() => {
				const { likedPrecs: newLikedPrecs } = user;
				setPrecs(precs.filter((p) => p.objId !== precId));
				setUser({
					...user,
					likedPrecs: newLikedPrecs.filter((p) => p !== precId)
				});
			})
			.catch(() => {
				alert("something failed");
			});
	}

	return (
		<Container>
			{precs &&
				precs.map((p, i) => (
					<Row key={i}>
						<Card>
							<Card.Body>
								<Card.Subtitle className="d-flex justify-content-between">
									<span>{p.caseNum}</span>
								</Card.Subtitle>
								<Card.Title className="d-flex">
									{p.title} {orderBadges[p.courtOrder]}{" "}
									{p.isEnBanc ? enBanc : null}
									<i
										style={{ color: "lightcoral" }}
										className={`fas fa-times ml-auto`}
										onClick={() => handleDelete(p.objId)}
									></i>
								</Card.Title>
								{p.issues &&
									p.issues.map((i, idx) => (
										<Card.Text key={idx}>{`[${idx + 1}] ${i}`}</Card.Text>
									))}
							</Card.Body>
						</Card>
					</Row>
				))}
		</Container>
	);
}

export default Mypage;
