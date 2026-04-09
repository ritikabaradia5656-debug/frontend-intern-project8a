import { useState } from "react";

function TodoItem({ todo, index, deleteTodo, toggleTodo, updateTodo }) {
  const [edit, setEdit] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  return (
    <div>
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
        <span style={{ textDecoration: todo.completed ? "line-through" : "" }}>
          {todo.text}
        </span>
      )}

      <button onClick={() => setEdit(!edit)}>Edit</button>

      <button onClick={() => updateTodo(index, newText)}>Save</button>

      <button onClick={() => deleteTodo(index)}>Delete</button>
    </div>
  );
}

export default TodoItem;