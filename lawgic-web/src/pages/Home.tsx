import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Logo from "../components/Logo";
import SearchBox from "../components/SearchBox";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: "20vh",
	},
}));

function Home() {
	const classes = useStyles();

	return (
		<Container component="main" className={classes.root}>
			<Grid
				container
				direction="column"
				alignItems="center"
				component="section"
				spacing={3}
			>
				<Grid item>
					<Logo />
				</Grid>
				<Grid item>
					<Typography>머신러닝 기반 판례 검색 시스템</Typography>
				</Grid>
				<Grid item>
					<SearchBox />
				</Grid>
			</Grid>
		</Container>
	);
}

export default Home;
