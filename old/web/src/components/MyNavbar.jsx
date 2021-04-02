import {
	AppBar,
	Button,
	makeStyles,
	Toolbar,
	Typography,
	Box,
	Grid,
	Container,
} from "@material-ui/core";
import axios from "axios";
import React, { useCallback, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import config from "../config";
import { UserContext } from "../services/UserContext";
import Logo from "../components/Logo";
import SearchBox from "../components/SearchBox";

const useStyles = makeStyles((theme) => ({
	toolbarSpacer: { ...theme.mixins.toolbar, marginBottom: theme.spacing(2) },
	grow: {flexGrow: 1}
}));

export default function MyNavbar() {
	const classes = useStyles();
	const { user, setUser } = useContext(UserContext);
	const history = useHistory();

	useEffect(() => {
		if (localStorage.getItem("token") !== null) {
			axios
				.get(`${config.base_url}/api/precs/my`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				})
				.then(({ data }) =>
					setUser({ ...user, likedPrecs: data.map((x) => x.objId.toString()) })
				);
		}
	}, []);

	const logOut = useCallback(() => {
		localStorage.removeItem("token");
		setUser(null);
	}, [setUser]);

	return (
		<>
			<AppBar color="default" component="nav">
				<Toolbar>
					<Container>
						<Grid container alignItems='center' spacing={2}>
							<Grid item><Logo height='50px' width="75px"/></Grid>
							<Grid item className={classes.grow}>
								<SearchBox />
							</Grid>
							<Grid item>
								{!user ? (
									<Button
										disabled
										variant="contained"
										onClick={() => history.push("/login")}
									>
										로그인하기
									</Button>
								) : (
									<>
										<Typography>{user.username} 님 환영합니다! </Typography>
										<Button
											variant="contained"
											onClick={() => history.push("/mypage")}
										>
											마이페이지
										</Button>
										<Button variant="contained" onClick={logOut}>
											로그아웃
										</Button>
									</>
								)}
							</Grid>
						</Grid>
					</Container>
				</Toolbar>
			</AppBar>
			<Box className={classes.toolbarSpacer} />
		</>
	);
}
