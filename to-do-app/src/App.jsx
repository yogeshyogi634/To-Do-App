import "./App.css";
import { FiEdit } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }

    if (todo !== "") {
      setTodos([...todos, { id: `${todo} - ${Date.now()}`, todo }]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const deleteTodo = todos.filter((to) => to.id !== id);
    setTodos([...deleteTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((to) => to.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>
        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add Todo"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />
          <button type="submit">
            {editId ? (
              <FiEdit style={{ fontSize: "20px" }} />
            ) : (
              <BsSearch style={{ width: "50px", fontSize: "20px" }} />
            )}
          </button>
        </form>

        <ul className="all-todo">
          {todos.map((t) => (
            <li className="single-todo">
              <span className="todo-text" key={t.id}>
                {t.todo}
              </span>
              <button onClick={() => handleEdit(t.id)}>
                <FiEdit style={{ fontSize: "20px" }} />
              </button>
              <button onClick={() => handleDelete(t.id)}>
                <AiFillDelete style={{ fontSize: "20px" }} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
