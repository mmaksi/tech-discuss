import PostList from '@/components/posts/post-list';
import TopicCreateForm from '@/components/topics/topic-create-form';
import TopicsList from '@/components/topics/topics-list';
import { fetchTopPosts } from '@/db/queries/posts';

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 py-4 min-h-[calc(100vh-6rem)]">
      <div className="col-span-3">
        <h1 className="text-xl font-bold">Top Posts</h1>
        <PostList fetchData={() => fetchTopPosts()} />
      </div>
      <div className="ms-auto w-[70%] border shadow py-3 px-2 max-h-[100%] overflow-y-auto flex flex-col">
        <TopicCreateForm />
        <div className="border-t my-2"></div>
        <h3 className="text-center mb-1 mt-4 font-bold">Topics</h3>
        <TopicsList />
      </div>
    </div>
  );
}
