import { useEffect, useState } from "react";
import AddTask from "./components/AddTasks";
import TaskList from "./components/TaskList";
import { fetchTasks, addTask, deleteTask } from "./services/api";
import "./App.css";

function App() {
  // State to store the list of tasks fetched from the backend
  const [tasks, setTasks] = useState([]);
  
  // State to store the IDs of selected tasks (for deletion or toggling)
  const [selected, setSelected] = useState([]);

  // Load tasks from the database when the component mounts
  useEffect(() => {
    const load = async () => {
      const data = await fetchTasks();  // Fetch tasks from API
      setTasks(data);                    // Update state with fetched tasks
    };
    load();
  }, []); // Empty dependency array means this runs once on component mount

  // Handler to add a new task
  const handleAdd = async (name) => {
    try {
      // Call API to add the new task and wait for the created task object
      const newTask = await addTask(name);
      // Update tasks state by appending the new task
      setTasks((prev) => [...prev, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Handler to toggle the selection of a task by its ID
  const handleToggle = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id) // Remove if already selected
        : [...prev, id]                 // Add if not selected
    );
  };

  // Handler to delete all selected tasks
  const handleDeleteSelected = async () => {
    try {
      // Loop through each selected task ID and call the API to delete it
      for (const id of selected) {
        await deleteTask(id);
      }
      // Remove deleted tasks from the tasks state
      setTasks((prev) => prev.filter((t) => !selected.includes(t.id)));
      // Clear the selection
      setSelected([]);
    } catch (error) {
      console.error("Error deleting tasks:", error);
    }
  };

  return (
    <div>
      <h1>add task, receive untask</h1>
      {/* AddTask component to add new tasks and delete selected tasks */}
      <AddTask onAdd={handleAdd} onDeleteSelected={handleDeleteSelected} />
      
      {/* TaskList component to display tasks and handle toggling selection */}
      <TaskList
        tasks={tasks}
        selected={selected}
        onToggle={handleToggle}
        onDeleteSelected={handleDeleteSelected}
      />
    </div>
  );
}

export default App;
