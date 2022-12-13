import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";


function Signup() {
   
    const navigate= useNavigate();

    const validateForm = (formData) => {
        var errors = {}
        if (formData.userName === '') errors.userName = 'Name is Required';
        if (formData.email === '') errors.email = 'Email is Required';
        if (formData.password === '') errors.password = 'Password is Required';
        if (formData.confirmPassword === '') errors.confirmPassword = 'Confirm Password is Required';
        if(formData.password !== formData.confirmPassword) errors.confirmPassword="Password doen't match";
        return errors;
    }
    const handleSubmit = async (formData, { resetForm }) => {
        
        const response= await axios.post("https://fs-mail.onrender.com/register/signup",{...formData});
        if(response.data){
           localStorage.setItem("token",response.data);
            console.log(response);
            navigate("/");

        }

        resetForm();
       
    };

    return (
        <div className="auth">
        <div className="row">
            <div className="container col-md-5">
                <div className="auth-login" >
                    <Typography variant="h4" >Welcome Back!!!</Typography>
                    <div className="auth-container">
               
                    <Formik initialValues={{
                        userName: "",
                        email: "",
                        password: "",
                        confirmPassword: ""
                    }} validate={(formData) => validateForm(formData)}
                        onSubmit={handleSubmit}>

                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,

                            

                        }) => (

                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}

                                autoComplete="off"
                                onSubmit={handleSubmit}


                            >
                                <TextField id="standard-basic"
                                    label="Username"
                                    variant="standard"
                                    type="text"
                                    name="userName"
                                    value={values.userName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                ></TextField>
                                <br />
                                <span style={{ color: 'red' }}>{touched.userName && errors.userName}</span>
                                <br />
                                <TextField id="standard-basic"
                                    label="Email"
                                    variant="standard"
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                ></TextField>
                                <br />
                                <span style={{ color: 'red' }}>{touched.email && errors.email}</span>
                                <br />
                                <TextField id="standard-basic"
                                    label="Password"
                                    variant="standard"
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <br />
                                <span style={{ color: 'red' }}>{touched.password && errors.password}</span>
                                <br />
                            <TextField id="standard-basic"
                                label="Confirm Password"
                                variant="standard"
                                type="password"
                                name="confirmPassword"
                                value={values.confirmPassword} 
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        <br />
                        <span style={{color:'red'}}>{touched.confirmPassword && errors.confirmPassword}</span>
                        <br/>
                                <Button variant="contained" type="submit" >Register</Button>
                            </Box>)}
                    </Formik>
                        </div>
                    </div>
                </div>
                <div className="container col-md-7 pic">
                    <img src="https://media.istockphoto.com/vectors/little-girl-reading-with-stacks-of-books-vector-id166081761" alt="pic" />
                </div>
            </div>
        </div>
    )
}

export default Signup;