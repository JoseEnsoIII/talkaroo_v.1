import { useState, useEffect } from "react";

const BlogPost = ({ blogId }) => {
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!blogId || isNaN(blogId)) {
      setError("Invalid blog ID.");
      setLoading(false);
      return;
    }

    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/blogs/${blogId}`);
        if (!response.ok) throw new Error("Failed to fetch blog data");
        const data = await response.json();
        setBlogPost(data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [blogId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!blogPost) return <p>Blog post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{blogPost.title}</h1>
      {blogPost.image_url && (
        <img
          src={blogPost.image_url}
          alt={blogPost.title}
          className="w-full h-60 object-cover rounded-lg mb-4"
        />
      )}
      <p className="text-gray-700">{blogPost.content}</p>
      <p className="text-sm text-gray-500 mt-4">
        Published on: {new Date(blogPost.created_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default BlogPost;
