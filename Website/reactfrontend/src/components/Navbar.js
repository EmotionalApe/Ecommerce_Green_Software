import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/authContext' 

const Navbar = () => {
    // const { authToken } = useAuthToken();
    // const isLoggedIn = authToken !== null;

    const navigate = useNavigate();
    const { authToken, logout } = useAuth();

    const handleLogout = () => {
        logout(); // Call the logout function from useAuth
        navigate('/login');
    }

    return (
        <div className=' bg-black w-full h-[50px] text-white flex items-center justify-center'>

            <div className='w-[50%] flex justify-evenly text-xl'>
                <Link to='/'>Home</Link> 
                {!authToken && <Link to='/login'>Login</Link>}
                {authToken && <div onClick={handleLogout} className='cursor-pointer'>Logout</div>}
                <Link to='/cart'>Cart</Link>

                {/* {isLoggedIn ?
                    <div>
                    <div onClick={handleLogout} className='cursor-pointer'>Logout</div>
                    </div> :
                <Link to='/login'>Login</Link>
                } */}
            </div>

        </div>
    )
}

export default Navbar