# CLAUDE.md

このファイルは、Claude Code がこのリポジトリで作業する際のガイドです。

## プロジェクト概要

- **プロジェクト名**: task-board
- **内容**: タスク管理ボードアプリ
- **技術スタック**: React 19 / Vite 8 / JavaScript（JSX）/ CSS（詳細は「技術スタック」の項を参照）

## GitHubリポジトリ

https://github.com/mizuho093067/task-board

## デプロイ先

https://mizuho093067.github.io/task-board/

## 技術スタック

| 分類 | 使用技術 | 補足 |
| --- | --- | --- |
| UI ライブラリ | React 19（`react` / `react-dom`） | 関数コンポーネント + Hooks |
| ビルドツール | Vite 8 + `@vitejs/plugin-react` | 開発サーバーと本番ビルド |
| 言語 | JavaScript（JSX） | TypeScript は使っていない |
| スタイル | 素の CSS（`src/App.css`） | CSS フレームワーク・CSS-in-JS は使っていない |
| データ保存 | ブラウザの localStorage | サーバー・データベースはなし |
| ホスティング | GitHub Pages | GitHub Actions で自動デプロイ |
| 実行環境 | Node.js 24 | ローカル開発・GitHub Actions 共通 |

- 外部ライブラリは必要になるまで追加しない。追加する場合は理由をユーザーに説明してから入れる。

## コミュニケーション

- 返答は**必ず日本語**で行うこと。
- コード内のコメントも日本語で記述する。

## Git運用ルール

- **コードを変更するたびに、必ずコミットして GitHub にプッシュすること。**
  - 1つの作業（機能追加・修正など）が終わったら、まとめて放置せずにその都度プッシュする。
  - 手順:
    ```
    git add <変更したファイル>
    git commit -m "変更内容の説明"
    git push origin main
    ```
- ブランチは `main` を使用する。
- コミットメッセージは**日本語**で、何を変更したかが分かるように簡潔に書く。
  - 例: `タスクの削除機能を追加`、`カードのレイアウト崩れを修正`
- プッシュに失敗した場合は、エラー内容を報告し、強制プッシュ（`--force`）は行わないこと。
- 不要なファイル（テスト用の一時ファイルなど）はコミットしない。

## ファイル構成

```
task-board/
├── CLAUDE.md               # このファイル
├── index.html              # エントリーポイントの HTML
├── package.json            # 依存パッケージとスクリプト
├── vite.config.js          # Vite の設定（本番のベースパス /task-board/）
├── .github/workflows/
│   └── deploy.yml          # GitHub Pages への自動デプロイ
└── src/
    ├── main.jsx            # React の起動処理
    ├── App.jsx             # タスクの状態管理（追加・切り替え・削除・保存）
    ├── App.css             # スタイル
    └── components/
        ├── TaskForm.jsx    # タスク入力フォーム
        └── TaskItem.jsx    # タスク1件分の表示
```

## 開発・実行方法

- 初回のみ `npm install` で依存パッケージをインストールする。
- `npm run dev` で開発サーバーを起動し、表示された URL（通常 http://localhost:5173）をブラウザで開く。
- `npm run build` で本番用ファイルを `dist/` に出力する。
- `node_modules/` と `dist/` はコミットしない（`.gitignore` で除外済み）。
- コードを変更したら、プッシュ前に `npm run build` が通ることを確認する。

## 公開（GitHub Pages）

- 公開先は「デプロイ先」の URL。
- `main` にプッシュすると、GitHub Actions（`.github/workflows/deploy.yml`）が自動でビルドして公開する。
- 本番ビルドは `/task-board/` 配下で動く前提（`vite.config.js` の `base`）。リポジトリ名を変えた場合はここも変更する。
- 公開と同じ状態の確認は `npm run build` → `npm run preview` → http://localhost:4173/task-board/ で行う。

## コーディング規約

- コンポーネントは関数コンポーネントと Hooks（`useState` など）で書く。
- コンポーネントは `src/components/` に1ファイル1コンポーネントで置く（ルートの `App.jsx` のみ `src/` 直下）。
- JavaScript は `const` / `let` を使用し、`var` は使わない。
- 変数名・関数名はキャメルケース（例: `toggleTask`, `doneCount`）。
- state は直接書き換えず、新しい配列・オブジェクトを作って更新する。

```js
// タスクデータの例
const tasks = [
  {
    id: "…",            // crypto.randomUUID() で生成
    title: "買い物に行く",
    done: false         // 完了済みなら true
  }
];
```

### コンポーネントの命名規約

| 対象 | ルール | 例 |
| --- | --- | --- |
| コンポーネント名 | パスカルケース。タスク関連は `Task` + 役割 | `TaskForm`, `TaskItem` |
| ファイル名 | コンポーネント名と同じ + `.jsx` | `TaskItem.jsx` |
| export | `function` で定義し、ファイル末尾で `export default` | `export default TaskItem;` |
| イベント用の props | `on` + 動詞 | `onAdd`, `onToggle`, `onDelete` |
| コンポーネント内のイベント処理 | `handle` + イベント名 | `handleSubmit` |
| state を更新する関数 | 動詞 + 対象（`App.jsx` に置き、props で渡す） | `addTask`, `toggleTask`, `deleteTask` |
| データを渡す props | 単数形の名詞 | `task` |
| CSS クラス名 | ケバブケース。コンポーネントに対応する名前にする | `task-form`, `task-item`, `delete-button` |
| 状態を表すクラス | 基本クラスに追加する形容詞 | `task-item done` |

- 新しいコンポーネントを作るときは、上の規約に合わせて既存の `TaskForm` / `TaskItem` と同じ書き方にする。
- state はできるだけ `App.jsx` にまとめ、子コンポーネントは props で受け取って表示とイベント通知に専念する。

## 主な機能

- テキスト入力でタスクを追加する（空文字は追加しない）
- チェックボックスで完了・未完了を切り替える
- タスクを削除する
- 完了済みのタスクはグレー（取り消し線付き）で表示する
- 完了件数 / 全件数を表示する
- タスクをローカルストレージに保存し、再読み込み後も保持する

## 注意事項

- スマートフォンでも見やすいレスポンシブデザインにする。
- タスクはブラウザのローカルストレージ（キー: `task-board.tasks`）に保存しており、再読み込みしても残る。データ形式を変える場合は、保存済みの古いデータも読めるように配慮する。
