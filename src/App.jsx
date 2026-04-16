import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";

export default function App() {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <BrowserRouter>
      <nav>
        <div>
          <Link to="/">Home</Link>
          <Link to="/create">Create</Link>
        </div>

        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "🌸 Light"}
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
      </Routes>
    </BrowserRouter>
  );
}