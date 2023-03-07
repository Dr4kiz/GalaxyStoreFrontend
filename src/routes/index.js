import {
  Route,
  Routes,
  BrowserRouter as Router,
  BrowserRouter,
} from "react-router-dom";
import { Plugins } from "./plugins";
import { Auth } from "./login/auth";
import { Register } from "./login/register";
import { PrivateRoute } from "./PrivateRoute";
import { Profile } from "./profile";
import App from "../App";

import { AuthProvider } from "../context/AuthProvider";
import { useEffect } from "react";
import { Logout } from "./login/logout";
import { Terms } from "./terms";
import { DashBoard } from "./profile/admin/dashboard";
import { CartProvider } from "../context/CartContext";
import { PluginProvider } from "../context/PluginsContext";
import { SideBar } from "../components/sidebar";
import { NotFound } from "./notfound";

export const GlobalRouter = () => {
  return (
    <AuthProvider>
      <PluginProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/plugins" element={<Plugins />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />

            <Route
              path="/profile"
              element={<PrivateRoute Role="ROLE_USER" Component={SideBar} />}
            />

            <Route
              path="/dashboard"
              element={<PrivateRoute Role="ROLE_ADMIN" Component={DashBoard} />}
            />

            <Route>
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/terms" element={<Terms />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
      </PluginProvider>
    </AuthProvider>
  );
};
