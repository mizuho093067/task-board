// タスク1件分の表示
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={task.done ? "task-item done" : "task-item"}>
      <label>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />
        <span className="task-title">{task.title}</span>
      </label>
      <button
        type="button"
        className="delete-button"
        onClick={() => onDelete(task.id)}
        aria-label={`「${task.title}」を削除`}
      >
        削除
      </button>
    </li>
  );
}

export default TaskItem;
