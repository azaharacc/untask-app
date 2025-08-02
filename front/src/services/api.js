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
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:3001/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  return res.json();
};

export const deleteTask = async (id) => {
  const token = localStorage.getItem('token');
  await fetch(`http://localhost:3001/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
