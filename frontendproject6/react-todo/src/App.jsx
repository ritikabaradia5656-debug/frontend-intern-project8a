import { useState, useEffect } from "react";

function App() {
  // 🔥 Load from localStorage BEFORE render (correct way)
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  // 🔥 Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ➕ Add task
  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { text: input, completed: false }]);
    setInput("");
  };

  // ❌ Delete task
  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // ✔ Toggle complete
  const toggleTodo = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  // ✏ Update task
  const updateTodo = (index, newText) => {
    if (!newText.trim()) return;
    const updated = [...todos];
    updated[index].text = newText;
    setTodos(updated);
  };

  // 🔍 Filter logic
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>📝 To-Do App</h1>

      {/* Input */}
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Filters */}
      <div style={{ margin: "10px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      {/* Task Counter */}
      <p>{todos.filter((t) => !t.completed).length} tasks left</p>

      {/* List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTodos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            index={index}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            updateTodo={updateTodo}
          />
        ))}
      </ul>
    </div>
  );
}

// 🔥 Todo Item Component
function TodoItem({ todo, index, deleteTodo, toggleTodo, updateTodo }) {
  const [edit, setEdit] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  return (
    <li style={{ margin: "10px 0" }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(index)}
      />

      {edit ? (
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <span
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
            margin: "0 10px",
          }}
        >
          {todo.text}
        </span>
      )}

      {/* Edit */}
      <button onClick={() => setEdit(!edit)}>✏️</button>

      {/* Save (only when editing) */}
      {edit && (
        <button
          onClick={() => {
            updateTodo(index, newText);
            setEdit(false);
          }}
        >
          💾
        </button>
      )}

      {/* Delete */}
      <button onClick={() => deleteTodo(index)}>❌</button>
    </li>
  );
}

export default App;