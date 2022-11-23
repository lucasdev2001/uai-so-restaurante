import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cozinha from "./routes/Cozinha";
import Pedido from "./routes/Pedidos";
import FazerPedido from "./routes/FazerPedido";
import Adm from "./routes/Adm";
import Inicial from "./routes/Inicial";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicial />,
  },
  {
    path: "/pedidos",
    element: <Pedido />,
  },
  {
    path: "/cozinha",
    element: <Cozinha />,
  },
  {
    path: "/adm",
    element: <Adm />,
  },
  {
    path: "/inicial",
    element: <Inicial />,
  },
  {
    path: "/fazerpedido",
    element: <FazerPedido />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
