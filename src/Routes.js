import React from "react";
import { Route, Switch } from "react-router-dom";
import MainPage from "./containers/MainPage";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoutes";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import LoadingScreen from "./components/LoadingScreen";

export default function Routes({ appProps }) {
    return (
        <Switch>
            <AuthenticatedRoute path={"/"} exact component={MainPage} appProps={appProps}/>
            <UnauthenticatedRoute path={"/login"} exact component={Login} appProps={appProps}/>
            <UnauthenticatedRoute path={"/signup"} exact component={Signup} appProps={appProps}/>
            <UnauthenticatedRoute path={"/test"} exact component={LoadingScreen} appProps={appProps}/>
            <Route component={NotFound}/>
        </Switch>
    );
}