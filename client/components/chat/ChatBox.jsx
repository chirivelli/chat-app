import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import Message from '@/components/chat/Message'

export default function ChatBox({ user, socket }) {
  const [input, setInput] = useState('')
  const [chat, setChat] = useState([])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input) return

    const currTime = new Date().toLocaleTimeString()

    const message = {
      sender: user,
      type: 'text',
      content: input,
      time: currTime,
    }

    console.log(message)

    setChat((prev) => [...prev, message])
    socket.emit('push_message', message)

    setInput('')
  }

  useEffect(() => {
    socket.on('pull_message', (message) => {
      setChat((prev) => [...prev, message])
    })
    return () => {
      socket.off('pull_message')
    }
  })

  return (
    <div className='flex grow flex-col justify-between bg-slate-700'>
      <div className='flex flex-col gap-2 overflow-auto scroll-smooth rounded-md p-4'>
        {chat.map((message, index) => (
          <Message key={index} message={message} user={user} />
        ))}
      </div>

      <div className='flex gap-2 bg-slate-600 p-4'>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(e)}
          type='text'
          className='bg-slate-300'
          placeholder='Type message here...'
        />
        <Button onClick={(e) => handleSend(e)} className='hover:bg-slate-800'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-send-horizontal size-6 stroke-slate-200'
          >
            <path d='M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z' />
            <path d='M6 12h16' />
          </svg>
        </Button>
      </div>
    </div>
  )
}
