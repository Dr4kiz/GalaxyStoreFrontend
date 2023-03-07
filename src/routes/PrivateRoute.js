import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export const PrivateRoute = ({ Component, Role }) => {
  const [user, setUser] = useContext(AuthContext);
  if(!user) return <Navigate to="/auth" />
  return user?.roles?.includes(Role) ? <Component /> : <Navigate to="/auth" />;

};


