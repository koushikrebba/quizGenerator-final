import React from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'
import { CounterContext } from '../../Context/CounterContext'

function RootLayout() {

  const {user}=React.useContext(CounterContext)

  return (
    <div>
      {
        user ? (
          <div className='flex'>
              <div className='w-2/12'>
              <Navbar/>
              </div>
              <div className='w-10/12'>
              <Outlet/>
              </div>
          </div>
        ):(
          <div>
            <Outlet/>
          </div>
        )
      }
    </div>
  )
}

export default RootLayout