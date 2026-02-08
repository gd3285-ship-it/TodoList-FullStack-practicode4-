import React, { useState, useEffect } from "react";
import itemService from "../service";
import "../styles/TodoList.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  // טען משימות בעומס העמוד
  useEffect(() => {
    fetchTodos();
  }, []);

  // קבל את המשימות מה-API
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await itemService.getTasks();
      setTodos(data || []);
    } catch (error) {
      console.error("שגיאה בטעינת משימות:", error);
      alert("שגיאה בטעינת משימות. בדוק את החיבור ל-API.");
    } finally {
      setLoading(false);
    }
  };

  // הוסף משימה חדשה
  const handleAddTodo = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) {
      alert("אנא הזן משימה");
      return;
    }

    try {
      const newTodo = await itemService.addTask(input.trim());
      setTodos([...todos, newTodo]);
      setInput("");
    } catch (error) {
      console.error("שגיאה בהוספת משימה:", error);
      alert("שגיאה בהוספת משימה. בדוק את החיבור ל-API.");
    }
  };

  // עדכן משימה (סימון כהושלמה)
  const handleToggleTodo = async (id, isComplete) => {
    try {
      const updatedTodo = await itemService.setCompleted(id, !isComplete);
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (error) {
      console.error("שגיאה בעדכון משימה:", error);
      alert("שגיאה בעדכון משימה.");
    }
  };

  // מחק משימה
  const handleDeleteTodo = async (id) => {
    try {
      await itemService.deleteTask(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("שגיאה במחיקת משימה:", error);
      alert("שגיאה במחיקת משימה.");
    }
  };

  return (
    <div className="app-background">
      <div className="glass-container">
        <h1> המשימות שלי</h1>

        {/* טופס הוספה */}
        <form onSubmit={handleAddTodo} className="input-section">
          <input
            type="text"
            placeholder="הוסף משימה חדשה..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="add-button" disabled={loading}>
            
          </button>
        </form>

        {/* מצב טעינה */}
        {loading && <div className="loading">טוען משימות</div>}

        {/* רשימת משימות */}
        {!loading && (
          <>
            {todos.length === 0 ? (
              <div className="empty-message">
                 אין משימות כרגע
                <strong>בואו נוסיף אחת!</strong>
              </div>
            ) : (
              <div className="todo-list">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`todo-item ${todo.isComplete ? "completed" : ""}`}
                  >
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={todo.isComplete}
                      onChange={() => handleToggleTodo(todo.id, todo.isComplete)}
                    />
                    <span className="todo-text">{todo.name}</span>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TodoList;
