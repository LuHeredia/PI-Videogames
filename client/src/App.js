import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
import VgCreated from "./components/post/VgCreate";
import Detail from "./components/detail/Detail";
import NotFound from "./components/notFound/NotFound";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/home" component={Home} />
          <Route path="/create" component={VgCreated} />
        <Route exact path="/videogame/:id" component={Detail} />
        <Route path='*' component={NotFound}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
