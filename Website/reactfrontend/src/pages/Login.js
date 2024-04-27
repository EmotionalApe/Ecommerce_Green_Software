import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:5000/login", { username, password });
            const { token } = response.data;
            localStorage.setItem('token', token); 
            navigate('/', {"username" : username}); 
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className=''>
            <form className='bg-gray-200 p-5 w-[500px] h-[500px] text-black flex flex-col justify-evenly  items-center rounded-xl text-[20px] mx-auto my-10' onSubmit={handleLogin}>
                <h2 className='text-3xl font-extrabold'>Login</h2>

                <div>
                    <label htmlFor='username' className='m-5'>Username</label>
                    <input className='rounded-md text-black p-1' type='text' id='username' value={username} onChange={(event) => { setUsername(event.target.value) }} />
                </div>

                <div>
                    <label htmlFor='password' className='m-5'>Password</label>
                    <input className='rounded-md text-black p-1' type='password' id='password' value={password} onChange={(event) => { setPassword(event.target.value) }} />
                </div>

                <button className='bg-gray-700 pl-5 pr-5 pt-3 pb-3 rounded-md text-white font-extrabold'>Login</button>

            </form>
        </div>
    )
}

export default Login