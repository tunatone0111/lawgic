import React, { useContext, useEffect } from "react";
import { UserContext } from "../services/UserContext";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import axios from "axios";
import config from "../config";

export default function MyNavbar() {
	const { user, setUser } = useContext(UserContext);

	useEffect(() => {
		if (localStorage.getItem("token") !== null) {
			axios
				.get(`${config.base_url}/api/precs/my`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then(({ data }) =>
					setUser({ ...user, likedPrecs: data.map((x) => x.objId.toString()) })
				);
		}
	}, []);

	return (
		<Container
			fluid
			sticky="true"
			className="shadow"
			style={{
				padding: "10px 15%",
				marginBottom: 50,
				backgroundColor: "white",
				gridTemplateColumns: "2fr 1fr"
			}}
		>
			<Row>
				<Col xs={1}>
					<Logo width="100px" />
				</Col>
				<Col>
					<SearchBox />
				</Col>
				<Col xs={1}>
					{!user ? (
						<Link to="/login" className="btn btn-outline-secondary">
							로그인하기
						</Link>
					) : (
						<Button
							onClick={() => {
								localStorage.removeItem("token");
								setUser(null);
							}}
							variant="outline-secondary"
						>
							로그아웃
						</Button>
					)}
				</Col>
			</Row>
		</Container>
	);
}
