import PostCreateForm from '@/components/posts/post-create-form';

interface TopicShowPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = await params;

  return (
    <div className="grid grid-cols-4 gap-4 py-4 min-h-[calc(100vh-6rem)]">
      <div className="col-span-3">
        <h1 className="text-xl font-bold">{slug}</h1>
      </div>

      <div className="ms-auto w-[70%] border shadow py-3 px-2 max-h-[100%] overflow-y-auto flex flex-col">
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}
