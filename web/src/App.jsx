import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Mypage from "./pages/Mypage";
import PrecDetail from "./pages/PrecDetail";
import Search from "./pages/Search";
import { UserContext } from "./services/UserContext";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#fb0",
		},
		success: green,
	},
});

function DefaultContainer() {
	return (
		<>
			<MyNavbar />
			<Route exact path="/search" component={Search} />
			<Route exact path="/precs/:id" component={PrecDetail} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/mypage" component={Mypage} />
		</>
	);
}

function App() {
	const [user, setUser] = useState(undefined);
	const userState = { user, setUser };

	useEffect(() => {
		localStorage.getItem("token") &&
			setUser({
				...user,
				username: jwt_decode(localStorage.getItem("token")).username,
			});
	}, [localStorage.getItem("token")]);

	return (
		<ThemeProvider theme={theme}>
			<UserContext.Provider value={userState}>
				<CssBaseline />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route component={DefaultContainer} />
				</Switch>
			</UserContext.Provider>
		</ThemeProvider>
	);
}

export default App;
