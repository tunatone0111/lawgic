import {
	IconButton,
	InputAdornment,
	TextField,
	makeStyles,
	FormControl,
	Select,
	InputLabel,
	Grid,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useCallback, useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	textbox: {
		flexGrow: 1,
	},
}));

function SearchBox() {
	const classes = useStyles();
	const history = useHistory();
	const [query, setQuery] = useState("");
	const [searchTarget, setSearchTarget] = useState<"issue" | "precNum">(
		"issue"
	);
	const queryParams = new URLSearchParams(useLocation().search);
	const handleChange = useCallback((e) => {
		setQuery(e.target.value);
	}, []);

	useEffect(() => {
		setQuery(queryParams.get("query") || "");
		setSearchTarget(
			(queryParams.get("type") || "issue") as "issue" | "precNum"
		);
	}, []);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={2}>
				<FormControl variant="outlined" size="small" fullWidth>
					<InputLabel htmlFor="search-taget">검색대상</InputLabel>
					<Select
						native
						label="검색대상"
						value={searchTarget}
						onChange={(e) =>
							setSearchTarget(e.target.value as "issue" | "precNum")
						}
						inputProps={{
							name: "searchTarget",
							id: "search-target",
						}}
					>
						<option value={"issue"}>사건내용</option>
						<option value={"precNum"}>사건번호</option>
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12} md={10}>
				<TextField
					multiline
					fullWidth
					variant="outlined"
					size="small"
					placeholder={`${
						searchTarget == "issue" ? "사건을" : "사건번호를"
					} 입력하세요`}
					value={query}
					onChange={handleChange}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							history.push(
								`/search?query=${query.trim()}&type=${searchTarget}`
							);
						}
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									edge="end"
									component={Link}
									to={`/search?query=${query.trim()}&type=${searchTarget}`}
								>
									<SearchIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
					className={classes.textbox}
				/>
			</Grid>
		</Grid>
	);
}

export default SearchBox;
