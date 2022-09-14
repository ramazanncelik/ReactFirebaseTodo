import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Home from './pages/Home'
import Register from './pages/Register';
import Login from './pages/Login';
import Modal from './components/Modal';
import { useSelector } from 'react-redux';
import Settings from './pages/Settings';
import ResetPassword from './pages/ResetPassword';

function App() {

  const { open, data } = useSelector(state => state.modal)

  return (
    <>
      <Toaster position='top-left' />
      {open && <Modal name={open} data={data} />}
      <div className='max-w-4xl mx-auto py-5'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
    </>
  );
}

export default App;