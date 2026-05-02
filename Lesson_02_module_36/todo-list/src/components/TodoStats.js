const TodoStats = ({ total, completed, onToggleAll, onDeleteCompleted }) => {
  if (total === 0) return <p>The list is empty. Add a task!</p>;

  return (
    <div className="stats">
      <p>
        Completed {completed} of {total}
      </p>
      {total > 1 && (
        <button onClick={onToggleAll}>
          {completed === total ? `Cancel all` : `Complete all`}
        </button>
      )}
      {completed > 0 && (
        <button onClick={onDeleteCompleted}>
          Delete completed ({completed})
        </button>
      )}
    </div>
  );
};

export default TodoStats;
