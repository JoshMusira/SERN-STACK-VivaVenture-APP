import { useEffect } from 'react'
import io from 'socket.io-client'

const Inbox = () => {
    const Socket = () => {
        const socket = io.connect("http://localhost:8081")
        socket.on("Data", (data) => {
            console.log(data);
        })
        socket.on("Order", (data) => {
            console.log(data);
        });
        socket.on("product", (data) => {
            console.log(data);
        });
        socket.emit("Client", "I want to buy  Samsung")
    }
    useEffect(() => {
        Socket
    }, [])
    return (
        <div>
            <h1>Inbox Socket.io</h1>
        </div>
    )
}

export default Inbox