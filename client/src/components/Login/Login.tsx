import { useState } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import { Link, Route, useNavigate } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';
//import Home from "../Home/Home";
import { Register } from "../Register/Register";

//import "./Login.css";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }
    //const history = useHistory();
    const navigate = useNavigate();


    function handleSubmit(event: any) {
        event.preventDefault();
        console.log(event);
        axios.post("http://localhost:3000/users/login",
            {
                email: event.target[0].value,
                password: event.target[1].value,
            })
            .then(result => {
                if (!(result.data.token)) {
                    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

                    <Route path="/register" Component={Register} />

                }
                else {

                    //   <Route exact path="/" component={Home} />


                }
                console.log("you are stupid man that you register here-go to cry to mama", result);
            })
            .catch(error => {
                console.log("ppppppppppppppppppppppppppppppp");
                navigate('/Home');

            });
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
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

                <Button size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>

            </Form>
            <Link to="/register">register</Link>
        </div>

    );

}


