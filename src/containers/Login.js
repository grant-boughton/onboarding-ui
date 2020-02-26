import React from "react";
import { FormGroup, FormControl, Button} from "react-bootstrap";
import { Auth } from "aws-amplify";
import { useFormFields } from "../libs/hooksLib";
import "./Login.css";

export default function Login(props) {
    const [fields, handleFieldChange] = useFormFields({
        username:"",
        password:""
    })

    function validateForm() {
        return fields.username.length > 0 && fields.password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await Auth.signIn(fields.username, fields.password);
            props.userHasAuthenticated(true);
            props.history.push("/");
        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="username" bsSize="large">
                    <label>Username: </label>
                    <FormControl
                        autoFocus
                        value={fields.username}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <label>Password: </label>
                    <FormControl
                        value={fields.password}
                        onChange={handleFieldChange}
                        type="password"
                    />
                </FormGroup>
                <Button block bsSize="large" disabled={!validateForm()} type="submit">
                    Login
                </Button>
            </form>
        </div>
    );
}