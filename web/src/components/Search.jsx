import "./Search.css";
import Logo from "../assets/logo.PNG";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	Spinner,
	Container,
	Row,
	Col,
	InputGroup,
	FormControl,
	Button,
	Navbar,
	Nav,
	Form
} from "react-bootstrap";
import Prec from "./Prec";
import useFetch from "../services/useFetch";

function Search() {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const [content, setContent] = useState(query.get("query"));
	const history = useHistory();
	const q = query.get("query");

	function handleOnChange(event) {
		setContent(event.target.value);
	}

	function handleOnClick() {
		history.push(`/search?query=${content}`);
		//Search();
	}

	const { data: precs, loading, eTime } = useFetch(
		encodeURI(`http://34.64.175.123:4000/api/embed?q=${q}`)
	);

	return (
		<Container>
			<Row
				as={Navbar}
				className="justify-content-betweeen"
				sticky="top"
				bg="light"
			>
				<Navbar.Brand href="/">
					<img src={Logo} width="100px" />
				</Navbar.Brand>
				<Form inline>
					<FormControl
						as="textarea"
						placeholder="사건을 입력하세요"
						value={content}
						onChange={handleOnChange}
					/>
					<Button variant="secondary" onClick={handleOnClick}>
						검색
					</Button>
				</Form>
			</Row>

			{!precs ? (
				<div className="d-flex flex-row justify-content-center mt-5">
					<Spinner animation="border" variant="warning" />
				</div>
			) : (
				<>
					<div style={{ marginTop: "20px" }}></div>
					<div className="card border-light mb-3">
						<h4>검색결과: {precs.length} 건</h4>
						<p>(소요시간: {eTime}ms)</p>
					</div>
					{precs.map((prec) => (
						<Prec
							key={prec._id}
							id={prec._id}
							caseNum={prec.caseNum}
							title={prec.title}
							issues={prec.issues}
							sim={prec.sim}
						/>
					))}
				</>
			)}
		</Container>
	);
}

export default Search;
