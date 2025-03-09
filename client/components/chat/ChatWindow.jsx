import ChatBox from '@/components/chat/ChatBox'

export default function ChatWindow({ user, socket }) {
  return (
    <div className='flex size-19/20'>
      {/*<ChatList />*/}
      <ChatBox user={user} socket={socket} />
    </div>
  )
}
