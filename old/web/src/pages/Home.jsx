import {
	Button,
	Container,
	Grid,
	Toolbar,
	Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useContext } from "react";
import ButtonLink from "../components/ButtonLink";
import Logo from "../components/Logo";
import SearchBox from "../components/SearchBox";
import { UserContext } from "../services/UserContext";

const useStyles = makeStyles((theme) => ({
	navBar: {
		justifyContent: "flex-end",
	},
	root: {
		marginTop: "20vh",
	},
	logoWrapper: {
		width: 300,
		textAlign: "center",
	},
}));

function Home() {
	const classes = useStyles();
	const { user, setUser } = useContext(UserContext);

	const logOut = useCallback(() => {
		localStorage.removeItem("token");
		setUser(null);
	}, [setUser]);

	return (
		<>
			<Toolbar component="nav" className={classes.navBar}>
				{!user ? (
					<ButtonLink disabled variant="contained" to="/login">
						로그인하기
					</ButtonLink>
				) : (
					<>
						<Typography>{user.username} 님 환영합니다! </Typography>
						<ButtonLink variant="contained" to="/mypage">
							마이페이지
						</ButtonLink>
						<Button variant="contained" onClick={logOut}>
							로그아웃
						</Button>
					</>
				)}
			</Toolbar>
			<Container component="main" className={classes.root}>
				<Grid
					container
					component="section"
					direction="column"
					alignItems="center"
					spacing={3}
				>
					<Grid item className={classes.logoWrapper}>
						<Logo />
						<Typography>머신러닝 기반 판례 검색 시스템</Typography>
					</Grid>
					<Grid item>
						<SearchBox />
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default Home;
