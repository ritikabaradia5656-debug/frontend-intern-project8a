import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { BlogContext } from "../context/BlogContext";

export default function EditBlog() {
  const { id } = useParams();
  const { blogs, updateBlog } = useContext(BlogContext);
  const navigate = useNavigate();

  const blog = blogs.find((b) => b.id === Number(id));

  const [title, setTitle] = useState(blog?.title || "");
  const [content, setContent] = useState(blog?.content || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    updateBlog({
      id: blog.id,
      title,
      content,
    });

    navigate("/");
  };

  if (!blog) return <p>Blog not found</p>;

  return (
    <form onSubmit={handleSubmit} className="container">
      <h2>Edit Blog</h2>

      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />

      <button className="primary">Update</button>
    </form>
  );
}