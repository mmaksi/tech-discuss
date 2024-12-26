import * as actions from '@/actions';
import { auth } from '@/auth';
import Profile from '@/components/Profile';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <form action={actions.signIn}>
        <Button type="submit">Sign In</Button>
      </form>

      <form action={actions.signOut}>
        <Button type="submit">Sign Out</Button>
      </form>

      {session?.user ? (
        <div>
          <div>User</div>
          <div>From server: {JSON.stringify(session.user)}</div>
        </div>
      ) : (
        <div>From server: user is signed out</div>
      )}

      <Profile />
    </div>
  );
}
