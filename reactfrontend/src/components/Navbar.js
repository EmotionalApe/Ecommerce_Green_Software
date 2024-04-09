import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useAuthToken from '../hooks/useAuthToken'

const Navbar = () => {
    const navigate = useNavigate()
    const { authToken } = useAuthToken();
    const isLoggedIn = authToken !== null;

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }

    return (
        <div className=' bg-black w-full h-[50px] text-white flex items-center justify-center'>

            <div className='w-[50%] flex justify-evenly text-xl'>
                <Link to='/'>Home</Link>
                {isLoggedIn ?
                    <div>
                        <div onClick={handleLogout} className='cursor-pointer'>Logout</div>
                    </div> :
                        <Link to='/login'>Login</Link>
                }
            </div>

        </div>
    )
}

export default Navbar