# Archive – FE-06 & FE-07 (Admin UI Cleanup & Tag Input UI)

## Summary
- **FE-06:** 管理画面レイアウトをレスポンシブ対応し、モバイル時はハンバーガーメニューでサイドバーをトグル可能に。
- **FE-07:** Notion ライクなタグ入力 UI を導入し、既存タグ候補を一覧／ドロップダウンで選択可能に。

## Key Files
- `app/admin/layout.tsx`
- `components/TagInput.tsx`
- `components/ArticleEditorForm.tsx`
- `memory-bank/reflection/reflection-FE-06-07.md`

## Build Artifacts
- Docker イメージ `soma-pages_frontend:latest` (タグ UI 含む)

## Verification Checklist
| 項目 | 充足 |
|------|------|
| レイアウト崩れなし（モバイル/デスクトップ） | ✅ |
| タグ追加/削除がキーボード・クリックで可能 | ✅ |
| 既存タグの候補表示 | ✅ |
| ESLint 重大エラーなし (警告は残) | ⚠️ |

---

_Archived: 2025-06-12_ 