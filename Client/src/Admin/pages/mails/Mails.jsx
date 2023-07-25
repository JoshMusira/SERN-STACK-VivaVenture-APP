import React, { useContext, useState } from 'react'
import Chat from '../../../components/Chat'
import { io } from 'socket.io-client'
import './mails.css'
import { Context } from '../../../context/userContext/Context'
const Mails = () => {
    const { user } = useContext(Context)
    const username = user.username;
    const socket = io.connect("http://localhost:8081")
    // const [username, setUsername] = useState("");


    return (
        <div className='mailsContainer'>
            <h1>Mails</h1>
            <Chat socket={socket} username={username} />
        </div>
    )
}

export default Mails