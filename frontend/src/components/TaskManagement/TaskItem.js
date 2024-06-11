// TaskItem.js

import React from 'react';

const TaskItem = ({ task }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>Description: {task.description}</p>
      <p>Deadline: {task.deadline}</p>
      <p>Priority: {task.priority}</p>
      <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
      {/* Add more task details as needed */}
    </div>
  );
};

export default TaskItem;
