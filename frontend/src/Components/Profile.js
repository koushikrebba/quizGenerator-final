import React, { useState, useContext, useEffect } from 'react';
import { CounterContext } from '../Context/CounterContext';
import { FaUserLarge } from "react-icons/fa6";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import { BiSolidCoinStack } from "react-icons/bi";
import { PiCoinVerticalFill } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

function Profile() {
    let { user, setUser } = useContext(CounterContext);

    let navigate = useNavigate();

    let { register, handleSubmit } = useForm();
    
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalScore, setTotalScore] = useState(0);

    useEffect(() => {
        // Ensure user and user.username are defined before making the request
        if (user) {
            const fetchQuizzes = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/quizapi/solvedquizzes/${user.username}`);
                    response.data.quizzes.sort((a, b) => b.score - a.score);
                    setQuizzes(response.data.quizzes);
                    calculateScore(response.data.quizzes);
                    setLoading(false);
                } catch (err) {
                    setError(err);
                    setLoading(false);
                }
            };
            fetchQuizzes();
        }
    }, [user]);
    if (!user) return null; // If user is not defined, don't render the component


    const calculateScore = (quizzes) => {
        let score = 0;
        for (let i = 0; i < quizzes.length; i++) {
            score += quizzes[i].score*10;
        }
        setTotalScore(score);
    }



    return (
        <div className='h-screen bg-[#0F1214] text-white'>
            <div className='flex justify-center items-center pt-10 '>
                <div>
                    <div className='border border-[#0F1214] inline-block p-8 rounded-full' style={{boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px"}} >
                        <FaUserLarge size={100} />
                    </div>
                    <div>
                        <div className='text-2xl font-bold pt-2 text-center flex items-center justify-center' >
                            {user.username} 
                        </div>
                        <h4 className='text-center mt-1'>{user.email}</h4>
                    </div>
                </div>
            </div>
            <div className='pt-5'>
                        {
                            loading ? (
                                <div className='mt-4 flex'>
                                    <div className='mx-auto flex items-center'>
                                        <img className='' src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" width={70} alt="" />
                                        <h5 className='ms-2 text-xl'>Fetching data...</h5>
                                    </div>
                                </div>
                            ):(
                                <div className=''>
                                    {
                                        quizzes.length?(
                                            <div>
                                                <div className='flex w-3/6 m-auto justify-between items-center mb-2'>
                                                    <h1 className='ms-4 rounded-lg border-b-2 border-blue-950 px-2 py-1 hover:border-blue-500 hover:text-blue-500' style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}>Solved Quizzes : {quizzes.length}</h1>
                                                    <div className='flex items-center me-4 rounded-lg border-b-2 border-blue-950 px-2 py-1 hover:border-blue-500 hover:text-blue-500'>
                                                        <h1 className='' style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}>Total Score : {totalScore}</h1>
                                                        <FaStar className='ms-3 text-lime-400' />
                                                        {/* <BiSolidCoinStack className='ms-3' /> */}
                                                        {/* <PiCoinVerticalFill className='ms-3 ' /> */}
                                                    </div>
                                                </div>
                                                <div className='w-3/6 m-auto mt-4 h-52 overflow-y-auto'>
                                                    <div className='w-full m-auto py-2 border rounded-lg border-blue-950'>
                                                        {
                                                            quizzes.map((quiz,index) => (
                                                                <div key={index} className=''>
                                                                    
                                                                    <div className='flex justify-between mx-2 px-1 py-2 border-b-2 rounded-lg border-blue-950 hover:border-blue-500 hover:text-blue-500' style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}>
                                                                        <div className='flex'>
                                                                            {index+1}.
                                                                            <h3 className='ps-3'>{quiz.quizId}</h3>
                                                                        </div>
                                                                        <div className='flex items-center'>
                                                                            <h3 className=''>{quiz.score*10}</h3>
                                                                            {/* <FaStar className='ms-1 text-lime-400' /> */}
                                                                            {/* <PiCoinVerticalFill className='ms-1 ' /> */}
                                                                            <BiSolidCoinStack className='ms-1' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>    
                                        ):(
                                            <div>
                                                <h4 className='text-center text-xl font-bold'>No Quizzes Solved yet!</h4>
                                                <button className='block mx-auto px-3 py-1 text-xl mt-5 border-b-2 border-blue-950 rounded-lg hover:border-blue-500 hover:text-blue-500' onClick={() => navigate('/takequiz')} style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}>Take a Quiz</button>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
            </div>
        </div>
    );
}

export default Profile;
