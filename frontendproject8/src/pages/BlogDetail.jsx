import { useParams } from "react-router-dom";
import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import ReactMarkdown from "react-markdown";

export default function BlogDetail() {
  const { id } = useParams();
  const { blogs } = useContext(BlogContext);

  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="container">
      <h2>{blog.title}</h2>

      <div className="card">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </div>
    </div>
  );
}