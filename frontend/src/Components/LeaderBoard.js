import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CounterContext } from '../Context/CounterContext';
import { useEffect } from 'react';
import { BiSolidCoinStack } from "react-icons/bi";

function LeaderBoard() {

  const { quizId } = useParams();

  const [leaderBoard,setLeaderBoard] = useState([])
  

  async function getLeaderBoardScores(){
    try {
        console.log("here",quizId);
      let res = await axios.get(`http://localhost:3000/quizapi/${quizId}/leaderboard`);
      if (res.data.message === "leaderboard found") {
        //sort and set based on scores
        res.data.leaderboard.sort((a, b) => b.score - a.score);
        setLeaderBoard(res.data.leaderboard);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again later...");
    }
  }

  useEffect(() => {
    getLeaderBoardScores(); // Call function to fetch leaderboard data
  }, [quizId]); // Dependency array: run when quizId changes

  return (
    <div>
        <div className='h-screen pt-20 w-full  bg-zinc-900'>
        <h1 className='text-white text-center font-bold text-3xl mb-8'>Leaderboard</h1>
        {
          leaderBoard.length > 0 ? (
            <div className='text-white'>
              <div className='w-3/6 m-auto' >
              <div className=' w-full'  style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}>
                <div className=' w-full'>
                    <div className='flex justify-between w-full border border-blue-950 px-2 py-2 rounded-lg'>
                        <div className='text-xl font-bold ms-2'>Rank</div>
                        <div className='text-xl font-bold'>Username</div>
                        <div className='text-xl font-bold me-2'>Score</div>
                    </div>
                </div>
                <div className='w-full h-96 overflow-y-auto '>
                    {
                        leaderBoard.map((user,index) => (
                            <div key={index} className='flex justify-between w-full border border-blue-950 py-1 px-2 rounded-lg'>
                                    <div className=' ms-5 text-lg'>{index+1}</div>
                                    <div className=' text-lg'>{user.username}</div>
                                    <div className='  text-lg flex items-center'>{user.score *10} <BiSolidCoinStack className='ms-1' /> </div>
                            </div>
                        ))
                        
                    }
                    {leaderBoard.length < 10 &&
                    Array.from({ length: 10 - leaderBoard.length }).map((_, index) => (
                        <div
                        key={`empty-row-${index}`} // Use a unique key for each element
                        className="flex justify-between w-full border border-blue-950 py-4 px-2"
                        >
                        </div>
                    ))}
                </div>
              </div>
              </div>
            </div>
          ) : (
            <div>
              <h1 className='text-white text-center font-bold text-2xl mb-8'>No Scores Yet</h1>
            </div>
          )
        }
        </div>
    </div>
  )
}

export default LeaderBoard