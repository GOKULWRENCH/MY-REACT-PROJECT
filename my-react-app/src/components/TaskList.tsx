import React, { useState } from 'react';
import '../styles/TaskStyle.css';

interface Task {
  id: number;
  title: string;
  status: 'Pending' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Complete project', status: 'Pending', priority: 'High' },
    { id: 2, title: 'Write documentation', status: 'Completed', priority: 'Medium' },
    { id: 3, title: 'Fix bugs', status: 'Pending', priority: 'Low' },
    { id: 4, title: 'Team meeting', status: 'Completed', priority: 'Medium' },
    { id: 5, title: 'Update dependencies', status: 'Pending', priority: 'Low' },
    { id: 6, title: 'Code review', status: 'Completed', priority: 'High' },
    { id: 7, title: 'Learning', status: 'Pending', priority: 'Low' },
    { id: 8, title: 'Activities', status: 'Completed', priority: 'Medium' },
    { id: 9, title: 'Knowledge Transfer', status: 'Completed', priority: 'High' },
    { id: 9, title: 'Data Migration', status: 'Completed', priority: 'High' },
  ]);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'' | 'Pending' | 'Completed'>('');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<Task>({
    id: 0,
    title: '',
    status: 'Pending',
    priority: 'Low',
  });

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((task) => (statusFilter ? task.status === statusFilter : true));

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return '#f44336';
      case 'Medium':
        return '#ffa726'; 
      case 'Low':
        return '#66bb6a'; 
      default:
        return '#ccc'; 
    }
  };

  const markAsCompleted = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id && task.status === 'Pending'
          ? { ...task, status: 'Completed' }
          : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...newTask, id: prevTasks.length + 1 },
    ]);
    setShowForm(false); // Close the form
    setNewTask({ id: 0, title: '', status: 'Pending', priority: 'Low' }); // Reset form
  };

  return (
    <div className="task-list-container">
      <h1 className="task-list-heading">Task List</h1>

      {/* Filter Container */}
      <div className="filter-container">
        <button
          className="add-btn"
          onClick={() => setShowForm(true)} // Show the form when clicked
        >
          Add
        </button>

        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as '' | 'Pending' | 'Completed')}
          className="dropdown-filter"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Add Task Form */}
      {showForm && (
        <div className="task-form-container">
          <form onSubmit={handleFormSubmit} className="task-form">
            <h3>Add New Task</h3>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleFormChange}
              placeholder="Task Title"
              required
            />
            <input
              type="text"
              name="status"
              value={newTask.status}
              onChange={handleFormChange}
              placeholder="Status (Pending/Completed)"
              required
            />
            <input
              type="text"
              name="priority"
              value={newTask.priority}
              onChange={handleFormChange}
              placeholder="Priority (Low/Medium/High)"
              required
            />
            <button type="submit">Add Task</button>
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Task List */}
      {filteredTasks.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="task-item"
              style={{
                backgroundColor: getPriorityColor(task.priority),
              }}
            >
              <h3 className="task-title">{task.title}</h3>
              <p className="task-info">
                <strong>Status:</strong> {task.status}
              </p>
              <p className="task-info">
                <strong>Priority:</strong> {task.priority}
              </p>

              {/* "Mark as Completed" Button */}
              {task.status === 'Pending' && (
                <button
                  className="mark-completed-btn"
                  onClick={() => markAsCompleted(task.id)}
                >
                  Mark as Completed
                </button>
              )}

              {/* "Delete" Button */}
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default TaskList;
