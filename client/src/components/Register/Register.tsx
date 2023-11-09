import { useState } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { } from "react-bootstrap";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import React from "react";
import '../Login/Login.css';

export const Register = () => {

    const usernameRegex = /^[a-zA-Z0-9_א-ת]{3,16}$/;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };




    function validateForm() {
        return email.length > 0 && password.length > 0 && password == confirmPassword && userName != null && usernameRegex.test(userName);
    }

    function handleSubmit(event: any) {
        console.log(event);
        event.preventDefault();
        console.log(event.target[0].value,event.target[2].value,event.target[4].value);
        
        axios.post("http://localhost:3000/users/register",
            {
                name: event.target[0].value,
                email: event.target[2].value,
                password: event.target[4].value,
                role:'admin',

            })
            .then(result => {
                console.log("you are stupid man that you register here-go to cry to mama", result);

            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="userName">
                    <TextField
                        id="outlined-basic"
                        label="User Name"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        variant="outlined" />

                </Form.Group>
                <Form.Group size-lg="true" controlId="email">
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <TextField
                            autoFocus
                            id="outlined-basic"
                            label="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined" />
                    </FormControl>
                </Form.Group>
                <Form.Group size-lg controlId="password">
                    <div className="password">
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>

                    </div>
                </Form.Group>
                <Form.Group size-lg controlId="confirmPassword">
                    <div className="confirmPassword">
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" >confirmPassword</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={password}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                          
                                label="confirmPassword"
                            />
                        </FormControl>

                    </div>
                </Form.Group>
                <Button size-lg type="submit" disabled={!validateForm()}>
                    Register
                </Button>
            </Form>
            <Link to="/">login</Link>

        </div>

    );

}


