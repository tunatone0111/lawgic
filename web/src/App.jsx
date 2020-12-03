import { Switch, BrowserRouter, Route } from "react-router-dom";
import Main from "./components/Main";
import Search from "./components/Search";
import PrecDetail from "./components/PrecDetail";
import MyNavbar from "./components/MyNavbar";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Main} />
				<Route exact path="/search">
					<MyNavbar />
					<Search />
				</Route>
				<Route exact path="/precs/:id">
					<MyNavbar />
					<PrecDetail />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
