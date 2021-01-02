import React, { useState, useEffect, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import {
	Box,
	Grid,
	Button,
	makeStyles,
	TextareaAutosize,
	TextField,
	IconButton,
	InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import config from "../config";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "50rem",
	},
	textBox:{
		borderRadius: 24
	}
}));

export default function SearchBox({ defaultValue }) {
	const classes = useStyles();

	const history = useHistory();
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
		fetch(`${config.base_url}/api/terms?q=${text}`)
			.then((res) => res.json())
			.then((res) => setAutoComplete(res));
	}

	function handleOnChange(event) {
		setTextAreaContent(event.target.value);
		// fetchAutoComplete(event.target.value);
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
				break;
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

	const handleSearch = useCallback(()=>{
		history.push(`/search?query=${textAreaContent}`)
	}, [])

	return (
		<Box className={classes.root}>
			<TextField
				multiline
				variant="outlined"
				size="small"
				fullWidth
				InputProps={{
					id: "text-input-box",
					endAdornment: (
						<InputAdornment position="end">
							<IconButton edge='end' onClick={handleSearch} >
								<SearchIcon />
							</IconButton>
						</InputAdornment>
					),
					className: classes.textBox
				}}
				placeholder="사건을 입력하세요"
				value={textAreaContent}
				onChange={handleOnChange}
				onBlur={clearAutoComplete}
				onFocus={() => fetchAutoComplete(textAreaContent)}
				onKeyDown={handleKeyDown}
				
			></TextField>
			{/* {textAreaContent &&
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
				) : null} */}
		</Box>
	);
}

SearchBox.defaultProps = {
	defaultValue: "",
};
