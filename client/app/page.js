'use client'
import { io } from 'socket.io-client'
import { useRef, useState } from 'react'
import { LoginForm } from '@/components/chat/login-form'
import ChatBox from '@/components/chat/ChatBox'

const socket = io('http://localhost:8000')

export default function Home() {
  const user = useRef(null)
  const [username, setUsername] = useState('')

  return (
    <div className='mx-auto flex h-screen max-h-screen max-w-screen flex-col items-center justify-center bg-slate-800'>
      {user.current ? (
        <ChatBox user={user.current} socket={socket} />
      ) : (
        <LoginForm
          socket={socket}
          user={user}
          username={username}
          setUsername={setUsername}
        />
      )}
    </div>
  )
}
