import React, { useState } from 'react'
import { update, changePassword } from '../Firebase'
import { useSelector } from 'react-redux'
import { setUserData } from '../utils/utils'

function UpdateProfile() {

    const { user } = useSelector(state => state.auth)
    const [displayName, setDisplayName] = useState(user.displayName || "")
    const [photoURL, setPhotoURL] = useState(user.photoURL || "")
    const [newPassword, setNewPassword] = useState("")

    const handleSubmit = async e => {
        e.preventDefault();
        await update({
            displayName,
            photoURL,
        });
        setUserData();
    }

    const handleResetPassword = async e => {
        e.preventDefault();
        await changePassword(newPassword);
        setNewPassword("")
    }

    return (
        <>
            <form className='gap-y-4 py-0' onSubmit={handleSubmit}>
                <h1 className='text-x1 font-bold font-italic mb-4'>Profili Güncelle</h1>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>First Name - Last Name</label>
                    <div className='mt-1'>
                        <input
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            type="text"
                            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bloack w-full sm:text-sm border-gray-300 rounded-md'
                            placeholder='Name' />
                    </div>

                    <label className='block text-sm font-medium text-gray-700 mt-5'>Avatar</label>
                    <div className='mt-1'>
                        <input
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            type="text"
                            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bloack w-full sm:text-sm border-gray-300 rounded-md'
                            placeholder='Avatar Url' />
                    </div>

                </div>

                <div className='my-4'>
                    <button
                        type='submit'
                        className="select-none bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Güncelle
                    </button>
                </div>

            </form>

            <form onSubmit={handleResetPassword} className='gap-y-4'>
                <label className='block text-sm font-medium text-gray-700 mt-5'>Password</label>
                <div className='mt-1'>
                    <input
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        type="password"
                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bloack w-full sm:text-sm border-gray-300 rounded-md'
                        placeholder='New Password' />
                </div>

                <button type='submit' disabled={!newPassword}
                    className='select-none text-white disabled:opacity-50 bg-purple-500 hover:bg-purple-700 py-2 px-4 rounded mt-4'>Şifreyi Güncelle</button>
            </form>

        </>
    )
}

export default UpdateProfile