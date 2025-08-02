import { useEffect, useState } from "react";
import AddTask from "./components/AddTasks";
import TaskList from "./components/TaskList";
import { fetchTasks, addTask, deleteTask } from "./services/api";
import useAuth from "./hooks/useAuth";
import "./App.css";

function App() {
  const {
    token,
    isAuthenticated,
    email,
    password,
    setEmail,
    setPassword,
    login,
    logout,
  } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };
    load();
  }, []);

  const handleAdd = async (name) => {
    try {
      const newTask = await addTask(name, token);
      setTasks((prev) => [newTask, ...prev]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleToggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    try {
      for (const id of selected) {
        await deleteTask(id, token);
      }
      setTasks((prev) => prev.filter((t) => !selected.includes(t.id)));
      setSelected([]);
    } catch (error) {
      console.error("Error deleting tasks:", error);
    }
  };

  return (
    <div>
      <h1>add task, receive untask</h1>

      {isAuthenticated ? (
        <>
          <button onClick={logout}>Logout</button>
          <AddTask onAdd={handleAdd} onDeleteSelected={handleDeleteSelected} />
        </>
      ) : (
        <div>
          <p>
            You are viewing a public list of example tasks. To have your own untask list, login is needed.
          </p>
        </div>
      )}

      <TaskList
        tasks={tasks}
        selected={selected}
        onToggle={handleToggle}
        token={token}
      />

      {/* button bottom right */}
      {!isAuthenticated && (
      <div className="login-floating-box">
  <button
    className="login-toggle-button"
    onClick={() => setShowLoginForm(show => !show)}
  >
    {showLoginForm ? "Close Login" : "Login"}
  </button>

  {showLoginForm && (
    <form className="login-form">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="login-buttons">
        <button type="button" onClick={login}>Login</button>
        <button type="button" onClick={() => setShowLoginForm(false)}>Cancel</button>
      </div>
    </form>
  )}
</div>
      )}
    </div>
  );
}

export default App;
