import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import RootLayout from './Components/RootLayout/RootLayout'
import Register from './Components/Register'
import Login from './Components/Login'
import Home from './Components/Home'
import Taskstodo from './Components/Taskstodo'
import Createquiz from './Components/Createquiz'
import Takequiz from './Components/Takequiz'
import Createdquiz from './Components/Createdquiz'
import LeaderBoard from './Components/LeaderBoard'
import Profile from './Components/Profile'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout/>,
      children:[
        {
          path: '/',
          element: <Login/>
        },
        {
          path: '/register',
          element: <Register/>
        },
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: '/home',
          element: <Home/>
        },
        {
          path: '/taskstodo',
          element: <Taskstodo/>
        },
        {
          path:'/createquiz',
          element: <Createquiz/>
        },
        {
          path: '/takequiz',
          element: <Takequiz/>
        },
        {
          path: '/createdquiz',
          element: <Createdquiz/>
        },
        {
          path: '/leaderboard/:quizId',
          element: <LeaderBoard/>
        },
        {
          path:'/profile',
          element: <Profile/>
        }
      ]
    }
  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App