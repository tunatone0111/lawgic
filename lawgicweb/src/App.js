import {Switch, BrowserRouter, Route} from "react-router-dom";
import Main from "./components/Main";
import Search from "./components/Search"
import PrecDetail from "./components/PrecDetail"

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Main/>
                </Route>
                <Route exact path="/search">
                    <Search/>
                </Route>
                <Route exact path="/precs/:id">
                    <PrecDetail/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}


export default App;