import { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import Chat from '../../components/Chat';
import './inbox.css'
import { Context } from '../../context/userContext/Context'
const Inbox = () => {
    const { user } = useContext(Context)
    const [messageReceived, setMessageReceived] = useState("")
    const username = user.username;

    const socket = io.connect("http://localhost:8081")
    socket.on("Data", (data) => {
        // alert(data)
        setMessageReceived(data)
    })
    // console.log(messageReceived);
    // const [message, setMessage] = useState("");
    // const [messageReceived, setMessageReceived] = useState("")
    // const Socket = () => {
    //     socket.emit("Send_message", { message })
    // }
    // useEffect(() => {
    //     socket.on("receive_message", (data) => {
    //         setMessageReceived(data.message)
    //     })
    // }, [socket])

    return (
        <div className="App">

            <Chat socket={socket} username={username} messageReceived={messageReceived} />

        </div>

        // <div className='mailContainer'>
        //  <h1>Messages</h1>
        // {messageReceived}
        // <input type="text" placeholder='Type your message' onChange={(e) => setMessage(e.target.value)} />
        // <button onClick={Socket}>Send</button> 
        // </div>
    )
}

export default Inbox