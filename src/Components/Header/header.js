import React,{useState} from "react";
import "./header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate= useNavigate();
    const [state,setState] =useState(true);
    
    const token= localStorage.getItem("token");
    const handleLogin=() => {
        if(token !== ""){
        setState(!state);
        }
    }
    
    const handleLogOut =() =>{
        localStorage.removeItem("token");
        setState(!state);
        navigate("/");
    }
    
    return (
        <header>
            <div className="header-container">
                <div className="header-left">
                    <Link to="/" ><h3>HOME</h3></Link> <br/>
                    <Link to="/product"><h4>Products</h4></Link>
                </div>
                <div className="header-middle">
                    <div className="header-search-container">
                        <SearchIcon />
                        <input type="text" placeholder="Search..." />
                    </div>
                </div>
                <div className="header-right">
                    <div className="header-right-container">
                        {(state) ? 
                       <Link to='/signin' ><Button variant="outline" onClick={() => handleLogin()} >Login</Button></Link>:
                       <Button variant="outline" onClick={() => handleLogOut()}>Logout</Button>}
                        <Link to='/signup'><Button variant="contained" >Signup</Button></Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;