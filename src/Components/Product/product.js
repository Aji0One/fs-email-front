import React, { useEffect, useState } from "react";
import axios from "axios";
import {useJwt} from "react-jwt"
import { useNavigate } from "react-router-dom";
import { Typography, Button, Grid, Card, CardActions, CardContent } from '@mui/material';





export default function ProductComponent() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function GetProduct() {
            
            const isExpired = useJwt(localStorage.getItem("token"));
            if (isExpired) {
                navigate("/");

            }

            else {
                const response = await axios.get("https://fs-mail.onrender.com/product/get", {
                    headers: {
                        accesstoken: localStorage.getItem("token"),
                    },
                });
                console.log(response.data);
                setProducts(response.data);
            }
        }
        GetProduct();

    }, [navigate])

    const UpdateProduct = async(id,value) => {

        const isExpired = useJwt(localStorage.getItem("token"));
        if (isExpired) {
            navigate("/");

        }
        else{
        const response= await axios.put(`https://fs-mail.onrender.com/product/update/${id}`, {
            product:{
                userQuantity: value,
            },
        },{
            headers:{
               accesstoken: localStorage.getItem("token"),
            },
        });
    
            // console.log(response.data.value.userQuantity);
            let productCopy= [...products];
            const index= productCopy.findIndex( (row) => row._id === id);
            products[index].userQuantity= response.data.value.userQuantity;
            setProducts(productCopy);

        }
    }

    return (
        <>
            <Grid>
                <Grid container spacing={2} style={{ padding : "20px" }}>
                    {products.map((row) => (
                        <Grid item key={ row._id}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {row.productName}
                                    </Typography>
                                    <Typography variant="body2">
                                        Quantity: {row.quantity}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Description:{row.description}
                                    </Typography>
                                
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        <strong>Price: {row.price}</strong>
                                    </Typography>
                                    
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={ () => UpdateProduct(row._id, ++row.userQuantity)} disabled= {row.userQuantity >= row.quantity}>+</Button>
                                    {row.userQuantity}
                                    <Button size="small" onClick={ () => UpdateProduct(row._id, --row.userQuantity)} disabled= {row.userQuantity <= 0}>-</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        
                    ))}
                </Grid>
            </Grid>

        </>
    )
};