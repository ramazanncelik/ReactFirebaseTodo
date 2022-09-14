import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { changePasswordWithEmail } from '../Firebase'

function ResetPassword() {

    const [email, setEmail] = useState("");

    const handleSubmit = async e => {

        e.preventDefault();
        await changePasswordWithEmail(email);
        setEmail("");
    }

    return (
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

            </div>

            <div>
                <button
                    type='submit'
                    disabled={!email}
                    className={"bg-blue-500 disabled:opacity-30 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>
                    Maili Al
                </button>

                <Link to='/login'
                    className={"bg-green-500 mx-2 disabled:opacity-30 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"}>
                    Giriş Yap
                </Link>

                <Link to='/register'
                    className={"bg-orange-500 mx-2 disabled:opacity-30 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"}>
                    Kayıt Ol
                </Link>

            </div>

        </form>
    )
}

export default ResetPassword