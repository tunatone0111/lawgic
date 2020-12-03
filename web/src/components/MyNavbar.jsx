import React, { useState } from "react";
import { useHistory, useLocation, NavLink } from "react-router-dom";
import { Button, FormGroup, FormControl, Navbar } from "react-bootstrap";
import Logo from "../assets/logo.PNG";

export default function MyNavbar() {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const [content, setContent] = useState(query.get("query"));
	const history = useHistory();

	function handleOnChange(event) {
		setContent(event.target.value);
	}

	function handleOnClick() {
		history.push(`/search?query=${content}`);
	}

	return (
		<div
			sticky="top"
			bg="light"
			className="shadow flex-fill"
			style={{
				paddingLeft: "20%",
				paddingRight: "20%",
				paddingTop: "10px",
				paddingBottom: "10px",
				marginBottom: "50px",
				position: "sticky",
				backgroundColor: "white",
				top: 0
			}}
		>
			<div class="d-flex justify-content-center">
				<NavLink to="/">
					<img src={Logo} width="100px" />
				</NavLink>
				<FormControl
					as="textarea"
					placeholder="사건을 입력하세요"
					value={content}
					onChange={handleOnChange}
				/>
				<Button variant="secondary" onClick={handleOnClick}>
					검색
				</Button>
			</div>
		</div>
	);
}
