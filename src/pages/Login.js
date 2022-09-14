import React, { useState } from 'react'
import { login } from '../Firebase'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm';

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();
        const user = await login(email, password);

        if (user) {
            setEmail("");
            setPassword("");
            navigate('/', {
                replace: true
            })
        }

    }

    return (
        <>
            <LoginForm navigate={navigate} handleSubmit={handleSubmit} email={email} setEmail={setEmail} password={password} setPassword={setPassword} yesEmail={true} />
        </>
    )

}

export default Login