// TaskForm.js

import React, { useState } from 'react';
import taskService from '../../services/taskService';

const TaskForm = ({ onTaskCreated }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: '',
        priority: '',
        categories: ''
      });
    
      const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async e => {
        e.preventDefault();
        try {
          const newTask = await taskService.createTask(formData);
          setFormData({
            title: '',
            description: '',
            deadline: '',
            priority: '',
            categories: ''
          });
          onTaskCreated(newTask); // Notify parent component (TaskList) of task creation
        } catch (error) {
          console.error('Error creating task:', error);
        }
      };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <div>
          <label>Deadline:</label>
          <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} />
        </div>
        <div>
          <label>Priority:</label>
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div>
          <label>Categories:</label>
          <input type="text" name="categories" value={formData.categories} onChange={handleChange} />
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
