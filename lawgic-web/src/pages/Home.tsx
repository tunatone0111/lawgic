import { Container, Grid, Typography, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import SearchBox from "../components/SearchBox";
import Report from "../components/Report";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: "20vh",
	},
	myPage: {
		position: "absolute",
		top: theme.spacing(2),
		right: theme.spacing(2),
	},
	logo: {
		[theme.breakpoints.up("xs")]: {
			width: 200,
		},
		[theme.breakpoints.up("md")]: {
			width: 300,
		},
	},
	searchBox: {
		width: "100%",
	},
}));

function Home() {
	const classes = useStyles();

	return (
		<Container component="main" className={classes.root} maxWidth="md">
			<Grid container direction="column" alignItems="center" spacing={3}>
				<Grid item className={classes.logo}>
					<Logo />
				</Grid>
				<Grid item>
					<Typography>머신러닝 기반 판례 검색 시스템</Typography>
				</Grid>
				<Grid item className={classes.searchBox}>
					<SearchBox />
				</Grid>
			</Grid>
			{/* <Button
				className={classes.myPage}
				variant="contained"
				component={Link}
				to="/my"
			>
				저장한 판례
			</Button> */}
			{/* <Grid item>
					Lawgic은 자연어, 문장으로 이루어진 검색어와 판례의 '판시사항'간의
					유사도를 바탕으로 검색하는 프로그램입니다.
				</Grid> */}
			<Report />
		</Container>
	);
}

export default Home;
