import React, { Component } from "react";
import {
  Switch,
  Route,
} from "react-router-dom";

import Login from "../Login";
import Register from "../Register";
import Welcome from "../Welcome";
import Header from "../Header";

const { useState, useEffect } = React;


function Main (){
  // const [counter, setCounter] = useState(0);
  //
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCounter(counter => counter + 1);
  //   }, 1000);
  //
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <div className="page-wrapper row">
      <Route path={`/`}>
        <Header/>
      </Route>

      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/welcome">
          <Welcome />
        </Route>

        {/*<Route exact path={'/venues'}>*/}
        {/*  /!*<RestFilter  />*!/*/}
        {/*  <VenuesList wrapperClass="col-6 offset-3"/>*/}
        {/*  /!*<Aside  />*!/*/}
        {/*</Route>*/}

        {/*<Route path={`/venue/:venueId`}>*/}
        {/*  <Venue wrapperClass="col-12" />*/}
        {/*</Route>*/}
      </Switch>
    </div>
  )
}


export default Main;
