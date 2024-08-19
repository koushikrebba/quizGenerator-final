
import React from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FaRegCircle } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { useEffect } from 'react';
import { CounterContext } from '../Context/CounterContext';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import './Taskstodo.css'

function Taskstodo() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    let { user, setUser } = React.useContext(CounterContext);

    let [tasks, setTask] = useState([]);

    let [countCompleted, setCountCompleted] = useState(0);

    let navigate = useNavigate();

    useEffect(() => {
        if (!user) {
          navigate('/');
        }
      }, [user, navigate]);



    useEffect(() => {
        if (user) {
          fetch(`http://localhost:3000/tasksapi/tasks/${user.username}`)
            .then(res => res.json())
            .then(data => {
              setTask(data);
              setCountCompleted(data.filter(task => task.status).length);
            });
        }
      }, [user,tasks]);

    async function taskSubmit(data) {
        try {
            const newTask = {
                username: user.username,
                task: data.task,
                status: false
            };
            let res = await axios.post('http://localhost:3000/tasksapi/new-task/', newTask)
            if (res.data.message === 'task added') {
                setTask([...tasks, newTask]);
            }
            else {
                console.log("helo")
                alert(res.data.message)
            }
        } catch (error) {
            alert('An error occured. Please try again later...')
        }
    }


    async function completeTasks(index) {
        console.log(index)
        try {
            const task = tasks[index];
            const updatedTask = {
                ...task,
                status: !task.status  // Toggle the status
            };
            
            let res = await axios.put(`http://localhost:3000/tasksapi/update-task/${task._id}`, updatedTask);
            if (res.data.message === 'task updated') {
                // Update state with the new task status
                const updatedTasks = tasks.map((t, i) => i === index ? updatedTask : t);
                setTask(updatedTasks);
                setCountCompleted(updatedTasks.filter(task => task.status).length);
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            alert('An error occurred. Please try again later...');
        }
    }


    async function deleteTask(index) {
        try {
            const task = tasks[index];
            let res = await axios.delete(`http://localhost:3000/tasksapi/delete-task/${task._id}`);
            if (res.data.message === 'task deleted') {
                const updatedTasks = tasks.filter((t, i) => i !== index);
                setTask(updatedTasks);
                setCountCompleted(updatedTasks.filter(task => task.status).length);
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            alert('An error occurred. Please try again later...');
        }
    }
    


    return (
        <div>
            <div className=' h-screen pt-28 ' style={{backgroundColor:"#18181B"}}>
                <form className='flex justify-center text-white ' onSubmit={handleSubmit(taskSubmit)} >
                    <div className='relative flex items-center w-2/4'>
                        <input 
                            className='block rounded-lg p-4 py-2 mb-3 border-b-2 border-blue-950 focus:border-blue-500 focus:outline-none w-full pr-10 bg-black'
                            style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}
                            type="text" 
                            placeholder='add task' 
                            {...register("task", { required: true })}
                        />
                        <button type="submit" className='ml-2 absolute top-0 right-0 pt-2 pe-2 hover:text-blue-500'>
                            <IoIosAddCircleOutline size={26}    />
                        </button>
                    </div>
                </form>
                
                <div className='mt-10  '>
                    {tasks.length > 0 && (
                        <div className='relative  rounded-lg w-4/6 m-auto text-white border-b-2 border-blue-950 ' style={{backgroundColor:"#18181B",boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}} >
                            <div className='px-10 h-36 pt-5 ' >
                                <div className='flex justify-between' >
                                    <div className='px-3 py-1 border-b-2 border-blue-950 rounded-lg bg-black hover:border-blue-500 hover:text-blue-500 'style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}} >
                                    <h2 className='text-lg'  >To do: { tasks.length - countCompleted}</h2>
                                    </div>
                                    <div className='px-3 py-1 border-b-2 border-blue-950 rounded-lg bg-black hover:border-blue-500 hover:text-blue-500 'style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}>
                                    <h2 className='text-lg' >Completed: {countCompleted } </h2>
                                    </div>
                                </div>
                            <div className='absoulte mt-4'>
                                <div className=' w-4/5 m-auto py-3 rounded-lg ' style={{backgroundColor:"#18181B"}}>
                                <h5 className='inline-block border-b-2 border-blue-950 px-5 py-1 mb-3 ms-2 rounded-lg text-lg bg-black hover:border-blue-500 hover:text-blue-500' style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}>Tasks</h5>
                                <div className='h-80 overflow-y-auto '>
                                    {tasks.map((task, index) => (
                                        <div className='px-2'>
                                            <div key={index} className='relative rounded-lg border-b-2 border-blue-950 flex items-center w-full py-2 m-auto hover:border-blue-500 ' style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}>
                                            <div className='absolute top-0 left-0 pt-5 px-4'>
                                                {task.status ? (
                                                    <button onClick={() => { completeTasks(index); setCountCompleted(countCompleted - 1); }} ><CiCircleCheck size={20} color='green' /></button>
                                                ) : (
                                                    <button onClick={() => { completeTasks(index); setCountCompleted(countCompleted + 1); }}><FaRegCircle size={18} /></button>
                                                )}
                                            </div>
                                            <div className=' w-full p-4 py-2 px-12 rounded-md overflow-x-hidden'>
                                                {task.status ? <del>{task.task}</del> : task.task}
                                            </div>
                                            <div className='ms-1 pe-2 pt-3'>
                                                <button onClick={() => { deleteTask(index); }} className='hover:text-blue-500' ><MdDelete size={20} /></button>
                                            </div>
                                        </div>
                                        </div>
                                    ))}
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Taskstodo;

