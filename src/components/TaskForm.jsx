import { useState } from "react";

// タスク入力フォーム
function TaskForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = text.trim();
    // 空文字は追加しない
    if (!title) return;
    onAdd(title);
    setText("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="新しいタスクを入力"
        aria-label="新しいタスク"
      />
      <button type="submit">追加</button>
    </form>
  );
}

export default TaskForm;
