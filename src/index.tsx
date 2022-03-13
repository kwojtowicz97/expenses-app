import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthProvider from "./store/auth";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
