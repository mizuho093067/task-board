import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskItem from "./components/TaskItem.jsx";

// ローカルストレージの保存キー
const STORAGE_KEY = "task-board.tasks";

// 保存済みのタスクを読み込む（読めない・壊れている場合は空にする）
const loadTasks = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

function App() {
  // タスク一覧（id・タイトル・完了状態を持つ）
  const [tasks, setTasks] = useState(loadTasks);

  // タスクが変わるたびにローカルストレージへ保存する
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // 保存できない環境（プライベートモードなど）では何もしない
    }
  }, [tasks]);

  // タスクを追加する
  const addTask = (title) => {
    setTasks([...tasks, { id: crypto.randomUUID(), title, done: false }]);
  };

  // 完了・未完了を切り替える
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  // タスクを削除する
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const doneCount = tasks.filter((task) => task.done).length;

  return (
    <main className="board">
      <h1>タスクボード</h1>
      <TaskForm onAdd={addTask} />

      {tasks.length === 0 ? (
        <p className="empty">タスクはまだありません</p>
      ) : (
        <>
          <ul className="task-list">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </ul>
          <p className="summary">
            完了 {doneCount} / {tasks.length} 件
          </p>
        </>
      )}
    </main>
  );
}

export default App;
