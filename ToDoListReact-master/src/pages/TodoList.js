import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../service";
import "../styles/TodoList.css";

export default function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getTodos = async () => {
    try {
      setLoading(true);
      const tasks = await service.getTasks();
      setTodos(tasks || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      await service.addTask(newTodo);
      setNewTodo("");
      await getTodos();
    } catch (e) {
      console.error(e);
    }
  };

  const updateTodo = async (id, name, isComplete) => {
    try {
      await service.setCompleted(id, isComplete);
      await getTodos();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await service.deleteTask(id);
      await getTodos();
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    service.logout();
    navigate("/login");
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="app-background">
      <div className="glass-container">
        <div className="header">
          <h1 className="title">📝 רשימת המשימות שלי</h1>
          <button onClick={handleLogout} className="logout-btn">
            התנתקות
          </button>
        </div>

        <form onSubmit={createTodo} className="input-group">
          <input
            className="custom-input"
            placeholder="הוסף משימה חדשה..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button type="submit" className="add-btn" title="הוסף משימה">
            ➕
          </button>
        </form>

        <div className="todo-list-container">
          {loading ? (
            <div className="loading">...טוען</div>
          ) : todos.length === 0 ? (
            <div className="empty-state">🎉 אין משימות! אתה חופשי!</div>
          ) : (
            <ul className="todo-list">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className={`todo-item ${todo.isComplete ? "done" : ""}`}
                >
                  <div className="todo-content">
                    <input
                      type="checkbox"
                      checked={todo.isComplete}
                      onChange={(e) =>
                        updateTodo(todo.id, todo.name, e.target.checked)
                      }
                      className="todo-checkbox"
                    />
                    <span className="todo-text">{todo.name}</span>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-btn"
                    title="מחק משימה"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
