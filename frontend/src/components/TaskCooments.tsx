import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TASK_COMMENTS } from '../graphql/queries';
import { CREATE_TASK_COMMENT } from '../graphql/mutations';
import { TaskComment } from '../types';

interface Props {
  taskId: string;
  taskTitle: string;
}

const TaskComments: React.FC<Props> = ({ taskId, taskTitle }) => {
  const [content, setContent] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');

  const { loading, error, data, refetch } = useQuery(GET_TASK_COMMENTS, {
    variables: { taskId },
  });

  const [createComment, { loading: creating }] = useMutation(CREATE_TASK_COMMENT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !authorEmail.trim()) return;

    try {
      await createComment({
        variables: {
          taskId,
          content: content.trim(),
          authorEmail: authorEmail.trim(),
        },
      });
      setContent('');
      refetch();
    } catch (err) {
      console.error('Error creating comment:', err);
    }
  };

  const comments: TaskComment[] = data?.taskComments || [];

  return (
    <div className="mt-6 border-t pt-6">
      <h4 className="font-semibold text-gray-900 mb-4">
        Comments ({comments.length})
      </h4>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="space-y-3">
          <input
            type="email"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            placeholder="Your email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            type="submit"
            disabled={creating}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 text-sm"
          >
            {creating ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </form>

      {/* Comments List */}
      {loading ? (
        <div className="text-center py-4 text-gray-500 text-sm">Loading comments...</div>
      ) : error ? (
        <div className="text-red-600 text-sm">Error loading comments</div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-gray-400 text-sm">
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                  {comment.authorEmail[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900 text-sm">
                      {comment.authorEmail}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskComments;