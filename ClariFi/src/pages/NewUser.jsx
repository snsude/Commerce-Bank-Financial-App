import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

//WORK IN PROGRESS PAGE FOR 

const Login = () => {
    const [username, setUsername] = useState('');  
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        console.log('Login attempt:', { username, password, remember });
    };

    return (
        <div className="bg-gray-100 flex justify-center items-center h-screen">

            <div className="w-1/2 h-screen hidden lg:block">
                <img 
                    src="/background.jpg" 
                    alt="Login Background" 
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
                <div className="flex justify-center mb-8">
                    <img 
                        src="/ClariFi-Logo.png" 
                        alt="Company Logo" 
                        className="h-16 w-auto"
                    />
                </div>
                
                <h1 className="text-2xl font-semibold mb-4">Login</h1>
                
                <div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600">
                            Username
                        </label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" 
                            autoComplete="off"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600">
                            Password
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" 
                            autoComplete="off"
                        />
                    </div>
                    {/*replace this with another password box, but it will be for confirming password. what other fields will we require*/}
                    <div className="mb-4 flex items-center">
                        <input 
                            type="checkbox" 
                            id="remember" 
                            name="remember" 
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                            className="text-blue-500"
                        />
                        <label htmlFor="remember" className="text-gray-600 ml-2">
                            Remember Me
                        </label>
                    </div>

                    <div className="mb-6 text-blue-500">
                        <a href="#" className="hover:underline">Forgot Password?</a>
                    </div>

                    <button 
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                    >
                        Login
                    </button>
                </div>

                <div className="mt-6 text-blue-500 text-center">
                    <a href="#" className="hover:underline">Sign up Here</a>
                </div>
            </div>
        </div>
    );
}

export default Login;