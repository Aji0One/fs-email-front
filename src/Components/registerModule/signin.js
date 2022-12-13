import React from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Formik } from "formik";
import "./index.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function Signin() {
    const navigate = useNavigate();
    const validateForm = (formData) => {
        var errors = {}
        if (formData.email === '') errors.email = 'Email is Required';
        if (formData.password === '') errors.password = 'Password is Required';

        return errors;
    }


    const handleSubmit = async (formData, { resetForm }) => {
        delete (formData.userName);


        const response = await axios.post("https://fs-mail.onrender.com/register/signin", { ...formData });
        if (response.data) {
            localStorage.setItem("token", response.data);
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
                                    password: ""
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
                                                name="password"
                                                variant="standard"
                                                type="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <br />
                                            <span style={{ color: 'red' }}>{touched.password && errors.password}</span>
                                            <br />
                                            <Link to='forgotpassword' style={{textAlign:"right"}}>forgotpassword?</Link><br/>
                                            <Button variant="contained" type="submit">Signin</Button>
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

export default Signin;