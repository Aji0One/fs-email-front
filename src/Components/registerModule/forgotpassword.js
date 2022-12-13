import React from "react";
import { TextField, Button, Box } from "@mui/material";
import { Formik } from "formik";
import "./index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Forgot() {
    const navigate = useNavigate();

    const validateForm = (formData) => {
        var errors = {}
        if (formData.email === '') errors.email = 'Email is Required';

        return errors;
    }


    const handleSubmit = async (formData, { resetForm }) => {
        delete (formData.userName);


        const response = await axios.post("https://fs-mail.onrender.com/register/forgotpassword", { ...formData });
        if (response.data) {
            localStorage.setItem("token", response.data);
            navigate("/afterfp");
        }
        resetForm();

    };
    return (
        <div className="auth">
            <div className="row">
                <div className="container col-md-5">
                    <div className="auth-login" >
                        {/* <Typography variant="h4" ></Typography> */}
                        <div className="auth-container">
                                <Formik initialValues={{
                                    email: "",
                                  
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
                                            
                                            <Button variant="contained" type="submit">Submit</Button>
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

export default Forgot;
