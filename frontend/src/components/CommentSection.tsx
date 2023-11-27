import { FC, useState } from 'react';
import CommentComponent from './CommentComponent';
import CustomButton from './tools/CustomButton';

interface CommentSectionProps {
  comments: Array<Comment>;
  contentID: string;
  onAddComment: (contentID: string, commentText: string) => Promise<void>;
  onRemoveComment: (contentID: string, commentID: string) => void;
  onUpdateComment: (contentID: string, commentID: string, newCommentText: string) => void;
}

const CommentSection: FC<CommentSectionProps> = ({
  comments, contentID, onAddComment, onRemoveComment, onUpdateComment,
}) => {
  const [newCommentText, setNewCommentText] = useState('');

  return (
    <div className="mb-4">
      <div className="flex flex-row gap-2 m-4">
        <h2 className="text-2xl font-bold">Comments</h2>
      </div>
      <div className="p-4 mt-2">
        {comments.map((comment) => (
          <CommentComponent
            key={comment.id}
            comment={comment}
            contentID={contentID}
            onRemoveComment={onRemoveComment}
            onUpdateComment={onUpdateComment}
          />
        ))}
      </div>
      <div>
        <form className="flex flex-col gap-2">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="comment" className="sr-only">
            Comment
          </label>
          <textarea
            id="comment"
            // eslint-disable-next-line max-len
            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Add a comment..."
            required
            value={newCommentText}
            onChange={(e) => {
              setNewCommentText(e.target.value);
            }}
          />
          <CustomButton
            type="submit"
            className="w-fit"
            onClick={(e) => {
              const comment = document.getElementById('comment') as HTMLInputElement;

              if (comment && newCommentText) {
                onAddComment(contentID, newCommentText);
                e.preventDefault();
              }

              comment.value = '';
            }}
          >
            Add comment
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;
