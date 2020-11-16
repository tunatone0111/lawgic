import { Switch, BrowserRouter, Route } from "react-router-dom";
import Main from "./components/Main";
import Search from "./components/Search"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
          <Route exact path="/search">
          <Search />
          </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;