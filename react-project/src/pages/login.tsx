import React, {FC, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import useUserId from "../hooks/user-id.hook.ts";

export const Login: FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const normalInputClasses = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    const errorInputClasses = "bg-red-50 border border-red-500 text-red-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
    const normalTextClasses = "block mb-2 text-sm font-medium text-gray-900"
    const errorTextClasses = "block mb-2 text-sm font-medium text-red-700"
    const { setUserId } = useUserId()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            });

            if (response.ok) {
                const data = await response.json();
                setUserId(data.id);
                navigate('/todo');
            } else {
                setError('Failed to login')
            }
        } catch (error) {
            setError('Failed to login')
        }
    };

    return (
        <form className="max-w-sm w-full mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="username" className={error ? errorTextClasses : normalTextClasses}>
                    Your username</label>
                <input type="text" id="username" value={username}
                       className={error ? errorInputClasses : normalInputClasses}
                       placeholder="JohnDoe"
                       onChange={(e) => setUsername(e.target.value)}
                       required/>
            </div>
            <div className="mb-5">
                <label htmlFor="password" className={error ? errorTextClasses : normalTextClasses}>
                    Your password</label>
                <input type="password" id="password" value={password}
                       className={error ? errorInputClasses : normalInputClasses}
                       onChange={(e) => setPassword(e.target.value)}
                       required/>
            </div>
            {error && (
                <p className="text-red-700 text-sm font-medium mb-5">{error}</p>
            )}
            <div className="mb-5">
                <a href="/register" className="text-blue-700 hover:underline">Make an account</a>
            </div>
            <button type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Login
            </button>
        </form>
    );
};