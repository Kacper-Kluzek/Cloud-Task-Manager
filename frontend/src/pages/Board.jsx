import { useState, useEffect } from 'react';
import '../index.css';
import { taskService } from '../services/api';

const COLUMNS = ['To Do', 'In Progress', 'Review', 'Done'];

function Board() {
  const [tasks, setTasks] = useState([]);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newTask, setNewTask] = useState({ id: null, title: '', priority: 'Medium', status: 'To Do' });
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCreateOrUpdateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    try {
      if (isEditMode) {
        const updatedTask = await taskService.updateTask(newTask.id, newTask);
        setTasks(prev => prev.map(t => t.id === newTask.id ? newTask : t)); // using newTask directly as endpoint might return NoContent
      } else {
        const createdTask = await taskService.createTask({
          title: newTask.title,
          status: 'To Do',
          priority: newTask.priority
        });
        setTasks(prev => [...prev, createdTask]);
      }
      closeModal();
    } catch (error) {
      console.error(isEditMode ? 'Failed to update task:' : 'Failed to create task:', error);
    }
  };

  const openEditModal = (task) => {
    setNewTask(task);
    setIsEditMode(true);
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  const openCreateModal = () => {
    setNewTask({ id: null, title: '', priority: 'Medium', status: 'To Do' });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewTask({ id: null, title: '', priority: 'Medium', status: 'To Do' });
    setIsEditMode(false);
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      setActiveMenuId(null);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
      e.target.style.opacity = '0.5';
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedTaskId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, status) => {
    e.preventDefault();
    if (!draggedTaskId) return;

    const taskToUpdate = tasks.find(t => t.id === draggedTaskId);
    if (!taskToUpdate || taskToUpdate.status === status) return;

    const updatedTask = { ...taskToUpdate, status };

    // Optimistic UI update
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === draggedTaskId ? updatedTask : task
      )
    );

    try {
      await taskService.updateTask(updatedTask.id, updatedTask);
    } catch (error) {
      console.error('Failed to update task status:', error);
      // Revert optimism string on failure:
      fetchTasks();
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'var(--danger-color)';
      case 'Medium': return 'var(--warning-color)';
      case 'Low': return 'var(--success-color)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>Cloud Task Manager</h1>
            <p>A simple, elegant way to manage your work.</p>
          </div>
          <button className="btn-primary" onClick={openCreateModal}>
            + Add Task
          </button>
        </div>
      </header>

      <main className="board">
        {COLUMNS.map(column => {
          const columnTasks = tasks.filter(task => task.status === column);
          return (
            <div 
              key={column} 
              className="column"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column)}
            >
              <div className="column-header">
                <h2>{column}</h2>
                <span className="task-count">{columnTasks.length}</span>
              </div>
              
              <div className="task-list">
                {columnTasks.map(task => (
                  <div 
                    key={task.id} 
                    className="task-card"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="task-header">
                      <h3>{task.title}</h3>
                      <div className="task-actions">
                        <button 
                          className="options-btn" 
                          onClick={(e) => toggleMenu(e, task.id)}
                        >
                          &#8942;
                        </button>
                        {activeMenuId === task.id && (
                          <div className="options-menu">
                            <button onClick={() => openEditModal(task)}>Edit</button>
                            <button className="delete-action" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="task-footer">
                      <span className="task-id">#{task.id}</span>
                      <span 
                        className="priority" 
                        style={{ backgroundColor: getPriorityColor(task.priority) + '33', color: getPriorityColor(task.priority) }}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </main>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{isEditMode ? 'Edit Task' : 'Create New Task'}</h2>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleCreateOrUpdateTask}>
              <div className="form-group">
                <label htmlFor="title">Task Title</label>
                <input 
                  type="text" 
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="What needs to be done?"
                  autoFocus
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select 
                  id="priority"
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary">{isEditMode ? 'Save Changes' : 'Create Task'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Board;
