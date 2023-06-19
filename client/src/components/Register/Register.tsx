import { useState } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
//import "./Register.css";

export const Register = () => {
    
const usernameRegex = /^[a-zA-Z0-9_א-ת]{3,16}$/;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");



    function validateForm() {
        return email.length > 0 && password.length > 0&&password==confirmPassword&&userName!=null&&usernameRegex.test(userName);
    }

    function handleSubmit(event:any) {
        event.preventDefault();
        console.log(event);
        axios.post("http://localhost:3000/users/register",
        {
            name:event.target[0].value,
            email:event.target[1].value,
            password:event.target[2].value,

        })
        .then(result =>{
         console.log("you are stupid man that you register here-go to cry to mama",result);

        })
        .catch(error => {
                console.log(error);
        });
    }

    return (
        <div className="Register">
            <Form onSubmit={handleSubmit}>
            <Form.Group  controlId="userName">
                    <Form.Label>userName</Form.Label>
                    <Form.Control
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size-lg controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </Form.Group>
                <Form.Group size-lg controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size-lg controlId="confirmPassword">
                    <Form.Label>ConfirmPassword</Form.Label>
                    <Form.Control
                        type="Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <Button size-lg type="submit" disabled={!validateForm()}>
                    Register
                </Button>
            </Form>
            <Link to="/">login</Link>

        </div>

    );

}


