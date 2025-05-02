export default function Message({ user, message }) {
  return (
    <>
      <div className={`flex ${message.sender === user && 'justify-end'}`}>
        <div className='max-w-2/3 rounded-md border bg-slate-300'>
          <div className='px-2 font-bold text-slate-950 italic'>
            {message.sender}
          </div>

          <div className='flex flex-wrap items-end justify-between'>
            <div className='px-2 font-medium text-slate-900'>
              {message.content}
            </div>

            <div className='px-2 font-light text-slate-900/70'>
              {message.time}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
