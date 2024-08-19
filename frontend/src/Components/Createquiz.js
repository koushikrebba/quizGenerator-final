import React from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { CounterContext } from '../Context/CounterContext';
import { useState } from 'react';
import { useEffect } from 'react';
import './Createquiz.css'

function Createquiz() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    let {user,setUser}=React.useContext(CounterContext)

    let [created, setCreated] = useState(false)
    let [generate, setGenerate] = useState(false)

    const [text, setText] = useState('');
    const fullText = 'Generating quiz . . .'; // The full word to display

    useEffect(() => {
        let index = 0; // Index to track the current letter to display

        // Create an interval to update the displayed text
        const interval = setInterval(() => {
            setText(fullText.slice(0, index + 1)); // Update the text state
            index += 1;
            if (index > fullText.length) {
                index = 0; // Reset index to 0 when the full text is displayed
            }
        }, 150); // Update every 150 milliseconds

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);



    async function formSubmit(formData){
        try {
            
            setGenerate(true)
            // insert user into form
            formData.username = user.username

            let res = await axios.post('http://localhost:3000/quizapi/create', formData)
            if (res.data.message === "Quiz created successfully") {
                setCreated(true)
                setText('')
            }
            else {
                alert(res.data.message)
                setGenerate(false)
                setText('')
            }
        } catch (error) {
            alert('An error occured. Please try again later...')
            setGenerate(false)
            setText('')
        }
    }


  return (
    <div>
        <div className='h-screen w-full pt-28  bg-zinc-900'>
            <div className='text-white  mx-36 pb-5' >
                <h1 className='text-3xl pb-5' >Create Your Own Quiz!</h1>
                <p>Unleash your creativity by crafting a quiz on your favorite theme! Whether it's movies, history, or pop culture, you can share your interests and challenge your friends. Choose a theme, create engaging questions, and see how well others can score. Start now and let the fun begin!</p>
            </div>
            {
                generate ? (
                    created ? (
                        <div className='w-2/5 m-auto mt-8 pb-3 pt-1 text-center rounded-full'style={{boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px"}}>
                            <h1 className='text-4xl font-bold' style={{backgroundImage:" linear-gradient(to right, #e6dada, #274046) ",backgroundClip:"text",color:"transparent"}} >Quiz created successfully!</h1>
                        </div>
                    ):(
                        <div className='w-2/5 m-auto mt-8 text-white flex justify-center py-2 rounded-full' style={{boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px"}}>
                            <img src='https://i.gifer.com/ZKZg.gif' width={40} alt="" />
                            <div className='w-3/5'>
                                <h4 className='ps-5 text-2xl mt-1 '>{text}</h4>
                            </div>
                        </div>
                    )
                ):(
                    <div>
                        <form className='w-2/5 m-auto px-10 py-8 rounded-lg ' onSubmit={handleSubmit(formSubmit)} >
                            <input className='block rounded-lg ps-4 p-1 mb-3 border-b-2 border-blue-950 focus:border-blue-500 focus:outline-none w-full py-1 text-white bg-black' style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}} type="text" placeholder='Pick a theme' {...register("theme", { required: true })} />
                            <button className='border-b-2 border-blue-950 text-xl px-9 py-1 mt-4 rounded-md text-white  hover:border-blue-500 hover:text-blue-500' style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}>Create</button>
                        </form>
                    </div>
                )
            }

            
        </div>
    </div>
  )
}

export default Createquiz