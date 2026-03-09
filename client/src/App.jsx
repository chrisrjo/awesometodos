import { useEffect, useState } from "react";
import Todo from "./Todo"; // Import the component we fixed in Step 1

export default function App() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState(""); // State for the new todo input

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await fetch("/api/todos");
        const data = await res.json();
        setTodos(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    getTodos();
  }, []);

  const createNewTodo = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ todo: content }),  
        headers: { "Content-Type": "application/json" },
      });
      const newTodo = await res.json();

      setContent(""); // Clear the input
      setTodos([...todos, newTodo]); // Add new todo to the list
    }
  };

  return (
    <main className="container">
      <h1 className="title">Awesome Todos</h1>

      {/* Form to add new Todos */}
      <form className="form" onSubmit={createNewTodo}>
        <input 
          type="text" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Enter a new todo..."
          className="form__input"
          required 
        />
        <button type="submit">Create Todo</button>
      </form>

      <div className="todos">
        {todos.length > 0 ? (
          todos.map((todo) => (
            /* Using our Todo component and passing the required props */
            <Todo key={todo._id} todo={todo} setTodos={setTodos} />
          ))
        ) : (
          <p>No todos found. Try creating one above!</p>
        )}
      </div>
    </main>
  );
}