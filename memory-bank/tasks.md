# Task: hand-dot.com 風 シンプルブログサイト作成

## 説明
`hand-dot.com` のようなシックな雰囲気のシンプルなブログ風ポートフォリオサイトを Next.js, React, TypeScript, TailwindCSS を用いて作成する。主要なセクションは「Main (About)」「Articles (一覧と詳細)」「Header」「Footer」。

## 複雑度
Level: 3 (スコープ調整版)
Type: Intermediate Feature

## Technology Stack
- Framework: Next.js 15.1
- UI Library: React 19
- Language: TypeScript (最新の安定版)
- Styling: TailwindCSS (最新の安定版)
- Markdown Processing: remark, remark-html (または next-mdx-remote)
- Data Management: (主にMarkdown frontmatter, 必要であればシンプルなJSON)
- Image Optimization: next/image

## Technology Validation Checkpoints
- [ ] Next.js プロジェクト初期化コマンド (`create-next-app`) 実行と確認
- [ ] TypeScript, TailwindCSS 設定の確認と基本動作検証
- [ ] 最小限のヘッダー、フッター、メインコンテンツエリアを持つページの表示確認
- [ ] `next/image` による画像表示の基本動作確認
- [ ] `remark`, `remark-html` (または `next-mdx-remote`) による Markdown 表示の基本動作確認 (サンプル記事1つでOK)
- [ ] 基本的なビルド (`next build`) が成功すること

## Status
- [x] Initialization complete (VAN mode)
- [x] Planning complete (詳細計画済み、スコープ調整開始)
- [x] Plan refinement complete (スコープ調整完了)
- [ ] Technology validation complete
- [ ] Implementation: Header and Footer
- [ ] Implementation: Main Section (About)
- [ ] Implementation: Articles Section (List & Detail page)
- [ ] Implementation: Basic Responsive Design
- [ ] Implementation: Styling for "chic" feel
- [ ] Testing: Basic manual testing
- [ ] Documentation: Minimal README

## Implementation Plan (Simplified for rapid development)

### Phase 1: Project Setup & Core Structure (Technology Validation)
1.  **Project Initialization & Basic Configuration**
    *   [ ] `create-next-app` で Next.js プロジェクトを作成 (TypeScript, TailwindCSS 統合)
    *   [ ] ESLint, Prettier の設定 (推奨)
    *   [ ] `tailwind.config.js` の基本設定 (カラーパレット `white`, `black`, `blue`、システムフォント)
    *   [ ] グローバル CSS (`globals.css`) の初期設定 (背景白、文字黒)
    *   [ ] `components` ディレクトリ、`content/articles` ディレクトリの作成
2.  **Core Layout Component (`Layout.tsx`)**
    *   [ ] 最大幅 800px、中央寄せ、左右パディングを適用する共通レイアウトコンポーネントを作成
3.  **"Hello World" / Basic Structure Page (`pages/index.tsx`)**
    *   [ ] `Layout.tsx` を使用し、ヘッダー、メイン、フッターの仮エリアを配置して表示確認
    *   [ ] `next/image` を使ったダミー画像表示テスト
    *   [ ] サンプルのMarkdownファイル (`content/articles/sample.md`) を1つ作成し、その内容 (タイトルと本文一部) をページに表示するテスト
4.  **Version Control**
    *   [ ] Git リポジトリの初期化と最初のコミット

### Phase 2: Header, Footer, and Main Section Implementation
1.  **Header Component (`components/Header.tsx`)**
    *   [ ] サイト名 (例: "My Portfolio") を左上に配置
    *   [ ] ナビゲーションリンク (Blog, (Optional: GitHub/LinkedIn)) を右上に配置
    *   [ ] シンプルなボーダー下線スタイル
2.  **Footer Component (`components/Footer.tsx`)**
    *   [ ] "© [Your Name/Site Name]" テキストを表示
3.  **Main Section (About - `pages/index.tsx` or `components/MainSection.tsx`)**
    *   [ ] 挨拶文 (例: "Hey, I'm [Your Name]! 👋")
    *   [ ] プロフィール画像 (プレースホルダー可、`next/image` 使用)
    *   [ ] 簡単な自己紹介文

### Phase 3: Articles Section (Blog Functionality)
1.  **Sample Markdown Articles (`content/articles/`)**
    *   [ ] 2-3個のサンプル記事Markdownファイルを作成 (frontmatter: title, date, summary)
2.  **Article List (`pages/blog.tsx` or `/` if it's the main content)**
    *   [ ] `content/articles` から記事を読み込み、タイトルと概要(または日付)をリスト表示
    *   [ ] 各記事へのリンク (`/blog/[slug]`)
3.  **Article Detail Page (`pages/blog/[slug].tsx`)**
    *   [ ] Markdown の内容をHTMLに変換して表示 (frontmatter情報も表示)
    *   [ ] 動的ルーティング (`getStaticPaths`, `getStaticProps`) を使用

### Phase 4: Styling & Basic Responsiveness
1.  **Styling for "Chic" Feel**
    *   [ ] `hand-dot.com` を参考に、フォント (システムフォント)、サイズ、余白、配色 (白背景、黒テキスト、青リンク) を調整
    *   [ ] 全体的にミニマルでクリーンなデザインを目指す
2.  **Basic Responsive Design**
    *   [ ] モバイル画面で主要なコンテンツが問題なく閲覧できるように調整 (TailwindCSSのレスポンシブユーティリティ使用)
    *   [ ] ヘッダーナビゲーションの簡単な調整 (例: 折り返し、または項目を減らす)

### Phase 5: Final Touches
1.  **Testing**
    *   [ ] 主要ページの表示とリンクを手動で確認
2.  **Documentation**
    *   [ ] `README.md` に簡単なプロジェクト概要と起動方法を記載

## Creative Phases Required (Simplified)
- [ ] 🎨 **UI/UX Design**: `hand-dot.com` のシンプルでシックな外観（特にフォント、余白、配色）を参考に、主要コンポーネントの基本的なスタイリングを行う。
- [ ] 🏗️ **Architecture Design**: 基本的なコンポーネント（Layout, Header, Footer, ArticleList, ArticleDetail）の構成と、Markdown記事データの読み込み・表示フローを設計する。

## Dependencies (Core)
- `next`
- `react`
- `react-dom`
- `typescript`
- `@types/node`, `@types/react`, `@types/react-dom`
- `tailwindcss`
- `autoprefixer`
- `postcss`
- `remark`, `remark-html` (or `next-mdx-remote`)
- `gray-matter`

## Challenges & Mitigations
- **Challenge 1**: 短時間でのシックなデザイン再現。
    - **Mitigation**: `hand-dot.com` の主要なCSS（フォントファミリー、主要なマージン・パディング値、色）を参考にし、複雑な装飾は避ける。TailwindCSSのユーティリティを最大限活用。
- **Challenge 2**: Markdown処理と動的ルーティングの実装。
    - **Mitigation**: Next.js の公式ドキュメントにあるブログ作成チュートリアルを参考に、基本的な構造を迅速に構築する。 