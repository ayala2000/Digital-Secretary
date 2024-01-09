import { useState } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Alert, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from "@mui/material";
import { } from "react-bootstrap";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import React from "react";
import '../Login/Login.css';
import { blue } from "@mui/material/colors";

export const Register = () => {

    const usernameRegex = /^[a-zA-Z0-9_א-ת]{3,16}$/;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [showalert, setShowalert] = React.useState(false);
    const [showalerterrorMail, setShowalerterrorMail] = React.useState(false);


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };




    function validateForm() {


        return email.length > 0 && password.length > 0 && password == confirmPassword && userName != null && usernameRegex.test(userName);
    }

    function handleSubmit(event: any) {

        event.preventDefault();

        axios.post("http://localhost:3000/users/register",
            {
                name: event.target[0].value,
                email: event.target[2].value,
                password: event.target[4].value,
                role: 'admin',

            })
            .then(result => {
                setShowalert(true);
                setShowalerterrorMail(false);
                console.log("you are stupid man that you register here-go to cry to mama", result);

            })
            .catch(error => {
                setShowalert(false);
                setShowalerterrorMail(true);
                console.log(error);
            });
    }

    return (
        <div className="Login">
              {
                    showalert &&
                    <Stack sx={{  m: 1,width: '45ch' }} spacing={2}>
                        <Alert severity="success">This is a success alert — check it out!</Alert>
                    </Stack>
                }
                {showalerterrorMail &&
                    <Stack sx={{  m: 1,width: '45ch' }} spacing={2}>
                        <Alert severity="error">this mail is exist  </Alert>
                    </Stack>
                }
                {!validateForm() &&
                    <Stack sx={{  m: 1,width: '45ch' }} spacing={2}>
                        <Alert severity="info"> Check this name isn't too short or password is invalid</Alert>                   </Stack>
                }

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="userName">
                    <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">

                        <TextField
                            id="outlined-basic"
                            label="User Name"
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            variant="outlined" />
                    </FormControl>
                </Form.Group>
                <Form.Group size-lg="true" controlId="email">
                    <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
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
                        <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
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
                        <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" >PasswordConfirm</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                            /></FormControl>
                        {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" >confirmPassword</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                          
                                label="confirmPassword"
                            />
                        </FormControl> */}

                    </div>
                </Form.Group>
                <FormControl sx={{ m: 1, width: '45ch' ,color:blue}} variant="outlined">

                <Button size-lg type="submit" disabled={!validateForm()}>

                    Register
                </Button>
                </FormControl>
              
            </Form>
           Already have account? <Link to="/">login</Link>

        </div>

    );

}


