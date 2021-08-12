import "./App.css";
import NavBar from "./views/NavBar/NavBar";
import HomePage from "./views/HomePage/HomePage";
import MarksPage from "./views/MarksPage/MarksPage";
import DiseasesPage from "./views/DiseasesPage/DiseasesPage";
import { Container } from "@material-ui/core";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/marks" component={MarksPage} />
        <Route exact path="/diseases" component={DiseasesPage} />
        <Route exact path="/" component={HomePage} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;

function NotFound() {
  return <>You have landed on a page that doesn't exist</>;
}
