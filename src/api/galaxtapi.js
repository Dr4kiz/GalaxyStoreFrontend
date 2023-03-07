import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.nixmc.tk:8443",
    // ignore ssl certificate
});