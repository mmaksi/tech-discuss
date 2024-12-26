'use server';

import * as auth from '@/auth';

export async function signOut() {
  await auth.signOut();
}

export async function signIn() {
  await auth.signIn('github');
}
