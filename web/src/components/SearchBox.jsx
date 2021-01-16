import {
	Box,
	IconButton,
	InputAdornment,
	makeStyles,
	TextField,
	List,
	ListItem,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		[theme.breakpoints.up("lg")]: {
			minWidth: "50rem",
		},
	},
	textBox: {
		borderRadius: 24,
	},
}));

export default function SearchBox() {
	const classes = useStyles();
	const queryParams = new URLSearchParams(useLocation().search);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		setSearchQuery(queryParams.get("query") || "");
	}, []);

	// AutoComplete
	const [autoComplete, setAutoComplete] = useState(["이건", "미리보기"]);
	const [spaceCursor, setSpaceCursor] = useState(0);
	const [autoCursor, setAutoCursor] = useState(0);

	function clearAutoComplete() {
		setAutoComplete([]);
	}

	// function fetchAutoComplete(text) {
	// 	setSpaceCursor(text.lastIndexOf(" "));
	// 	fetch(`${config.base_url}/api/terms?q=${text}`)
	// 		.then((res) => res.json())
	// 		.then((res) => setAutoComplete(res));
	// }

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
		setSearchQuery(`${searchQuery.slice(0, spaceCursor + 1)}${e.target.value}`);
		document.getElementById("text-input-box").focus();
	}

	function handleOnChange(event) {
		setSearchQuery(event.target.value);
		// fetchAutoComplete(event.target.value);
	}

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
							<IconButton
								edge="end"
								component={Link}
								to={`/search?query=${searchQuery}`}
							>
								<SearchIcon />
							</IconButton>
						</InputAdornment>
					),
					className: classes.textBox,
				}}
				placeholder="사건을 입력하세요"
				value={searchQuery}
				onChange={handleOnChange}
				onBlur={clearAutoComplete}
				// onFocus={() => fetchAutoComplete(searchQuery)}
				onKeyDown={handleKeyDown}
			>
				{/* {searchQuery &&
				document.activeElement === document.querySelector("#text-input-box") ? (
					<List
						id="auto-list"
						style={{
							position: "absolute",
							marginLeft: `${
								0.75 +
								(searchQuery.split(" ").length - 1) * 0.1 +
								(searchQuery.slice(0, spaceCursor + 1).length -
									(searchQuery.split(" ").length - 1))
							}rem`,
							marginTop: `${2 * 1 + 0.375}rem`,
							width: "auto",
							opacity: 50,
							zIndex: 4000,
						}}
					>
						{autoComplete.map((w, idx) => (
							<ListItem
								key={idx}
								className={`p-1 auto-${idx} ${
									autoCursor === idx ? "selected" : null
								}`}
								style={{
									width: "100%",
								}}
								onClick={handleClick}
								value={w}
								action
							>
								<span
									dangerouslySetInnerHTML={{
										__html: w.replace(
											searchQuery.split(" ").splice(-1)[0],
											`<span class="matched">${
												searchQuery.split(" ").splice(-1)[0]
											}</span>`
										),
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
							</ListItem>
						))}
					</List>
				) : null} */}
			</TextField>
		</Box>
	);
}
