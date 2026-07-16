import { useState } from 'react';

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Task title is required.');
      return;
    }

    onAdd({ title, description });
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="task-form-row">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          aria-label="Task title"
          aria-invalid={!!error}
        />
        <button type="submit">Add Task</button>
      </div>
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        aria-label="Task description"
        className="task-form-description"
      />
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}

export default TaskForm;
