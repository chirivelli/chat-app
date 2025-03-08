import { useEffect, useState } from 'react'

export default function ChatList({ user, socket }) {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      setTimeout(() => {
        setUsers([
          { id: 'user1', name: 'Alice' },
          { id: 'user2', name: 'Bob' },
          { id: 'user3', name: 'Charlie' },
        ])
      }, 1000)
    }
    fetchUsers()
    return () => {}
  })

  const handleUserClick = (userId) => {
    console.log(`User ${userId} clicked`)
  }

  const filteredUsers = users.filter((userItem) =>
    userItem.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className='h-full w-1/3 overflow-y-auto bg-slate-800'>
      <div className='border-b border-slate-700 p-4'>
        <h2 className='text-lg font-semibold text-white'>Chats</h2>
        <input
          type='text'
          placeholder='Search chats...'
          className='mt-2 w-full rounded-md bg-slate-700 p-2 text-slate-100 focus:outline-none'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul>
        {filteredUsers.length === 0 && searchTerm !== '' && (
          <p className='p-4 text-center text-white'>No users found.</p>
        )}
        {filteredUsers.map((userItem) => (
          <li
            key={userItem.id}
            className='cursor-pointer p-4 hover:bg-slate-700'
            onClick={() => handleUserClick(userItem.id)}
          >
            <div className='flex items-center gap-2'>
              <div className='size-10 rounded-full bg-gray-600'></div>
              <span className='text-white'>{userItem.name}</span>
            </div>
          </li>
        ))}
        {users.length === 0 && (
          <p className='p-4 text-center text-white'>Loading chats...</p>
        )}
      </ul>
    </div>
  )
}
