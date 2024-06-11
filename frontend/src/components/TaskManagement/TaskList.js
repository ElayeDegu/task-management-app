import React, { useState, useEffect } from 'react';
import taskService from '../../services/taskService';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await taskService.getTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      setError('Failed to delete task');
    }
  };

  const handleUpdate = async (updatedTask) => {
    try {
      const updatedTaskData = await taskService.updateTask(updatedTask._id, updatedTask);
      setTasks(tasks.map(task => (task._id === updatedTaskData._id ? updatedTaskData : task)));
    } catch (error) {
      setError('Failed to update task');
    }
  };

  const handleSearch = async () => {
    try {
      const tasksData = await taskService.searchTasks(searchQuery);
      setTasks(tasksData);
    } catch (error) {
      setError('Failed to search tasks');
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <TaskForm onTaskCreated={(newTask) => setTasks([...tasks, newTask])} />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tasks"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {tasks.map(task => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>Description: {task.description}</p>
          <p>Deadline: {task.deadline}</p>
          <p>Priority: {task.priority}</p>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
          <button onClick={() => handleUpdate(task)}>Update</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
