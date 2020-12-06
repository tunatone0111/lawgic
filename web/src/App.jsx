import { Switch, BrowserRouter, Route } from "react-router-dom";
import Main from "./pages/Main";
import Search from "./pages/Search";
import PrecDetail from "./pages/PrecDetail";
import Login from "./pages/Login";
import MyNavbar from "./components/MyNavbar";

function DefaultContainer() {
	return (
		<>
			<MyNavbar />
			<Route exact path="/search" component={Search} />
			<Route exact path="/precs/:id" component={PrecDetail} />
			<Route exact path="/login" component={Login} />
		</>
	);
}

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Main} />
				<Route component={DefaultContainer} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
