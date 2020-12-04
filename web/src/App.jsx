import { Switch, BrowserRouter, Route, withRouter } from "react-router-dom";
import Main from "./components/Main";
import Search from "./components/Search";
import PrecDetail from "./components/PrecDetail";
import MyNavbar from "./components/MyNavbar";

function DefaultContainer() {
	return (
		<>
			<MyNavbar />
			<Route exact path="/search" component={Search} />
			<Route exact path="/precs/:id" component={PrecDetail} />
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
