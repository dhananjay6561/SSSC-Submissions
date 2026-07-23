function ProgressBar({ todos }) {
  const completed = todos.filter((todo) => todo.completed).length;
  const total = todos.length;

  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="progress-section">
      <div className="progress-label">
        
        <span>Progress</span>
        <span>{percentage}%</span>
      </div>

      <div className="progress">
        <div className="bar" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;