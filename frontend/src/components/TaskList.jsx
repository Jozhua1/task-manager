import TaskItem from './TaskItem';

function TaskList({ tasks, loading, onToggle, onDelete, onUpdate }) {
  if (loading) {
    return <p className="empty-state">Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return <p className="empty-state">No tasks match your search/filter.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}

export default TaskList;
