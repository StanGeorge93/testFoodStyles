import React from 'react';
import './App.css';
import { createBrowserHistory } from 'history'
import {
  Link,
  Switch,
  Route,
  Router
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';

const history = createBrowserHistory();

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});


function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <div className="App col-12">
        <Router history={history}>
          <Link to={"/login"} className="btn btn-primary"> Login page </Link>
          <br/>
          <Link to={"/register"} className="btn btn-primary"> Register page </Link>

          <Switch>
            <Route exact path={'/login'} component={Login} />
            <Route exact path={'/register'} component={Register} />
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
