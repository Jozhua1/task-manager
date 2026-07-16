import { useState } from 'react';

function TaskItem({ task, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [error, setError] = useState('');

  const startEdit = () => {
    setTitle(task.title);
    setDescription(task.description);
    setError('');
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setError('');
  };

  const saveEdit = () => {
    if (!title.trim()) {
      setError('Task title is required.');
      return;
    }
    onUpdate(task.id, { title: title.trim(), description: description.trim() });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="task-item editing">
        <div className="task-edit-form">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            aria-label="Edit task title"
            aria-invalid={!!error}
            autoFocus
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            aria-label="Edit task description"
          />
          {error && <p className="form-error">{error}</p>}
          <div className="task-item-actions">
            <button type="button" onClick={saveEdit} className="btn-save">
              Save
            </button>
            <button type="button" onClick={cancelEdit} className="btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <label className="task-checkbox-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />
      </label>

      <div className="task-content">
        <p className="task-title">{task.title}</p>
        {task.description && <p className="task-description">{task.description}</p>}
      </div>

      <div className="task-item-actions">
        <button type="button" onClick={startEdit} className="btn-edit">
          Edit
        </button>
        <button type="button" onClick={() => onDelete(task.id)} className="btn-delete">
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
