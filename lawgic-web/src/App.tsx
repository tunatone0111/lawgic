import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Precs from "./pages/Precs";
import Search from "./pages/Search";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#fb0",
		},
		success: green,
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/search" component={Search} />
					<Route path="/precs/:id" component={Precs} />
					<Route path="/error" component={Error} />
					<Redirect to="/error" />
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
