

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaRegCircle } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { CounterContext } from "../Context/CounterContext";
import { BiSolidCoinStack } from "react-icons/bi";
{
  /* <CiCircleCheck size={20} color='green' /> */
}

function Takequiz() {

  let { user, setUser } = React.useContext(CounterContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [quiz, setQuiz] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizId, setQuizId] = useState('');
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizDone, setQuizDone] = useState(false);
  const [circle, setCircle] = useState(null);
  const [leaderBoard,setLeaderBoard] = useState([]);

  useEffect(() => {
    // Log quiz only after it changes
    console.log("Updated quiz:", quiz);
    console.log("Updated quiz length:", quiz.length);
  }, [quiz]);

  async function formSubmit(data) {
    setQuizId(data.quizid)
    try {
      let res = await axios.get(
        `http://localhost:3000/quizapi/quiz/${data.quizid}`
      );
      if (res.data.message === "quiz found") {
        // Assuming res.data.quiz is the array of questions
        setQuiz(res.data.quiz);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
      alert("An error occurred. Please try again later...");
    }
  }

  function insertuserAnswers(questionIndex, option) {
    for (let i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i].questionIndex === questionIndex) {
        userAnswers[i].option = option;
        console.log(userAnswers);
        return;
      }
    }
    console.log(userAnswers);
    setUserAnswers([...userAnswers, { questionIndex, option }]);
  }

  function eraseInsertedAnswers(questionIndex) {
    for (let i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i].questionIndex === questionIndex) {
        userAnswers[i].option.option = null;
        console.log(userAnswers);
        return;
      }
    }
  }

  async function evaluateQuiz() {

    console.log("evaluating user answers ",userAnswers);

    let score = 0;

    for (let i = 0; i < userAnswers.length; i++) {
      console.log("here");
      if (
        quiz[userAnswers[i].questionIndex].answer === userAnswers[i].option.option
      ) {
        score+=1;
        console.log(quiz[userAnswers[i].questionIndex].answer);
      }
    }
    setQuizDone(true);
    setScore(score)
    

    console.log("score",score)

    //send backend request to submit quiz
    try {
      console.log("score",score)
      let res = await axios.post("http://localhost:3000/quizapi/quiz/submit", {
        username: user.username,
        quizid: quizId,
        score: score,
      });
      if (res.data.message === "Quiz submitted successfully") {
        // alert("Quiz submitted successfully");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert("from An error occurred. Please try again later...");
    }

    getLeaderBoardScores();

  }

  //write a function for leaderboardscores

  async function getLeaderBoardScores(){
    try {
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

  return (
    <div>
      <div className="h-screen bg-zinc-900">
        <div className="w-4/5 m-auto px-10 py-8">
          {quiz.length > 0 ? (
            quizDone ? (
              <div>
                <div className="text-white mt-20 p-4 pb-5 text-center mx-auto w-3/5 border-b-2 border-blue-950 rounded-lg" style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}>
                  <h1 className="" >
                    <div className="text-3xl mb-4" >Your score is {score*10}/{quiz.length*10}</div>
                    <button className="text-lg border-b-2 border-blue-950 rounded-lg px-5 me-7 hover:text-blue-500 hover:border-blue-500 " style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}} onClick={() => {setQuizDone(false); setQuizIndex(0); setScore(0); setUserAnswers([])}} >Retake Quiz</button>
                    <button className="text-lg border-b-2 border-blue-950 rounded-lg px-5 hover:text-blue-500 hover:border-blue-500 " style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}} onClick={() => {setQuizDone(false); setQuizIndex(0); setScore(0); setUserAnswers([]); setQuiz([])}}  >Try Another quiz</button>
                  </h1>
                </div>
                <div>
                  {
                    leaderBoard.length > 0 ? (
                      <div className="text-white mt-5 p-4 pb-5 text-center mx-auto w-4/5 border-b-2 border-blue-950 rounded-lg" style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}>
                        <h1 className="" >
                          <div className="text-3xl mb-4" >Leaderboard</div>
                        </h1>
                        <div className="text-lg h-72 overflow-y-auto ">
                          <table className="w-full  " >
                            <thead className="sticky top-0 bg-zinc-900 backdrop-blur-md " >
                              <tr className="">
                                <th>Rank</th>
                                <th>Username</th>
                                <th>Score</th>
                              </tr>
                            </thead>
                            <tbody className=" " >
                              {
                                leaderBoard.map((user, index) => (
                                  <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{user.username}</td>
                                    <td className="flex justify-center items-center">{user.score*10} <BiSolidCoinStack/></td>
                                  </tr>
                                ))
                              }
                            </tbody>
                          </table>

                        </div>
                      </div>
                    ) : null
                  }
                </div>
              </div>
            ) : (
              <div className="text-white mt-28  p-7 border-b-2 border-blue-950 rounded-[20px] " style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}} onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "rgb(38, 57, 77) 0px 30px 40px -10px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "rgb(38, 57, 77) 0px 20px 30px -10px";
              }}>
                <h4 className="text-xl " >{quizIndex+1}. {quiz[quizIndex].question}</h4>

                {/* Iterate over the array of options for the current question */}
                <ul className="pt-2">
                  {quiz[quizIndex].options.map((option, index) => (
                    <li key={index} className="p-2 ps-0 text-lg">
                      <div className="inline">
                        {circle === index ? (
                          <CiCircleCheck
                            size={24}
                            onClick={() => {
                              setCircle(null);
                              eraseInsertedAnswers(quizIndex);
                            }}
                            className="inline me-2 hover:text-blue-500 cursor-pointer"
                          />
                        ) : (
                          <FaRegCircle
                            size={18}
                            onClick={() => {
                              setCircle(index);
                              insertuserAnswers(quizIndex, { option });
                            }}
                            className="inline me-2 hover:text-blue-500 cursor-pointer"
                          />
                        )}
                        <div className="inline hover:text-blue-500 cursor-pointer" onClick={() => {insertuserAnswers(quizIndex, { option });circle === index ? setCircle(null) : setCircle(index)}} >
                          {option}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Navigation buttons to switch between questions */}
                <div className="mt-4">
                  <button
                    className="mr-5 border-b-2 border-blue-950 px-4 py-1 rounded-md text-white hover:border-blue-500 hover:text-blue-500"
                    style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}
                    onClick={() =>
                      setQuizIndex((prevIndex) => Math.max(prevIndex - 1, 0))
                    }
                    disabled={quizIndex === 0}
                  >
                    Previous
                  </button>
                  {quizIndex === quiz.length - 1 ? (
                    <button
                      className="border-b-2 border-blue-950 px-4 py-1 rounded-md text-white hover:border-blue-500 hover:text-blue-500"
                      style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}
                      onClick={() => evaluateQuiz()}
                    >
                      End quiz
                    </button>
                  ) : (
                    <button
                      className="border-b-2 border-blue-950 px-4 py-1 rounded-md text-white hover:border-blue-500 hover:text-blue-500"
                      style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}
                      onClick={() =>
                      {
                        setQuizIndex((prevIndex) => prevIndex + 1);
                        setCircle(null);
                      }
                      }
                      disabled={quizIndex === quiz.length - 1}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            )
          ) : (
            <div className="w-3/5 m-auto mt-32 ">
              <form onSubmit={handleSubmit(formSubmit)}>
                <input
                  className="block rounded-lg ps-2 p-1 mb-3 border-b-2 border-blue-950  focus:border-blue-500 focus:outline-none w-full py-1 text-white bg-black"
                  type="text"
                  placeholder="enter quiz id"
                  style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}
                  {...register("quizid", { required: true })}
                />
                <button className="border-b-2 border-blue-950 text-xl px-8 py-1 mt-4 rounded-md text-white hover:border-blue-500 hover:text-blue-500" style={{boxShadow:"rgb(38, 57, 77) 0px 20px 30px -10px"}}>
                  Start quiz
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Takequiz;
