import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthProvider from "./store/auth";
import AppProvider from "./store/app";

ReactDOM.render(
  <AppProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </AppProvider>,
  document.getElementById("root")
);
