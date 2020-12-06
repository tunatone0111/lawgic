import "../styles/SearchBox.css";
import React, { useState, useEffect } from "react";
import { FormControl, InputGroup, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SearchBox({ defaultValue }) {
	const [autoComplete, setAutoComplete] = useState([]);
	const [spaceCursor, setSpaceCursor] = useState(0);
	const [autoCursor, setAutoCursor] = useState(0);
	const [textAreaContent, setTextAreaContent] = useState("");

	useEffect(() => {
		setTextAreaContent(defaultValue);
	}, []);

	function clearAutoComplete() {
		setAutoComplete([]);
	}

	function fetchAutoComplete(text) {
		setSpaceCursor(text.lastIndexOf(" "));
		fetch(`http://34.64.175.123:4000/api/terms?q=${text}`)
			.then((res) => res.json())
			.then((res) => setAutoComplete(res));
	}

	function handleOnChange(event) {
		setTextAreaContent(event.target.value);
		fetchAutoComplete(event.target.value);
	}

	function handleKeyDown(e) {
		switch (e.key) {
			case "Escape":
				e.preventDefault();
				clearAutoComplete();
				break;
			case "ArrowDown":
				e.preventDefault();
				setAutoCursor(
					(autoCursor + autoComplete.length + 1) % autoComplete.length
				);
				break;
			case "ArrowUp":
				e.preventDefault();
				setAutoCursor(
					(autoCursor + autoComplete.length - 1) % autoComplete.length
				);
				break;
			case "Enter":
				e.preventDefault();
				document.querySelector(".selected")?.click();
			case "ArrowRight":
				e.preventDefault();
				document.querySelector(".selected")?.click();
				break;
		}
	}

	useEffect(() => {
		setAutoCursor(0);
	}, [autoComplete]);

	function handleClick(e) {
		setTextAreaContent(
			`${textAreaContent.slice(0, spaceCursor + 1)}${e.target.value}`
		);
		document.getElementById("text-input-box").focus();
	}

	return (
		<>
			<InputGroup className="mb-1">
				<FormControl
					className="form-control"
					as="textarea"
					id="text-input-box"
					placeholder="사건을 입력하세요"
					value={textAreaContent}
					onChange={handleOnChange}
					onBlur={clearAutoComplete}
					onFocus={() => fetchAutoComplete(textAreaContent)}
					onKeyDown={handleKeyDown}
					style={{ borderRadius: "20px 0 0 20px" }}
				></FormControl>
				{textAreaContent &&
				document.activeElement ===
					document.querySelector("#text-input-box.form-control") ? (
					<ListGroup
						id="auto-list"
						style={{
							position: "absolute",
							marginLeft: `${
								0.75 +
								(textAreaContent.split(" ").length - 1) * 0.1 +
								(textAreaContent.slice(0, spaceCursor + 1).length -
									(textAreaContent.split(" ").length - 1))
							}rem`,
							marginTop: `${2 * 1 + 0.375}rem`,
							width: "auto",
							opacity: 50,
							zIndex: 4000
						}}
					>
						{autoComplete.map((w, idx) => (
							<ListGroup.Item
								key={idx}
								className={`d-flex justify-content-between align-items-center p-1 auto-${idx} ${
									autoCursor === idx ? "selected" : null
								}`}
								style={{
									width: "100%"
								}}
								onClick={handleClick}
								value={w}
								action
							>
								<span
									dangerouslySetInnerHTML={{
										__html: w.replace(
											textAreaContent.split(" ").splice(-1)[0],
											`<span class="matched">${
												textAreaContent.split(" ").splice(-1)[0]
											}</span>`
										)
									}}
								/>
								<svg
									height="1rem"
									width="1rem"
									className="ml-3"
									enableBackground="new 0 0 280.823 280.823"
									viewBox="0 0 280.823 280.823"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="m250.734 40.137-90.265-.02v20.059h90.265c5.534 0 10.029 4.515 10.029 10.049v80.216c0 5.534-4.496 10.029-10.029 10.029h-212.34l45.877-45.877-14.182-14.182-70.089 70.088 70.206 70.206 14.182-14.182-45.994-45.994h212.341c16.592 0 30.088-13.497 30.088-30.088v-80.216c0-16.592-13.497-30.088-30.089-30.088z" />
								</svg>
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

SearchBox.defaultProps = {
	defaultValue: ""
};
