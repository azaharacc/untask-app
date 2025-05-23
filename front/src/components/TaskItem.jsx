import './TaskItem.css'; // Import styles specific to this component

// Component to render an individual task item
function TaskItem({ task, isSelected, onToggle, bgColor }) {
  return (
    // Container for the task item, with dynamic background color
    <div className="taskBlock" style={{ backgroundColor: bgColor }}>
      
      {/* Checkbox to select/unselect the task */}
      <input
        className="deleteBox"
        type="checkbox"
        checked={isSelected} // Controlled checkbox based on parent state
        onChange={() => onToggle(task.id)} // Trigger parent function to toggle selection
      /> 
      
      {/* Task name and faded suggestion text style */}
      {task.name}
      <div className="faded">
        {task.suggestion}
      </div>
    </div>
  );
}

export default TaskItem;
