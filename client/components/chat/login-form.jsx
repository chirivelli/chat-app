import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function LoginForm({ socket, user, username, setUsername }) {
  // const [username, setUsername] = useState('')

  const addUser = (e) => {
    console.log(username)
    user.current = username
    socket.emit('new_user', { username })
    setUsername('')
  }

  return (
    <div className={cn('flex flex-col gap-6')}>
      <Card>
        <CardHeader>
          <CardTitle className='font-bold'>Chat App</CardTitle>
          <CardDescription>Pick a username to join</CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='username'>Username</Label>
                <Input
                  id='username'
                  type='text'
                  placeholder='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className='flex flex-col gap-3'>
                <Button
                  type='submit'
                  className='w-full'
                  disabled={!username}
                  onClick={(e) => addUser(e)}
                  onKeyDown={(e) => username && addUser(e)}
                >
                  Join Chat
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
