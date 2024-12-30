import CommentShow from '@/components/comments/comment-show';
import { fetchCommentsByPostId } from '@/db/queries/comments';
import { Suspense } from 'react';
import { CommentShowSkeleton } from './comment-show-loading';

interface CommentListProps {
  postId: string;
}

export default async function CommentList({ postId }: CommentListProps) {
  const comments = await fetchCommentsByPostId(postId);

  const topLevelComments = comments.filter((comment) => comment.parentId === null);
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <Suspense fallback={<CommentShowSkeleton />} key={comment.id}>
        <CommentShow key={comment.id} commentId={comment.id} postId={postId} />
      </Suspense>
    );
  });

  return (
    <div className="space-y-3 mx-12 pt-4">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
