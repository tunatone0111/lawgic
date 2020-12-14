import React, { useContext } from "react";
import "../styles/Main.css";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import Logo from "../components/Logo";
import SearchBox from "../components/SearchBox";
import { UserContext } from "../services/UserContext";

function Main() {
	const { user, setUser } = useContext(UserContext);

	return (
		<div className="d-flex flex-column mx-auto" style={{ maxWidth: "75vw" }}>
			<div className="d-flex justify-content-end m-3">
				{!user ? (
					<Link to="/login" className="btn btn-outline-secondary">
						로그인하기
					</Link>
				) : (
					<Container>
						<Row>
							<Col>
								<p>{user.username} 님 환영합니다! </p>
							</Col>
							<Col xs={3}>
								<Link to="/mypage" className="btn btn-outline-secondary">
									마이페이지
								</Link>
								<Button
									variant="outline-secondary"
									onClick={() => {
										localStorage.removeItem("token");
										setUser(null);
									}}
								>
									로그아웃
								</Button>
							</Col>
						</Row>
					</Container>
				)}
			</div>
			<div
				className="d-flex justify-content-center mr-5 ml-5"
				style={{ marginTop: 100 }}
			>
				<Logo />
			</div>
			<div className="d-flex justify-content-center">
				머신러닝 기반 판례 검색 시스템
			</div>
			<div className="d-flex justify-content-center mt-5">
				<SearchBox />
			</div>
		</div>
	);
}

export default Main;
