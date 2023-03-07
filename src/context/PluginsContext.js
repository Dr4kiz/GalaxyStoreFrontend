import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/galaxtapi";
import { AuthContext } from "./AuthProvider";

export const PluginContext = createContext([{}, () => {}]);

export const PluginProvider = ({ children }) => {
    const [state, setState] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useContext(AuthContext)

    useEffect(() => {
        async function fetchdata() {
          const response = await api.post("/plugin/list");
          const { content } = response.data;
          setState(content);
          setLoading(false);
        }
        fetchdata();
        
    
      }, [loading, user]);
    
    return (
        <PluginContext.Provider value={[state, setState]}>
        {children}
        </PluginContext.Provider>
    );
    }

