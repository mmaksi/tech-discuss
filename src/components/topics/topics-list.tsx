import React from 'react';
import { db } from '@/db';
import paths from '@/paths';
import Link from 'next/link';

const TopicsList = async () => {
  const topics = await db.topic.findMany();

  const topicsList = topics.map((topic) => {
    return (
      <div key={topic.id}>
        <Link href={paths.topicShow(topic.slug)}>
          <div className="text-sm cursor-pointer bg-blue-500 hover:bg-blue-700 text-white rounded-2xl px-3 py-1">
            {topic.slug}
          </div>
        </Link>
      </div>
    );
  });

  return <div className="flex flex-row flex-wrap gap-2">{topicsList}</div>;
};

export default TopicsList;
