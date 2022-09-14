import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoginForm from '../LoginForm'
import { reAuth } from '../../Firebase'

function ReAuthModal({ close }) {

  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();
    const result = await reAuth(password);
    if (result) {
      setPassword("");
      close()
    }

  }

  return (
    <LoginForm navigate={navigate} handleSubmit={handleSubmit} password={password} setPassword={setPassword} yesEmail={false} />
  )
}

export default ReAuthModal