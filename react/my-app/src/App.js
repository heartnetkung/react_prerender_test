import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";

const BACKEND_URL = "https://react-prerender-test.netlify.app/data";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users/1">Users</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/users/:id">
            <Users2 />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    fetch(BACKEND_URL + "/data.json")
      .then((res) => res.json())
      .then((data) => {
        this.setState(data);
        window.prerenderReady = true;
      });
  }
  render() {
    return <h2>Home {this.state.hello}</h2>;
  }
}

class Users extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    var id = this.props.match.params.id || 1;
    fetch(BACKEND_URL + "/user_" + id + ".json")
      .then((res) => res.json())
      .then((data) => {
        this.setState(data);
        window.prerenderReady = true;
      });
  }
  render() {
    return (
      <h2>
        User: {this.props.match.params.id || 1}
        <br />
        Increment: {this.state.increment}
      </h2>
    );
  }
}

const Users2 = withRouter(Users);

export default App;
