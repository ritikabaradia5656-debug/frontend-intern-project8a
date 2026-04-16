import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { blogs, deleteBlog } = useContext(BlogContext);

  return (
    <div className="container">
      <h2>All Blogs</h2>

      {blogs.length === 0 && (
        <div className="empty">
          <h3>📝 No blogs yet</h3>
          <p>Create your first blog</p>
        </div>
      )}

      {blogs.map((blog) => (
        <div key={blog.id} className="card">
          <h3>{blog.title}</h3>

          <div className="card-actions">
            <Link to={`/blog/${blog.id}`}>Read</Link>
            <Link to={`/edit/${blog.id}`}>Edit</Link>
            <button onClick={() => deleteBlog(blog.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}