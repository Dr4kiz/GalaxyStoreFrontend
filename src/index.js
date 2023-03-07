import React, { Fragment, Profiler, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { GlobalRouter } from "./routes";

const root = ReactDOM.createRoot(document.getElementById("root"));



root.render(<GlobalRouter />);
