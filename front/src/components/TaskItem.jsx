import './TaskItem.css'; // Import styles specific to this component

// Component to render an individual task item
function TaskItem({ task, isSelected, onToggle, bgColor, token }) {
  return (
    // Container for the task item, with dynamic background color
    <div className="taskBlock" style={{ backgroundColor: bgColor }}>
      
      {/* Checkbox to select/unselect the task */}
      {token && (
        <input
          className="deleteBox"
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(task.id)}
        />
      )}
      {/* Task name and faded suggestion text style */}
      {task.name}
      <div className="faded">
        {task.suggestion}
      </div>
    </div>
  );
}

export default TaskItem;
