'use server';

import { redirect } from 'next/navigation';

export async function searchFrom(formData: FormData) {
  const term = formData.get('term');

  if (!term || typeof term !== 'string') {
    return redirect('/');
  }

  redirect(`/search?term=${term}`);
}
