import React, { useState, useEffect } from 'react';
import CreateBlog from './CreateBlog';
import BlogPost from './BlogPost';

const Blogs = ({ user }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://ju-it-alumni-host.onrender.com/api/blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchBlogs();
  }, []);

  const addBlog = async (newBlog) => {
    try {
      const response = await fetch('https://ju-it-alumni-host.onrender.com/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newBlog)
      });
      if (!response.ok) {
        throw new Error('Failed to add blog');
      }
      const data = await response.json();
      setBlogs([data, ...blogs]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const likeBlog = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await fetch(`https://ju-it-alumni-host.onrender.com/api/blogs/${id}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to like blog');
      }
      const updatedBlog = await response.json();
      setBlogs(blogs.map(blog => blog._id === id ? updatedBlog : blog));
    } catch (error) {
      console.error(error.message);
    }
  };

  const commentBlog = async (id, content) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await fetch(`https://ju-it-alumni-host.onrender.com/api/blogs/${id}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content })
      });
      if (!response.ok) {
        throw new Error('Failed to comment on blog');
      }
      const updatedBlog = await response.json();
      setBlogs(blogs.map(blog => blog._id === id ? updatedBlog : blog));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-cover bg-center h-40" style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}>
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <h1 className="text-4xl font-bold text-white">Welcome to Our Blogs</h1>
        </div>
      </div>
      <div className="container mx-auto p-6">
        {user && <CreateBlog addBlog={addBlog} />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {blogs.map((blog) => (
            <BlogPost key={blog._id} blog={blog} user={user} onLike={likeBlog} onComment={commentBlog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;