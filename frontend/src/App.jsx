import { useState, useEffect, useCallback } from 'react';
import { api } from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = useCallback(async () => {
    try {
      setError('');
      const data = await api.getTasks({ search, status: filter });
      setTasks(data);
    } catch (err) {
      setError('Could not load tasks. Is the server running?');
    } finally {
      setLoading(false);
    }
  }, [search, filter]);

  useEffect(() => {
    setLoading(true);
    fetchTasks();
  }, [fetchTasks]);

  const handleAdd = async ({ title, description }) => {
    try {
      setError('');
      await api.createTask({ title, description });
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (id) => {
    try {
      setError('');
      await api.toggleTask(id);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id, fields) => {
    try {
      setError('');
      await api.updateTask(id, fields);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      setError('');
      await api.deleteTask(id);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p className="subtitle">
          {loading
            ? 'Loading...'
            : tasks.length === 0
            ? 'No tasks yet — add one below to get started.'
            : `${activeCount} of ${tasks.length} task${tasks.length === 1 ? '' : 's'} remaining`}
        </p>
      </header>

      <main className="app-main">
        <TaskForm onAdd={handleAdd} />

        {error && <p className="api-error">{error}</p>}

        <div className="controls">
          <SearchBar value={search} onChange={setSearch} />
          <FilterBar value={filter} onChange={setFilter} />
        </div>

        <TaskList
          tasks={tasks}
          loading={loading}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </main>
    </div>
  );
}

export default App;
