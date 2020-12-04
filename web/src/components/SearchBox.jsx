import React, { useState } from "react";
import {
	FormControl,
	InputGroup,
	ListGroup,
	Button,
	Container,
	Row
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SearchBox() {
	const [autoComplete, setAutoComplete] = useState([]);
	const [textAreaContent, setTextAreaContent] = useState("");

	function handleOnChange(event) {
		setTextAreaContent(event.target.value);
		fetch(`http://34.64.175.123:4000/api/terms?q=${event.target.value}`)
			.then((res) => res.json())
			.then((res) => setAutoComplete(res));
	}

	return (
		<>
			<InputGroup className="mb-1">
				<FormControl
					as="textarea"
					id="text-input-box"
					placeholder="사건을 입력하세요"
					value={textAreaContent}
					onChange={handleOnChange}
					style={{ borderRadius: "20px 0 0 20px" }}
				/>
				{textAreaContent &&
				document.activeElement ===
					document.querySelector("#text-input-box.form-control") ? (
					<ListGroup style={{ position: "absolute", top: "100%" }}>
						{autoComplete.map((w, idx) => (
							<ListGroup.Item key={idx} className={`auto-${idx}`}>
								{w}
							</ListGroup.Item>
						))}
					</ListGroup>
				) : null}
				<InputGroup.Append>
					<Link
						to={`/search?query=${textAreaContent}`}
						className={`btn btn-secondary d-flex flex-column justify-content-center ${
							textAreaContent ? null : "disabled"
						}`}
						style={{ borderRadius: "0 20px 20px 0" }}
					>
						검색
					</Link>
				</InputGroup.Append>
			</InputGroup>
		</>
	);
}
