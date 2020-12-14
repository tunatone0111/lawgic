import { useState, useEffect } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Main from "./pages/Main";
import Search from "./pages/Search";
import PrecDetail from "./pages/PrecDetail";
import Mypage from "./pages/Mypage";
import Login from "./pages/Login";
import jwt_decode from "jwt-decode";
import MyNavbar from "./components/MyNavbar";
import { UserContext } from "./services/UserContext";

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

	useEffect(() => {
		localStorage.getItem("token") &&
			setUser({
				...user,
				username: jwt_decode(localStorage.getItem("token")).username
			});
	}, [localStorage.getItem("token")]);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Main} />
					<Route component={DefaultContainer} />
				</Switch>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
