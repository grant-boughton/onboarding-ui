import React from "react";
import { withRouter } from "react-router-dom";
import {Navbar, Nav, NavItem, NavbarBrand} from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { Auth } from 'aws-amplify';

function App(props) {
    const [isAuthenticated, userHasAuthenticated] = React.useState(false);
    const [isAuthenticating, setIsAuthenticating] = React.useState(true);
    async function handleLogout() {
        await Auth.signOut();
        userHasAuthenticated(false);
        props.history.push("/login");
    }

    React.useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        try {
            await Auth.currentSession();
            userHasAuthenticated(true);
        }
        catch(e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }

        setIsAuthenticating(false);
    }

    return (
        !isAuthenticating &&
        <React.Fragment>
            <Navbar fluid>
                <Nav>
                    <Nav.Link href={"/"}>Home</Nav.Link>
                    {isAuthenticated
                        ? <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        : <React.Fragment>
                            <Nav.Link href={"/login"}>Login</Nav.Link>
                            <Nav.Link href={"/signup"}>Sign Up</Nav.Link>
                        </React.Fragment>
                    }
                </Nav>
            </Navbar>
          <Routes appProps={{ isAuthenticated, userHasAuthenticated}}/>
      </React.Fragment>
    );
}

export default withRouter(App);
/*


                <Navbar.Header>
                    <Navbar.Brand>
                        <NavItem
                    </Navbar.Brand>
                </Navbar.Header>
 */