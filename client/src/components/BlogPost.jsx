import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const BlogPost = ({ blog, user, onLike, onComment }) => {
  const [comment, setComment] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);

  const handleLike = () => {
    onLike(blog._id);
  };

  const handleComment = (e) => {
    e.preventDefault();
    onComment(blog._id, comment);
    setComment('');
  };

  const hasLiked = user && blog.likedBy.includes(user.email);

  const displayedComments = showAllComments ? blog.comments : blog.comments.slice(0, 2);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
      <h3 className="text-2xl font-bold mb-2">{blog.title}</h3>
      <p className="text-gray-700 mb-4">{blog.content}</p>
      <Link to={`/profile/${blog.authorEmail}`} className="text-blue-500 text-sm">By {blog.author}</Link>
      <div className="mt-4 flex items-center">
        <button onClick={handleLike} className="focus:outline-none">
          <FontAwesomeIcon
            icon={faThumbsUp}
            className={`text-2xl ${hasLiked ? 'text-blue-500' : 'text-gray-500'}`}
          />
        </button>
        <span className="ml-2 text-gray-700">{blog.likes}</span>
      </div>
      {user && (
        <form onSubmit={handleComment} className="mt-4">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded-lg mb-2"
            placeholder="Add a comment"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Comment
          </button>
        </form>
      )}
      <div className="mt-4">
        <div className={`overflow-y-auto ${showAllComments ? 'max-h-40' : ''}`}>
          {displayedComments.map((comment, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded-lg mb-2">
              <p className="text-gray-700"><strong>{comment.author}:</strong> {comment.content}</p>
            </div>
          ))}
        </div>
        {blog.comments.length > 2 && (
          <button
            onClick={() => setShowAllComments(!showAllComments)}
            className="text-blue-500 hover:underline mt-2"
          >
            {showAllComments ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogPost;