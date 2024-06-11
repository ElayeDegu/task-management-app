// taskService.js

const BASE_URL = 'http://localhost:5000/api/tasks'

const taskService = {
  createTask: async (taskData) => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    return response.json();
  },

  getTasks: async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  },

  updateTask: async (taskId, updatedTaskData) => {
    const response = await fetch(`${BASE_URL}/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTaskData),
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    return response.json();
  },

  deleteTask: async (taskId) => {
    const response = await fetch(`${BASE_URL}/${taskId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    return response.json();
  },

  searchTasks: async (query) => {
    const response = await fetch(`${BASE_URL}/search?query=${query}`);
    if (!response.ok) {
      throw new Error('Failed to search tasks');
    }
    return response.json();
  },
};

export default taskService;
