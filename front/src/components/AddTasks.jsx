import { useState } from "react";
import './AddTasks.css'; // Import component-specific styles

// Component for adding tasks and deleting selected tasks
function AddTask({ onAdd, onDeleteSelected }) {
  // Local state to keep track of the input field value
  const [name, setName] = useState("");

  // Handles submitting a new task
  const handleSubmit = () => {
    // Prevent adding empty or whitespace-only tasks
    if (name.trim() === "") return;

    // Call the parent component's function to add the task
    onAdd(name);

    // Clear the input field after submitting
    setName("");
  };

  return (
    <div className="taskControls">
      {/* Input field for entering the task name */}
      <input
        className="input"
        value={name}
        onChange={(e) => setName(e.target.value)} // Update state on input change
      />

      {/* Button to submit (add) the new task */}
      <button className="add" onClick={handleSubmit}>
        Add
      </button>

      {/* Button to delete selected tasks (calls parent handler) */}
      <button className="delete" onClick={onDeleteSelected}>
        Delete selected
      </button>
    </div>
  );
}

export default AddTask;
