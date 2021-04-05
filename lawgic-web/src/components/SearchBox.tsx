import {
	IconButton,
	InputAdornment,
	TextField,
	makeStyles,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useCallback, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "50vw",
	},
}));

function SearchBox() {
	const classes = useStyles();
	const [query, setQuery] = useState("");
	const queryParams = new URLSearchParams(useLocation().search);
	const handleChange = useCallback((e) => {
		setQuery(e.target.value);
	}, []);

	useEffect(() => {
		setQuery(queryParams.get("query") || "");
	}, []);

	return (
		<TextField
			multiline
			variant="outlined"
			size="small"
			fullWidth
			placeholder="사건을 입력하세요"
			value={query}
			onChange={handleChange}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton
							edge="end"
							component={Link}
							to={`/search?query=${query.trim()}`}
						>
							<SearchIcon />
						</IconButton>
					</InputAdornment>
				),
			}}
			className={classes.root}
		/>
	);
}

export default SearchBox;
