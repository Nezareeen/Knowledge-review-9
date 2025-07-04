// - You are give and `TaskForm.jsx` file inside `components` folder.
// -  Inside this file you need to create an Frontend form that will take the inputs for the `TaskCard`. 
// - You need to write and `onsubmit` function for the form that will verify all the fields are not empty and  send all the input data to backend endpoint.
// - Please refer to the Task schema inside backend to get idea about the input fields.
// - You need to complete the `TaskForm` function inside `TaskForm.jsx` only.


import { useState } from 'react';
import axios from 'axios';
import './TaskForm.css'; // Assuming you have a CSS module for styling


const statusOptions = [
  { value: 'To Do', label: 'To Do' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Done', label: 'Done' },
];
const priorityOptions = [
  { value: 'High', label: 'High' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Low', label: 'Low' },
];

const TaskForm = ({ onTaskCreated }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'To Do',
    priority: 'Medium',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.title || !task.description || !task.dueDate) {
      alert('Please fill in all fields');
      return;
    }
    setSubmitting(true);
    try {
      await axios.post('http://localhost:3000/tasks', task);
      setTask({
        title: '',
        description: '',
        dueDate: '',
        status: 'To Do',
        priority: 'Medium',
      });
      if (onTaskCreated) onTaskCreated();
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Create Task</h2>
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={task.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={task.description}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        required
      />
      <select name="status" value={task.status} onChange={handleChange}>
        {statusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <select name="priority" value={task.priority} onChange={handleChange}>
        {priorityOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;