import React, { useState } from 'react';

const CreateBlog = ({ addBlog }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      content
    };
    await addBlog(newBlog);
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">Create a New Blog Post</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded-lg mb-2"
        placeholder="Blog Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded-lg mb-2"
        placeholder="Blog Content"
        required
      />
      <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
        Post Blog
      </button>
    </form>
  );
};

export default CreateBlog;