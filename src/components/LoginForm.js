import React from 'react'
import { Link } from "react-router-dom"

function LoginForm({ navigate, handleSubmit, email, setEmail, password, setPassword, yesEmail }) {

    return (
        <>
            <form className='max-w-xl mx-auto grid gap-y-4 my-4' onSubmit={handleSubmit}>

                <div>
                    {yesEmail &&
                        <>
                            <label className='block text-sm font-medium text-gray-700'>E-posta</label>

                            <div className='mt-1'>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bloack w-full sm:text-sm border-gray-300 rounded-md'
                                    placeholder='E-mail Adresi' />
                            </div>
                        </>
                    }
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

                {yesEmail &&
                        <Link to='/resetpassword' class="text-sm font-medium text-pink-900">Şifremi Unuttum</Link>
                }

                <div>
                    <button
                        type='submit'
                        disabled={yesEmail ? !email || !password : !password}
                        class={"bg-blue-500 disabled:opacity-30 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>
                        {yesEmail ? "Giriş Yap" : "Yeniden Yetkilendirme"}
                    </button>

                    <button
                        onClick={() => {
                            navigate('/register', {
                                replace: true
                            })
                        }}
                        class={"bg-orange-500 mx-2 disabled:opacity-30 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"}>
                        Kayıt Ol
                    </button>
                </div>


            </form>

        </>
    )
}

export default LoginForm