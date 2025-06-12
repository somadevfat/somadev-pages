# タスク: ヘッドレスCMS構築 (チケット管理)

**タスクID:** `[project_id]`
**複雑度レベル:** 3 (中規模機能開発)
**ステータス:** 実行中 (Implementation)

---

## 概要 (Overview)

このドキュメントは、プロジェクトのタスクをチケット形式で管理します。各チケットは独立したブランチで作業され、`develop`ブランチに統合されます。AI開発者は、各チケットの**Input/Output**を厳守し、指定されたブランチで作業を行ってください。

**長期目標:**
本プロジェクトの最終目標は、単なるブログ用バックエンドに留まらず、**クイズアプリなど他のアプリケーションにも転用可能な、汎用ヘッドレスCMS**を構築することです。将来的には、このCMSバックエンド部分を独立したGitHubリポジトリとして分離し、様々なフロントエンドから利用できる状態を目指します。

**設計ドキュメント:**
- **全体設計:** `docs/PROJECT_DESIGN.md`
- **UI/UX設計:** `memory-bank/creative/creative-admin-ui.md`
- **API設計:** `memory-bank/creative/creative-reusable-api.md`

---

## フェーズ 0: 事前準備 (Prerequisites)

- **タスク:** プロジェクトのクリーンアップ
- **ブランチ:** `feature/G-01-cleanup-notion-client` -> `develop`
- **説明:** 最初に、不要になったNotion関連の依存関係をプロジェクトから完全に削除します。これは後続のすべてのタスクのベースとなります。
- **ステータス:** 完了

---

## フェーズ 1: プロジェクト初期設定 (Setup Phase)

### 🎟️ チケット G-02: 開発環境のコンテナ化

- **担当:** General
- **ブランチ:** `feature/G-02-setup-dev-environment`
- **説明:** Dockerを用いて、バックエンドのみのコンテナ起動構成に変更します。
- **Input:**
    - `docs/PROJECT_DESIGN.md` の開発環境セクション。
- **Output:**
    - プロジェクトルートの `docker-compose.yml` にバックエンドサービスのみが定義される。
    - フロントエンド関連の `.devcontainer` 設定および `Dockerfile.frontend` は削除される。
    - `backend` ディレクトリ内の `Dockerfile` がSpring Bootアプリケーションのビルド・実行用に存在し続ける。
- **ステータス:** 完了

### 🎟️ チケット BE-01: Spring Bootプロジェクト初期化

- **担当:** Backend
- **ブランチ:** `feature/BE-01-init-springboot`
- **説明:** `backend` ディレクトリに、設計ドキュメントで定義された依存関係を持つSpring Bootプロジェクトを作成します。
- **Input:**
    - `docs/PROJECT_DESIGN.md` の技術スタックセクション。
- **Output:**
    - `backend` ディレクトリにSpring Bootプロジェクトの骨格が生成される。
    - `backend/pom.xml` に `spring-boot-starter-web`, `lombok` が含まれている。
    - `backend` ディレクトリで `./mvnw spring-boot:run` を実行すると、アプリケーションがポート8080で起動する。
- **ステータス:** **完了**

---

## フェーズ 2: バックエンド開発 (Backend Team)

### 🎟️ チケット BE-02: 汎用DTOと設定クラスの実装

- **担当:** Backend
- **ブランチ:** `feature/BE-02-implement-dtos-and-config`
- **説明:** APIのデータ構造と設定読み込みの仕組みを実装します。
- **Input:**
    - `memory-bank/creative/creative-reusable-api.md` の実装ガイドライン。
- **Output:**
    - `ContentDto.java` DTOクラスが作成される。
    - `application.properties` からコンテンツのパス設定を読み込むための `@ConfigurationProperties` を持つクラスが作成される。

### 🎟️ チケット BE-03: コントローラーとサービスのダミー実装

- **担当:** Backend
- **ブランチ:** `feature/BE-03-dummy-controller-and-service`
- **説明:** フロントエンドチームが開発を開始できるよう、APIのI/Oを定義したダミーのコントローラーとサービスを実装します。実際のファイル操作は行いません。
- **Input:**
    - `memory-bank/creative/creative-reusable-api.md` のAPI設計。
    - チケットBE-02で作成したDTOと設定クラス。
- **Output:**
    - `ContentController.java` が作成され、各エンドポイント (`/api/contents/{type}`など) が定義される。
    - `ContentService.java` が作成され、各メソッドが固定のダミーデータ（例: `new ContentDto(...)`）を返す。
    - Postmanやcurlで `GET /api/contents/articles/dummy-post` を叩くと、ハードコードされたJSONが返ってくる状態になる。
- **ステータス:** 完了

### 🎟️ チケット BE-03.5: DBコンテナのセットアップ

- **担当:** Backend
- **ブランチ:** `feature/BE-03.5-setup-db-container`
- **説明:** `docker-compose.yml` にPostgreSQLデータベースサービスを追加し、バックエンドサービスが接続できるように設定します。
- **Input:** なし
- **Output:**
    - `docker-compose.yml` に `postgres` サービスが定義される。
    - バックエンドサービスが `depends_on` で `postgres` を待つように設定される。
    - データベースのデータ永続化のため、Docker volumeが設定される。
    - `application.properties` に `spring.datasource` 関連の設定が追加される（接続情報は `docker-compose.yml` の環境変数を参照）。
- **ステータス:** 完了

---

## フェーズ 3: フロントエンド開発 (Frontend Team)

### 🎟️ チケット FE-01: APIクライアントのダミー実装

- **担当:** Frontend
- **ブランチ:** `feature/FE-01-dummy-api-client`
- **説明:** バックエンドAPIが完成する前にUI開発を進めるため、バックエンドの振る舞いを模倣したダミーAPIクライアントを実装します。
- **Input:**
    - `memory-bank/creative/creative-reusable-api.md` のAPI設計とDTO定義。
- **Output:**
    - `lib/api-client.ts` (または類似名) が作成される。
    - `getContents(type)`, `getContent(type, slug)` といった関数が定義され、Promiseでハードコードされたダミーデータを返す。
    - このクライアントは、バックエンドのダミー実装 (BE-03) と同じ構造のデータを返す必要がある。

### 🎟️ チケット FE-02: 管理画面のレイアウトとコンポーネント実装

- **担当:** Frontend
- **ブランチ:** `feature/FE-02-admin-ui-layout`
- **説明:** 管理画面の基本的なレイアウトと、記事編集フォームの静的コンポーネントを実装します。まだデータは連携しません。
- **Input:**
    - `memory-bank/creative/creative-admin-ui.md` のUI/UX設計。
- **Output:**
    - `/app/admin` ルートが作成され、共通のサイドバーなどを持つ `layout.tsx` が配置される。
    - `ArticleEditorForm` コンポーネントが作成され、`@uiw/react-md-editor` を使ったエディタと、メタデータ用のフォーム要素が静的に表示される。

### 🎟️ チケット FE-03: 管理画面とダミーAPIの連携

- **担当:** Frontend
- **ブランチ:** `feature/FE-03-connect-admin-ui-to-dummy-api`
- **説明:** 管理画面にダミーAPIクライアントを接続し、画面にダミーデータを表示させます。
- **Input:**
    - チケットFE-01で作成したダミーAPIクライアント。
    - チケットFE-02で作成した管理画面コンポーネント。
- **Output:**
    - `/admin` の記事一覧ページに、ダミーAPIクライアントが返す記事リストが表示される。
    - `/admin/edit/[slug]` ページで、ダミーAPIクライアントが返す記事データがフォームに初期表示される。

### 🎟️ チケット FE-06: Admin UI Cleanup
- **担当:** Frontend
- **ブランチ:** `feature/FE-06-admin-ui-cleanup`
- **説明:** 管理画面全体のレイアウトとスタイリングを整理し、使いやすく見栄えの良い UI に調整する。
- **ステータス:** 完了

### 🎟️ チケット FE-07: タグ入力 UI の改良
- **担当:** Frontend
- **ブランチ:** `feature/FE-07-tag-input-ui-improvement`
- **説明:** 記事作成/編集画面のタグ入力 UI を改良し、Notion 風のインタラクティブなタグ追加機能を実装する。
- **Input:** 既存 `ArticleEditorForm` コンポーネント、`lucide-react` アイコンライブラリ。
- **Output:**
  - 単純なテキスト入力ではなく、タグごとに独立したチップ UI。
  - クリックで削除、Enter/Tab キーで追加が可能なインタラクティブな UI。
  - レイアウト変更：タグ入力欄をコンテンツエディタの前に配置。
  - タグ入力候補の表示（任意）。
- **ステータス:** 完了

---

## フェーズ 4: 統合と最終化 (Integration Phase)

### 🎟️ チケット BE-04: バックエンドのロジック実装 (マージタスク)

- **担当:** Backend
- **ブランチ:** `feature/BE-04-implement-db-logic`
- **説明:** バックエンドサービスのダミー実装を、**データベース(PostgreSQL)と連携する**実際のロジックに置き換えます。JPAを使用してデータを永続化します。
- **Input:**
    - **マージ元ブランチ:** `feature/BE-03.5-setup-db-container`
    - `docs/PROJECT_DESIGN.md` (改訂版)
- **Output:**
    - `pom.xml`に`spring-boot-starter-data-jpa`と`postgresql`ドライバが追加される。
    - `ContentDto`に対応する`Content`エンティティクラスが作成される。
    - `ContentRepository` (JpaRepository) が作成される。
    - `ContentService`がファイル操作ではなく、`ContentRepository`を通じてDBとやり取りするようになる。
    - APIを叩くと、DBに基づいた内容が返される。
- **ステータス:** 完了 (ただし、`ContentService`がDBではなくファイルシステムを参照する実装になっており、リファクタリングが必要)

### 🎟️ チケット FE-04: フロントエンドのAPI連携 (マージタスク)

- **担当:** Frontend
- **ブランチ:** `feature/FE-04-connect-to-real-api`
- **説明:** フロントエンドのダミーAPIクライアントを、実際のバックエンドAPIを `fetch` で呼び出す実装に置き換えます。
- **Input:**
    - **マージ元ブランチ:** `feature/FE-03-connect-admin-ui-to-dummy-api`
    - チケットBE-04で完成した、動作するバックエンドAPIのエンドポイント。
- **Output:**
    - `lib/api-client.ts` が、ハードコードされた値を返す代わりに `fetch` を使ってバックエンドコンテナのURL (`http://backend:8080/api/...`) を叩くようになる。
- **Pull Request:** https://github.com/somadevfat/somadev-pages/pull/15
- **ステータス:** 完了

### 🎟️ チケット I-01: 最終統合テスト (Final Integration)

- **担当:** General
- **ブランチ:** `feature/I-01-final-integration-test`
- **説明:** 全機能を統合し、Dev Container内で一連のユーザーフローが問題なく動作することを確認します。
- **Input:**
    - **マージ元ブランチ:** `feature/BE-04-implement-db-logic`, `feature/FE-04-connect-to-real-api`
- **Output:**
    - 管理画面から記事を作成 → DBに保存される → 記事一覧に表示される → 記事を編集 → DB内容が更新される → 記事を削除 → DBから削除される、という一連の動作が正常に完了する。
- **ステータス:** 進行中 (BLOCKER: `I-01.1`の完了待ち)

---

## ✅ 完了済みタスク (I-01で実施)

- **[FE] ブログページ エラー修正**
  - `TypeError: Cannot read properties of undefined (reading 'length')` を修正。
- **[FE] 管理画面UI改善**
  - タイトル、日付、タグの表示を修正・追加。
  - 記事を日付の新しい順にソート。

## 🔥 現在の最優先タスク (BLOCKER) 🔥

### 🎟️ チケット I-01.1: バックエンドのDB連携リファクタリング

- **担当:** General
- **ブランチ:** `feature/I-01-final-integration-test` (現在のブランチで作業)
- **説明:** `ContentService`の実装を、ファイルシステム参照からJPA (`ContentRepository`) を使用したDBアクセスに全面的に書き換える。
- **Output:**
    - `ContentService`が`ContentRepository`をインジェクトして使用する。
    - `getContents`, `getContentBySlug`, `createContent`, `updateContent` がDB操作を行うように修正される。
    - API (`/api/contents`) がPostgreSQLと連携して動作するようになる。

---

## フェーズ 5: デプロイとリポジトリ独立 (Deployment & Repository Separation)

### 🎟️ チケット D-01: 本番環境へのデプロイ

- **担当:** General
- **ブランチ:** `feature/D-01-deploy-to-production`
- **説明:** 完成したアプリケーション（フロントエンドとバックエンド）を本番サーバー環境にデプロイします。
- **Input:** `main`ブランチの最新コード。
- **Output:**
    - 本番用の`docker-compose.prod.yml`が作成される。
    - アプリケーションが公開されたURLでアクセス可能になる。
    - CI/CDパイプラインが構築され、`main`ブランチへのマージ時に自動でデプロイが実行されるようになる（任意）。
- **ステータス:** 未着手

### 🎟️ チケット D-02: CMSリポジトリの分離

- **担当:** General
- **ブランチ:** `feature/D-02-separate-cms-repo`
- **説明:** 現在のプロジェクトからバックエンド（Spring Boot）と関連ファイル（Dockerfileなど）を抽出し、新しい独立したGitHubリポジトリに移行します。
- **Input:** `main`ブランチのバックエンド関連コード。
- **Output:**
    - `soma-cms-backend`（仮）という名前の新しいリポジトリが作成される。
    - 新リポジトリにバックエンドのコード履歴がすべて移植される。
    - 元のリポジトリのフロントエンドが、新しいバックエンドリポジトリを参照するように設定が更新される。
- **ステータス:** 未着手

---

## 🎯 新規機能追加: タグ入力＆自動日時メタデータ (Level 3)

### 🎟️ チケット FE-05: フロントエンド – タグ入力フォーム実装
- **担当:** Frontend
- **ブランチ:** `feature/FE-05-tag-input`
- **説明:** 記事作成/編集フォームにタグ入力欄を追加し、API リクエストに `tags: string[]` を含める。
- **Input:** 既存 `ArticleEditorForm`、`lib/api-client.ts`。
- **Output:**
  - `ArticleEditorForm` に複数タグを入力できる UI (カンマ区切りのテキスト入力、または簡易 Chip UI)。
  - `createContent` / `updateContent` 呼び出し時に `tags` 配列を送信。
  - 新規記事作成後、UI 側で成功メッセージを表示。

### 🎟️ チケット BE-05: バックエンド – メタデータ拡張 (`tags`, `dateTime`)
- **担当:** Backend
- **ブランチ:** `feature/BE-05-tags-and-datetime`
- **説明:** `ContentCreateRequestDto`, `ContentUpdateRequestDto`, `ContentService` を拡張し、
  `metadata.tags` と `metadata.dateTime` (ISO8601) を正しく保存・更新する。
- **Input:** 既存 DTO, Service, Repository。
- **Output:**
  - DTO に `List<String> tags` フィールドを追加。
  - `createContent()` で `tags` をそのまま保存、`dateTime` に `LocalDateTime.now()` を設定。
  - `updateContent()` で `tags` を更新可能に。
  - 既存 API 互換性を維持 (必須フィールドのバリデーション追加)。

---

### 📝 Level 3 計画ドキュメント

#### 1. Requirements Analysis
- ユーザーは記事作成/編集時に複数タグを入力できる必要がある。
- 記事新規作成時、メタデータに現在日時 (`dateTime`) を自動で保存する。
- 既存 API / UI フローとの互換性を壊さないこと。

#### 2. Components Affected
- Frontend: `components/ArticleEditorForm.tsx`, `lib/api-client.ts`.
- Backend: `ContentCreateRequestDto.java`, `ContentUpdateRequestDto.java`, `ContentService.java`.

#### 3. Architecture Considerations
- `Content` エンティティ自体は変更せず、`metadata` JSON 内に `tags`, `dateTime` を格納する方式を継続。
- DB スキーマ変更不要。

#### 4. Implementation Strategy
1. **Frontend**
   1. `ArticleEditorForm` にタグ入力欄を追加 (カンマ区切り文字列を state として保持し、送信前に `string.split(',')` → `trim()` で配列化)。
   2. `createContent` / `updateContent` のパラメータ型に `tags: string[]` を追加。
   3. バリデーション: 空タグは除外、最大 5 タグ程度に制限。
2. **Backend**
   1. DTO に `List<String> tags` を追加。
   2. `createContent` で `dateTime = LocalDateTime.now()` を `metadata` に追加し、`tags` をそのまま保存。
   3. `updateContent` で `tags` を更新 (渡されない場合は既存値を保持)。
   4. 単体テスト: Service レイヤでタグと日時が正しく保存されることを検証。

#### 5. Detailed Steps & Checklist
- [ ] FE: UI にタグ入力欄を追加
- [ ] FE: `api-client.ts` に `tags` 送信ロジック
- [ ] BE: DTO クラスに `tags` 追加
- [ ] BE: `ContentService` create/update ロジック改修
- [ ] BE: Unit Test 追加 (`ContentServiceTests`)
- [ ] FE: 動作確認 – 記事作成/編集でタグが保持される
- [ ] FE: 記事一覧ページでタグ表示 (任意)

#### 6. Dependencies
- Lombok Getter/Setter 自動生成 (既存) – 追加フィールド用。
- `@JsonInclude` / `@JsonProperty` は不要 (Jackson のデフォルト設定を利用)。

#### 7. Challenges & Mitigations
- **タグの入力 UI**: 将来的にリッチ UI に差し替える可能性 → 今回はシンプルなテキスト入力で実装し、Creative Phase は不要。
- **メタデータ JSON の肥大化**: 検索性確保のため、将来は `tags` 用サブテーブルを検討。

#### 8. Creative Phase Components
- 今回はシンプル UI 採用のため CREATIVE フェーズ不要。

---

⏭️ NEXT MODE: IMPLEMENT MODE (直接実装に進めます)

## 🎯 UI 改善: 管理画面レイアウト整理 (Level 2)

### PLAN テンプレート (Level 2)
- **Overview:**
  管理画面 (`/app/admin` 以下) の sidebar・ヘッダー・コンテンツ領域のスペーシングや配色を調整し、モバイルレスポンシブにも対応する。

- **Files to Modify:**
  1. `app/admin/layout.tsx` – サイドバーのレスポンシブ化、ヘッダー追加。
  2. `app/admin/articles/page.tsx` – テーブルのスタイル調整、overflow 対策。
  3. `components/ArticleEditorForm.tsx` – 入力フォーム幅と余白を統一。
  4. `tailwind.config.js` (必要ならカスタムカラー追加)。

- **Implementation Steps:**
  1. Sidebar を `md:` 以上は固定、`sm:` 以下では隠れる Drawer に変更。
  2. 主コンテンツに共通ヘッダー (タイトル + breadcrumb) を追加。
  3. フォーム & テーブルの max-width を `max-w-3xl` などに制約し、中央寄せ。
  4. Tailwind ユーティリティを整理し、不要なクラスを削減。
  5. モバイル表示でのオーバーフロー／横スクロールを確認。

- **Potential Challenges:**
  • サイドバーのトグル実装（小規模 JS が必要）。
  • Next.js App Router のレイアウトキャッシュによるスタイル更新反映問題。

- **Testing Strategy:**
  1. ローカル `npm run dev` / Docker 上で管理画面を開き、画面幅 375px〜1280px で表示崩れが無いか確認。
  2. UI 部分のみのためユニットテストは不要。ビジュアルリグレッション（任意）。

---

⏭️ NEXT MODE: IMPLEMENT MODE

## 🎯 UI 改善: Notionライクタグ入力UI (Level 3)

### 🎟️ チケット FE-07: タグ入力 UI の改良
- **担当:** Frontend
- **ブランチ:** `feature/FE-07-tag-input-ui-improvement`
- **説明:** 記事作成/編集画面のタグ入力 UI を改良し、Notion 風のインタラクティブなタグ追加機能を実装する。
- **Input:** 既存 `ArticleEditorForm` コンポーネント、`lucide-react` アイコンライブラリ。
- **Output:**
  - 単純なテキスト入力ではなく、タグごとに独立したチップ UI。
  - クリックで削除、Enter/Tab キーで追加が可能なインタラクティブな UI。
  - レイアウト変更：タグ入力欄をコンテンツエディタの前に配置。
  - タグ入力候補の表示（任意）。
- **ステータス:** 完了

---

### 📝 Level 3 計画ドキュメント

#### 1. Requirements Analysis
- ユーザーが直感的にタグを追加・削除できる UI が必要。
- 入力順の問題：タグ入力欄をコンテンツエディタ前（上部）に移動。
- Notion 風のインタラクティブ UI として、タグごとに削除可能なチップ形式を採用。
- 既存のタグ表示・送信機能との互換性を維持。

#### 2. Components Affected
- `components/ArticleEditorForm.tsx` - メインフォームコンポーネント。
- 新規作成: `components/TagInput.tsx` - タグ入力専用コンポーネント。

#### 3. Architecture Considerations
- 親コンポーネント (ArticleEditorForm) から `tags` 配列と更新関数を TagInput へ渡す。
- キーボードイベント (Enter/Tab/Backspace) ハンドリングが必要。
- 静的なデザインより、インタラクション性能が重要。

#### 4. Implementation Strategy
1. **TagInput コンポーネント作成**
   - タグ配列を Props で受け取り、State として管理
   - 入力中テキスト用の State (`inputValue`) 追加
   - タグ追加・削除ロジック実装
   - キーボードイベントハンドラ実装

2. **ArticleEditorForm の調整**
   - 文字列形式ではなく、配列形式でタグを管理
   - 入力順序の変更：タイトル→スラッグ→タグ→コンテンツ
   - 新 TagInput コンポーネントの統合

3. **スタイリング**
   - タグチップ UI のデザイン調整
   - 間隔・配色・フォントサイズの最適化

#### 5. Detailed Steps & Checklist
- [ ] TagInput コンポーネント作成
  - [ ] タグ配列管理機能
  - [ ] 追加・削除・キーボードナビゲーション
  - [ ] タグチップ UI スタイリング
- [ ] ArticleEditorForm 改修
  - [ ] タグ管理を文字列→配列に変更
  - [ ] レイアウト順序変更
  - [ ] TagInput コンポーネント統合
- [ ] 動作確認テスト
  - [ ] 既存タグの表示
  - [ ] 新規タグ追加・削除
  - [ ] Enter/Tab/Backspace キー操作
  - [ ] フォーム送信時の正しいタグ配列生成

#### 6. Dependencies
- `lucide-react` - アイコン表示用ライブラリ（既にインストール済み）

#### 7. Challenges & Mitigations
- **キーボードイベント処理**: Tab キーのデフォルト動作（フォーカス移動）との競合 → `e.preventDefault()` で制御
- **フォーカス管理**: 新タグ追加後の入力欄への自動フォーカス → `useRef` + `focus()` で制御
- **レスポンシブ対応**: 小画面でのタグチップ表示 → Flexbox wrap 対応

#### 8. Creative Phase Components
- 今回は UI のみのため CREATIVE フェーズ不要、直接実装に進む

---

⏭️ NEXT MODE: IMPLEMENT MODE
