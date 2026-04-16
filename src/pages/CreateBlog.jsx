import { useState, useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { addBlog } = useContext(BlogContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    addBlog({
      id: Date.now(),
      title,
      content,
    });

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <h2>Create Blog</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder={`Try:
# Title
**bold**
- list`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="primary">Create</button>

      <h3>Preview</h3>
      <div className="card markdown-preview">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </form>
  );
}