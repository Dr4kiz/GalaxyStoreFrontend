import React from "react";
import { useNavigate } from "react-router-dom";
import wicon from "../../assets/images/wicon.png";

export const NotFound = () => {

    const navigate = useNavigate();

    setTimeout(() => {
        navigate("/");
    }, 3000);
    

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
            <h1>Ops, está página não esta pronta!</h1>
            <p>Estamos te redirecionando...</p>
        </div>
    );
    };