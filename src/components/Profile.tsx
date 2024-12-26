'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

const Profile = () => {
  const session = useSession();

  if (session.data?.user) {
    return <div>From client: user is signed in</div>;
  }
  return <div>From client: user is signed out</div>;
};

export default Profile;
