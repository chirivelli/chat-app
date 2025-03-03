import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function ChatBox({ user, socket }) {
  const [input, setInput] = useState('')
  const [chat, setChat] = useState([])

  const handleSend = (e) => {
    e.preventDefault()

    setChat((prev) => [...prev, { sender: user, type: 'text', content: input }]) // add if server sends!!

    socket.emit('push_message', { sender: user, type: 'text', content: input })

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
    <div className='flex flex-col gap-2'>
      <div className='flex h-100 flex-col gap-2 rounded-md border p-2'>
        {chat.map((message, index) => (
          <p
            key={index}
            className={`flex ${message.sender === user && 'justify-end'}`}
          >
            <span className='rounded border bg-slate-900 px-3 py-1 text-slate-100'>
              {message.sender} : {message.content}
            </span>
          </p>
        ))}
      </div>

      <div className='flex gap-2'>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(e)}
          type='text'
          placeholder='Type message here...'
        />
        <Button onClick={(e) => handleSend(e)}>Send</Button>
      </div>
    </div>
  )
}
