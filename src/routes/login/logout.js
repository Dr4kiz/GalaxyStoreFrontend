import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import wicon from "../../assets/images/wicon.png";
import { useCookies } from "react-cookie";


export const Logout = () => {
    const [user, setUser] = useContext(AuthContext); 
    const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

    const navigate = useNavigate();
  
    setUser(null);
    removeCookie    ("access_token");
    setTimeout(() =>{
        navigate("/");
    }, 1500)

    return (
        <div
        style={
            {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100vw",
                backgroundColor: "#2b2d42",
                color: "#fff"

        }}
        >
            <img 
            style={{
                width: "80px",
                padding: "15px",
                filter: "invert(100%)"

            }
            }
            src={wicon} alt="wicon" />
            <h1>Você efetuou seu logout</h1>
            <p>Estamos te redirecionando...</p>
        </div>
    )
}