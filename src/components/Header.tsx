'use client';

import Image from 'next/image';
import React, { Suspense } from 'react';
import { ModeToggler } from './toggler';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { LogIn } from 'lucide-react';
import * as actions from '@/actions';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Link from 'next/link';
import { SearchInput } from './search-input';

const Header = () => {
  const session = useSession(); // Checks the server NOT cookies for session
  const { theme } = useTheme();

  let authContent: React.ReactNode;
  if (session.status === 'loading') {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src={session.data?.user?.image || ''} />
            <AvatarFallback>{session.data?.user?.name}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-auto flex flex-col gap-2">
          <p className="font-semibold">{session.data?.user?.name}</p>
          <form action={actions.signOut}>
            <Button variant="destructive" type="submit">
              <LogIn />
              Log Out
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <div className="flex gap-4 items-center">
        <form action={actions.signIn}>
          <Button variant="default" type="submit">
            <LogIn />
            Log In
          </Button>
        </form>

        <form action={actions.signIn}>
          <Button variant="outline" type="submit">
            Register
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex justify-between h-[6rem]">
      <div className="flex gap-4 items-center">
        <Link href="/">
          {theme === 'dark' ? (
            <Image src="/dark-logo.png" alt="logo" width={150} height={150} />
          ) : (
            <Image src="/light-logo.png" alt="logo" width={150} height={150} />
          )}
        </Link>
        <Suspense>
          <SearchInput type="text" placeholder="Search..." />
        </Suspense>
      </div>
      <div className="flex gap-4 items-center">
        <span>{authContent}</span>
        <ModeToggler />
      </div>
    </div>
  );
};

export default Header;
