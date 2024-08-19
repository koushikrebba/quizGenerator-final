import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { CounterContext } from '../Context/CounterContext';
import { useEffect } from 'react';

function Register() {

  const { register, handleSubmit, formState: { errors } } = useForm();  

  let {user,setUser}=React.useContext(CounterContext)


  const navigate = useNavigate();

  //if user already exists then it navigates to taskstodo page
  useEffect(() => {
    if (user) {
      navigate('/taskstodo');
    }
  }, [user, navigate]);

  async function formSubmit(formData){
    try {
        let res = await axios.post('http://localhost:3000/userapi/register', formData)
        if (res.data.message === "user created") {
            navigate('/login')
        }else{
          if(res.data.message === "user existed"){
            alert('user existed')
          }
        else {
            alert(res.data.message)
        }
      }
    } catch (error) {
        alert('An error occured. Please try again later...')
    }
  }

  return (
    <div>
    <div className='h-screen pt-40 bg-zinc-900  '>
        <div className='border w-2/5 m-auto px-10 py-8 bg-black rounded-lg border-blue-950'  style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}>
        <form className='' onSubmit={handleSubmit(formSubmit)} >
          <input className='block rounded-lg ps-2 p-1 mb-3 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none w-64 py-1 text-white bg-black' type="text" placeholder='username' {...register("username", { required: true })} />
          <input className='block rounded-lg ps-2 p-1 mb-3 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none w-64 py-1 text-white bg-black' type="email" placeholder='email' {...register("email", { required: true })} />
          <input className='block rounded-lg ps-2 p-1 mb-3 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none w-64 py-1 text-white bg-black' type="password" placeholder='password' {...register("password", { required: true })} />
          <button className='border-b-2 border-blue-950 px-6 py-1 mt-4 rounded-md text-white text-lg hover:border-blue-500 hover:text-blue-500'  style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}>Register</button>
          <p className='text-blue-800 pt-4' >Already have an account? <a href="/login">Login</a></p>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Register