// Local development URL (commented out)
// const API_URL = "http://localhost:3001/tasks";

// Production or Railway deployment URL, read from environment variables
const API_URL = import.meta.env.VITE_TASKS_BACK;

// Fetch all tasks from the backend API
export const fetchTasks = async () => {
  const res = await fetch(`${API_URL}`);
  return res.json(); // Parse and return JSON response
};

// Add a new task by sending a POST request with the task name
export const addTask = async (name) => {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }), // Convert task name to JSON
  });
  return res.json(); // Return the created task data from backend
};

// Delete a task by its ID by sending a DELETE request
export const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
