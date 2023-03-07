import { createContext, useEffect, useMemo, useState } from "react";
import { Routes } from "react-router-dom";
import { useCookies } from 'react-cookie'
import axios, { Axios } from "axios";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext([{}, () => {}]);

 


export const AuthProvider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['access_token'])
    const [plugins, setPlugins] = useState([])
    
    const expired = (token) => {
        const decoded = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            cookies.remove('access_token')
            return true;
        }
        return false;
    }


    const [state, setState] = useState(() => {
        const token = cookies.access_token;
        if (token && !expired(token)) {
            return jwt_decode(token);
        }
        return null;
    });

 

 

    return (
    
        <AuthContext.Provider value={[state, setState]}>
            {children}
        </AuthContext.Provider>
        
    )
}

