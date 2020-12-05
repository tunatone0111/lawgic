import React, { useState, useEffect } from "react";
import { FormControl, InputGroup, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SearchBox.css";

export default function SearchBox() {
	const [autoComplete, setAutoComplete] = useState([]);
	const [spaceCursor, setSpaceCursor] = useState(0);
	const [autoCursor, setAutoCursor] = useState(-1);
	const [textAreaContent, setTextAreaContent] = useState("");

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
		setAutoCursor(-1);
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
					// dangerouslySetInnerHTML={{ __html: textAreaContent }}
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
						style={{ position: "absolute", top: "100%" }}
					>
						{autoComplete.map((w, idx) => (
							<ListGroup.Item
								key={idx}
								className={`auto-${idx} ${
									autoCursor === idx ? "selected" : null
								}`}
								dangerouslySetInnerHTML={{
									__html: w.replace(
										textAreaContent.split(" ").splice(-1)[0],
										`<span class="matched">${
											textAreaContent.split(" ").splice(-1)[0]
										}</span>`
									)
								}}
								onClick={handleClick}
								value={w}
								action
							/>
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
