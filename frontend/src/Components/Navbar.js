import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { CounterContext } from '../Context/CounterContext';
import { FaUserLarge } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


function Navbar() {

  let {user,setUser}=React.useContext(CounterContext)

  const navigate = useNavigate();
  

  function logout(){
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate("/")
  }

  return (
    <div className='bg-[#0F1214] text-white '  style={{backgroundColor:""}} >
        <div className='border-r-2 border-gray-300' >
          {
              user ? (
                <div className=' px-10 py-8 h-screen flex flex-col items-center'>
                  <div className='flex flex-col items-center'>
                    <FaUserLarge size={50} />
                    <button onClick={()=>navigate('/profile')}><h4 className='text-2xl font-bold pt-3 text-gray-300 '>{user.username}</h4></button>
                    <div className='mt-10 '>
                      <Link to='/createquiz'><button className='block border-b-2 border-blue-950 px-8 py-1 rounded-md  mx-auto  hover:border-blue-500 hover:text-blue-500' style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}>Create quiz</button></Link>
                      <Link to='/createdquiz'><button className='block border-b-2 border-blue-950 px-6 py-1 mt-4 rounded-md w-full  m-auto hover:border-blue-500 hover:text-blue-500' style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}>Created quiz</button></Link>
                      <Link to='/takequiz'><button className='block border-b-2 border-blue-950 px-6 py-1 mt-4 rounded-md w-full  mx-auto hover:border-blue-500 hover:text-blue-500' style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}>Take a quiz</button></Link>
                      <Link to='/taskstodo'><button className='border-b-2 border-blue-950 px-6 py-1 mt-4 rounded-md  w-full  mx-auto hover:border-blue-500 hover:text-blue-500' style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}>Tasks to do</button></Link>
                    </div>
                  </div>
                  <div className='mt-auto flex flex-col items-center'>
                    <button className='border-b-2 border-blue-950 px-8 py-1 mt-4 rounded-md m-auto hover:border-blue-500 hover:text-blue-500' style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}} onClick={logout}>
                      Logout
                    </button>
                  </div>
                </div>
              ): (<div>
              </div>)
          }
        </div>
    </div>
  )
}

export default Navbar