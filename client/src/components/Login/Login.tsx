/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import './Login.css';
import Button from "react-bootstrap/Button";
import { Link, Route, useNavigate } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';
//import Home from "../Home/Home";
import { Register } from "../Register/Register";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import React from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Cookies from 'js-cookie';
import config from "../config ";
import Container from 'react-bootstrap/Container';
import { useFormik } from "formik";
import Appss from "../Ruoter/Router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";
import { setUser } from "../../Redux/userSlice";


//import "./Login.css";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [data, setData] = useState('');
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const toast:any = useRef(null);

    // const show = (data:any) => {
    //     toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.value });
    // };




    function validateForm() {
        return email.length > 0 && password.length > 0;
    }
    useEffect(() => {
        const savedData = localStorage.getItem('myData');
        if (savedData) {
          setData(savedData);
        }
      }, []);
    useEffect(() => {
        localStorage.setItem('myData', data);
    }, [data]);
    //const history = useHistory();
    const navigate = useNavigate();
    const saveLocalStorge = (data: any) => {
        setData(data);
    };
    function handleSubmit(event: any) {
        event.preventDefault();
        console.log(event);
        axios.post("http://localhost:3000/auth/login",
            {
                email: event.target[0].value,
                password: event.target[2].value,
            })
            .then(result => {
                console.log(result.data, 'data');

                if (!(result.data.access_token)) {

                    <Route path="/register" Component={Register} />
                }
                else {
                    console.log(result.data);
                    const receivedToken = result.data.access_token;
                    Cookies.set('token', receivedToken, { expires: 7 });
                    localStorage.setItem('myData', email);
                    saveLocalStorge({ email });
                    dispatch(setUser());
                    console.log("you are stupid man that you register here-go to cry to mama", result);
                    if (email === config.admin.email){
                        


                        navigate('/appss');}//   <Route exact path="/" component={Home} />
                    else
                        navigate('/Home');//   <Route exact path="/" component={Home} />


                }

            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    navigate('/Register');
                }
                console.log("ppppppppppppppppppppppppppppppp", error);


            });
            
    }

    return (
        
        <div className="Login">

            <Form onSubmit={handleSubmit}>
                <Form.Group size-lg="true" controlId="email">
                    <FormControl sx={{ m: 1, width: '25ch' }} >
                        <TextField

                            autoFocus
                            id="outlined-basic"
                            type="email"
                            label="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined" />
                    </FormControl>
                </Form.Group>

                <Form.Group size-lg="true" controlId="password">
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

                <Button size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>

            </Form>
            <Link to="/register">register</Link>
        </div>

    );

}


