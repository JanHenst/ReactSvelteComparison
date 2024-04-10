import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { TodoPage } from "./pages/todo";

function App() {
    return (
        <Router>
            <div className="flex h-screen items-center">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/todo" element={<TodoPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
