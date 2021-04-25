import {
	AppBar,
	Box,
	Container,
	Grid,
	makeStyles,
	Toolbar,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import Logo from "./Logo";
import SearchBox from "./SearchBox";

const useStyles = makeStyles((theme) => ({
	toolbarSpacer: { ...theme.mixins.toolbar, marginBottom: theme.spacing(2) },
	grow: { flexGrow: 1 },
	logo: {
		"&:hover": {
			cursor: "pointer",
		},
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},
}));

function Navbar() {
	const history = useHistory();
	const classes = useStyles();
	return (
		<>
			<AppBar color="default" component="nav">
				<Toolbar>
					<Container>
						<Grid container alignItems="center" justify="center" spacing={2}>
							<Grid item xs={false} md={1}>
								<Box
									width="75px"
									height="50px"
									onClick={() => history.push("/")}
									className={classes.logo}
								>
									<Logo />
								</Box>
							</Grid>
							<Grid item className={classes.grow}>
								<SearchBox />
							</Grid>
						</Grid>
					</Container>
				</Toolbar>
			</AppBar>
			<Box className={classes.toolbarSpacer} />
		</>
	);
}

export default Navbar;
