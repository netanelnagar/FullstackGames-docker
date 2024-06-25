import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { User } from '../userArea/User/User'

export default function UserPage() {
    return (
        <div className='full'>
            <Routes>
                <Route path='' element={<User/>}/>
            </Routes>
        </div>
    )
}
