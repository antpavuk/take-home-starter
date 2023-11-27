/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
import CustomButton from './tools/CustomButton';

interface CommentComponentProps {
  comment: Comment;
  contentID: string;
  onRemoveComment: (contentId: string, commentId: string) => void;
  onUpdateComment: (contentId: string, commentId: string, newCommentText: string) => void;
}

const CommentComponent: FC<CommentComponentProps> = ({
  comment, contentID, onRemoveComment, onUpdateComment,
}) => {
  const [newCommentText, setNewCommentText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setNewCommentText(comment.text);
  }, []);

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex flex-row gap-2 items-center justify-between border border-gray-200 p-6 rounded-lg max-w-5/12">
        {isEditing ? (
          <div>
            <textarea
              id="comment"
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
              onClick={() => {
                if (newCommentText && newCommentText !== comment.text) {
                  onUpdateComment(contentID, comment.id, newCommentText);
                }
                setIsEditing(false);
              }}
            >
              Update comment
            </CustomButton>
          </div>
        ) : (
          <p className="text-gray-700 whitespace-pre">{comment.text}</p>
        )}

        <button
          type="button"
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
          }}
        >
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
          <span className="sr-only">Comment settings</span>
        </button>
      </div>
      <div
        id="dropdownComment"
        className={`${
          isDropdownOpen ? 'block' : 'hidden'
        } absolute right-24 mt-2 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
        role="menu"
      >
        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
          {!isEditing && (
            <li>
              <button
                type="button"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  setIsEditing(true);
                  setIsDropdownOpen(false);
                }}
              >
                Edit
              </button>
            </li>
          )}
          <li>
            <button
              type="button"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => {
                onRemoveComment(contentID, comment.id);
              }}
            >
              Remove
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CommentComponent;
