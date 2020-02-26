import React, { useState } from "react";
import {
    FormGroup,
    FormControl,
    FormCheck,
    Button
} from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import { Auth } from "aws-amplify";
import "./Signup.css";
import LoadingScreen from "../components/LoadingScreen";

export default function Signup(props) {
    const [fields, handleFieldChange] = useFormFields({
        username:"",
        email: "",
        password: "",
        confirmPassword: "",
        phone:"",
        confirmationCode: ""
    });
    const [newUser, setNewUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return (
            fields.username.length > 0 &&
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        let attributes = {
            email:fields.email,
        };
        if(isAdmin){
            attributes.phone_number = fields.phone;
        }

        try {
            const newUser = await Auth.signUp({
                username: fields.username,
                password: fields.password,
                attributes: {
                    email:fields.email,
                    phone_number: fields.phone,
                    "custom:isAdmin": isAdmin.toString()
                }
            });
            setIsLoading(false);
            setNewUser(newUser);
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
    }

    async function handleConfirmationSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await Auth.confirmSignUp(fields.username, fields.confirmationCode);
            console.log("confirmed sign up");
            await Auth.signIn(fields.username, fields.password);

            props.userHasAuthenticated(true);
            props.history.push("/");
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
    }

    function renderConfirmationForm() {
        return (
            <form onSubmit={handleConfirmationSubmit}>
                <FormGroup controlId="confirmationCode" bsSize="large">
                    <label>Confirmation Code</label>
                    <FormControl
                        autoFocus
                        type="tel"
                        onChange={handleFieldChange}
                        value={fields.confirmationCode}
                    />
                </FormGroup>
                <Button
                    block
                    type="submit"
                    bsSize="large"
                    disabled={!validateConfirmationForm()}
                >
                    Verify
                </Button>
            </form>
        );
    }

    function renderForm() {
        return (
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="username" bsSize="large">
                    <label>Username</label>
                    <FormControl
                        autoFocus
                        value={fields.username}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <label>Password</label>
                    <FormControl
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <label>Confirm Password</label>
                    <FormControl
                        type="password"
                        onChange={handleFieldChange}
                        value={fields.confirmPassword}
                    />
                </FormGroup>
                <FormGroup controlId="email" bsSize="large">
                    <label>Email</label>
                    <FormControl
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                        placeholder={"example@email.com"}
                    />
                </FormGroup>
                <FormGroup controlId="phone" bsSize="large">
                    <label>Phone Number</label>
                    <FormControl
                        label
                        value={fields.phone}
                        onChange={handleFieldChange}
                        placeholder={"+155555555555"}
                    />
                </FormGroup>
                <FormGroup controlId="admin" bsSize="large">
                    <FormCheck
                        label={"Admin"}
                        type="checkbox"
                        id="isAdmin"
                        value="isAdmin"
                        onChange={(e) => {
                            setIsAdmin(!isAdmin);
                        }}
                    />
                </FormGroup>
                <Button
                    block
                    type="submit"
                    bsSize="large"
                    disabled={!validateForm()}
                >
                    Signup
                </Button>
            </form>
        );
    }

    return (
        <div className="Signup">
            {isLoading ? LoadingScreen() :
                newUser === null ? renderForm() : renderConfirmationForm()
            }
        </div>
    );
}