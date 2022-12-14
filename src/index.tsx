import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductList from "./screens/ProductList/ProductList";
import RegisterProduct from "./screens/RegisterProduct/RegisterProduct";
import EditProduct from "./screens/EditProduct/EditProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "register",
        element: <RegisterProduct />,
      },
      {
        path: "products/:sku",
        element: <EditProduct />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
