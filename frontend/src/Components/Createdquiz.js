
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CounterContext } from '../Context/CounterContext';
import './Createdquiz.css'
import { useNavigate } from 'react-router-dom';

function Createdquiz() {
    const { user } = React.useContext(CounterContext);
    const navigate = useNavigate();

    console.log("user",user)

    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);





    useEffect(() => {
        // Ensure user and user.username are defined before making the request
        if (user) {
            const fetchQuizzes = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/quizapi/quizzes/${user.username}`);
                    setQuizzes(response.data.quizzes);
                    setLoading(false);
                } catch (err) {
                    setError(err);
                    setLoading(false);
                }
            };
            fetchQuizzes();
        }
    }, [user]);

    if (!user) {
        return <div>Loading user information...</div>;
    }

    // // Handle loading and error states
    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message}</div>;


    const navigateToLeaderboard = (quizId) => {
        navigate(`/leaderboard/${quizId}`);
    };

    return (
        <div>

                <div className='h-screen pt-20 w-full  bg-zinc-900'>
                    <div className='w-3/6 m-auto' >
                            <ul className='text-white' >
                                {quizzes.length > 0 ? ( 
                                    <div>
                                        <h1 className='text-white text-center font-bold text-3xl mb-8'>Quizzes Created</h1>
                                        <h3 className='text-white border-b-2 border-blue-950  inline-block px-4 rounded-lg mb-10 py-1 ' style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}>Total Quizzes: {quizzes.length}</h3>
                                    <div  className='h-96 overflow-y-auto  border-b-2 border-blue-950 rounded-lg px-3 py-3 pb-5' style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}} >
                                    { quizzes.map(quiz => (
                                            <div className='border-b-2  border-blue-950 rounded-lg px-4 py-3 mb-2' style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}> 
                                                <li key={quiz.quizId}>
                                                    <strong>Theme :</strong> {quiz.theme}
                                                    <br />
                                                    <div className='flex justify-between items-center '>
                                                        <div><strong>Quiz ID :</strong> {quiz.quizId}</div>
                                                        <button className='text-white border-b-2 border-blue-950 rounded-lg px-4 py-1 hover:border-blue-500 hover:text-blue-500' onClick={() => navigateToLeaderboard(quiz.quizId)} >View Leaderboard</button>
                                                    </div>
                                                </li>
                                            </div>
                                        ))}
                                    </div>
                                    </div>
                                ) : (
                                    <div className='' >
                                        <h1 className='text-center text-4xl  decoration-8 font-bold'>No quizzes found ! </h1>
                                        <p className='mt-10' >Create your own quiz and share your knowledge! Pick a theme, generate questions, and challenge your friends. Start now and let the fun begin!</p>
                                        <a href="/createquiz"><button className='px-12 mt-5 text-xl  text-white border-b-2 border-blue-950 rounded-lg px-4 py-1 hover:border-blue-500 hover:text-blue-500' style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}} >Create a quiz</button></a>
                                    </div>
                                )}
                            </ul>
                    </div>
                </div>




            
        </div>
    );
}

export default Createdquiz;
