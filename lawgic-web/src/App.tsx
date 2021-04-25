import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Precs from "./pages/Precs";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import LikedContext from "./services/LikedContext";
import { useState, useEffect } from "react";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#fb0",
		},
		success: green,
	},
});

const darkTheme = createMuiTheme({
	typography: {
		fontFamily: ["-apple-system", "Noto Serif KR"].join(","),
	},
	palette: {
		type: "dark",
		primary: {
			main: "#ffd04d",
		},
		success: green,
	},
});

function App() {
	const [likedPrecs, setLikedPrecs] = useState<number[]>([]);

	useEffect(() => {
		const res = localStorage.getItem("likedPrecs");
		if (!res) {
			localStorage.setItem("likedPrecs", JSON.stringify([]));
			setLikedPrecs([]);
		} else {
			setLikedPrecs(JSON.parse(res));
		}
	}, []);

	function addPrec(id: number) {
		const updated = [...likedPrecs, id];
		localStorage.setItem("likedPrecs", JSON.stringify(updated));
		setLikedPrecs(updated);
	}

	function delPrec(id: number) {
		const updated = likedPrecs.filter((p) => p !== id);
		localStorage.setItem("likedPrecs", JSON.stringify(updated));
		setLikedPrecs(updated);
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<LikedContext.Provider value={{ likedPrecs, addPrec, delPrec }}>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/error" component={Error} />
						<>
							<Navbar />
							<Route path="/search" component={Search} />
							<Route path="/precs/:id" component={Precs} />
						</>
						<Redirect to="/error" />
					</Switch>
				</LikedContext.Provider>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
