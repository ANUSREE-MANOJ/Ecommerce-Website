import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navigation from './pages/Auth/Navigation'
import { Outlet } from 'react-router'

function App() {
  return (
    <div className=''>
      <ToastContainer/>
      <Navigation/>
      <main className='py-3 w-full h-screen '>
        <Outlet/>
      </main>
    </div>
  )
}

export default App
