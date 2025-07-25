"use client"; // Marks this as a Client Component

import React, { ReactNode } from "react"; // Importing types from React
import { Provider } from "react-redux";
import store from "../redux/store/store";
import { ToastContainer } from "react-toastify";
// import "bootstrap/dist/css/bootstrap.min.css";

interface ClientWrapperProps {
  children: ReactNode; // Define the type for children
}

export default function ClientWrapper({ children }: ClientWrapperProps) {

  return (
  
      <Provider store={store}>
          <ToastContainer
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
        {children}
      </Provider>
  );
}
