import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import App from './routes/App';
import Adm from './routes/Adm';
import Cozinha from './routes/Cozinha';
import Cardapio from './routes/Cardapio';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/adm",
    element: <Adm />,
  },
  {
    path: "/cozinha",
    element: <Cozinha />,
  },
  {
    path: "/cardapio",
    element: <Cardapio />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
