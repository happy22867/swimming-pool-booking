import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // Tailwind CSS import
import { AuthProvider } from './context/authContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Wrap App in BrowserRouter */}
        <AuthProvider>
    <App />
  </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
