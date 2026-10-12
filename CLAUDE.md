# CLAUDE.md

このファイルは、Claude Code がこのリポジトリで作業する際のガイドです。

## プロジェクト概要

- **プロジェクト名**: task-board
- **内容**: タスク管理ボードアプリ
- **技術スタック**: React 19 / Vite 8 / JavaScript（JSX）/ CSS

## GitHubリポジトリ

https://github.com/mizuho093067/task-board

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

- 公開URL: https://mizuho093067.github.io/task-board/
- `main` にプッシュすると、GitHub Actions（`.github/workflows/deploy.yml`）が自動でビルドして公開する。
- 本番ビルドは `/task-board/` 配下で動く前提（`vite.config.js` の `base`）。リポジトリ名を変えた場合はここも変更する。
- 公開と同じ状態の確認は `npm run build` → `npm run preview` → http://localhost:4173/task-board/ で行う。

## コーディング規約

- コンポーネントは関数コンポーネントと Hooks（`useState` など）で書く。
- コンポーネントは `src/components/` に1ファイル1コンポーネントで置き、ファイル名はパスカルケース（例: `TaskItem.jsx`）。
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
