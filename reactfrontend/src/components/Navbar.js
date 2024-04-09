import React from 'react'
import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    // const navigate = useNavigate()

    return (
        <div className=' bg-black w-full h-[50px] text-white flex items-center justify-center'>

            <div className='w-[50%] flex justify-evenly text-xl'>
                <Link to='/'>Home</Link>
                <Link to='/login'>Login</Link>
            </div>

        </div>
    )
}

export default Navbar