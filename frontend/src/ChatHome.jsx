import React, { useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { io } from 'socket.io-client';


function ChatHome({userId}) {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  
  const {sendJsonMessage,lastJsonMessage} = 
    useWebSocket(`ws://localhost:8001?userId=${userId}`)

  const sendMessage = () => {
    sendJsonMessage({message,userId})
  }

  useEffect(()=>{
    if(lastJsonMessage){
        setReceivedMessages([...receivedMessages,
            `[${lastJsonMessage.userId}] : ${lastJsonMessage.message}(${lastJsonMessage.timestamp})`]);
    }
  },[lastJsonMessage]);

  

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="flex-auto p-12 px-52">
            <div className="flex mb-4">
                <h2 className="text-2xl font-bold text-white">You have logged in as {userId}</h2>
            </div>
            <div className="flex mb-4">
                {/* Input box for typing message */}
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 rounded-l-lg p-2 focus:outline-none"
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white rounded-r-lg px-4 py-2 ml-2"
                >
                    Send
                </button>
            </div>                
            <div className="bg-white rounded-lg p-4 mb-4 h-2/3">
                {receivedMessages.map((receivedMessage, index) => (
                    <div key={index} className="mb-2">
                        {receivedMessage}
                    </div>
                ))}
            </div>
        </div>
    </div>
);
}

export default ChatHome
