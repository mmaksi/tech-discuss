import PostList from '@/components/posts/post-list';
import { fetchPostsBySearchTerm } from '@/db/queries/posts';
import { redirect } from 'next/navigation';
import React from 'react';

interface SearchPageProps {
  searchParams: Promise<{
    term: string;
  }>;
}

const page = async ({ searchParams }: SearchPageProps) => {
  const { term } = await searchParams;

  if (!term) redirect('/');

  return (
    <div>
      <PostList fetchData={() => fetchPostsBySearchTerm(term)} />
    </div>
  );
};

export default page;
