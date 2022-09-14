import React, { useState } from 'react'
import { register } from '../Firebase'
import {useNavigate} from 'react-router-dom'

function Register() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();
        const user = await register(email, password);
        console.log(user)
        setEmail("");
        setPassword("");

    }

    return (
        <>
            <form className='max-w-xl mx-auto grid gap-y-4 py-4' onSubmit={handleSubmit}>

                <div>

                    <label className='block text-sm font-medium text-gray-700'>E-posta</label>
                    <div className='mt-1'>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bloack w-full sm:text-sm border-gray-300 rounded-md'
                            placeholder='E-mail Adresi' />
                    </div>

                    <label className='block text-sm font-medium text-gray-700'>Password</label>
                    <div className='mt-1'>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bloack w-full sm:text-sm border-gray-300 rounded-md'
                            placeholder='******' />
                    </div>

                </div>


                <div>
                    <button
                        type='submit'
                        disabled={!email || !password}
                        class={"bg-blue-500 disabled:opacity-30 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>
                        Kayıt Ol
                    </button>

                    <button
                        onClick={() => {
                            navigate('/login', {
                                replace: true
                            })
                        }}
                        class={"bg-orange-500 mx-2 disabled:opacity-30 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"}>
                        Giriş Yap
                    </button>
                </div>


            </form>
        </>

    )
}

export default Register