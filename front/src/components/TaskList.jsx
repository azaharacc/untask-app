import TaskItem from "./TaskItem"; // Import individual task component
import './TaskList.css'; // Import styles specific to the task list

// Array of pastel colors used to give each task a distinct background
const pastelColors = [
  "#FFEBB7", "#FFC1C1", "#B7E4C7", "#B3D9FF", "#FFD8B1",
  "#D4B4FF", "#F7C6C7", "#C1E1C1", "#AFCBFF", "#FFE4C4",
  "#E3D4B9", "#C9C9FF", "#FFDDD2", "#D1F2EB", "#FFE3E3", "#F0E68C",
];

// Function to get a background color based on task ID
function getColorFromId(id) {
  // Cycles through the colors array
  return pastelColors[id % pastelColors.length];
}

// Display a list/grid of tasks
function TaskList({ tasks, selected, onToggle }) {
  return (
    <div className="taskGrid">
      {tasks.map((task) => (
        <TaskItem
          key={task.id} // Unique key for React list rendering
          task={task} // Pass the task object
          isSelected={selected.includes(task.id)} // Determine if task is selected
          onToggle={onToggle} // Function to toggle selection
          bgColor={getColorFromId(task.id)} // Assign a pastel color background
        />
      ))}
    </div>
  );
}

export default TaskList;
