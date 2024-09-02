
import { useState } from 'react'
import './App.css'
import Login from './Login'
import ChatHome from './ChatHome';

function App() {
  const [userId,setUserId] = useState('');
  return (
    <>
      {!userId && <Login setUserId={setUserId}/>}
      {userId && <ChatHome userId={userId}/>}
    </>
  )
}

export default App
