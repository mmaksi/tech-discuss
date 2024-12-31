import { db } from '@/db';
import { Post } from '@prisma/client';

export type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

export async function fetchPostsByTopicSlug(slug: string): Promise<PostWithData[]> {
  return await db.post.findMany({
    where: {
      topic: { slug },
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}

export async function fetchTopPosts() {
  return await db.post.findMany({
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
    orderBy: [{ comments: { _count: 'desc' } }],
    take: 10,
  });
}

export async function fetchPostsBySearchTerm(term: string): Promise<PostWithData[]> {
  return await db.post.findMany({
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
    where: {
      OR: [{ title: { contains: term } }, { content: { contains: term } }],
    },
  });
}
