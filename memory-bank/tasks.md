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

### 🎟️ チケット FE-08: ログイン画面の実装
- **担当:** Frontend
- **ブランチ:** `feature/FE-08-login-page`
- **説明:** ユーザーが認証するためのログインUIを実装する。
- **Input:** BE-06で実装された `/api/auth/login` エンドポイント。
- **Output:**
  - [x] `/login` ルートにメールアドレスとパスワードの入力フォームを設置する。
  - [x] フォーム送信時に `/api/proxy/auth/login` へPOSTリクエストを送信する。
  - [x] ログイン成功時、返却されたJWTをCookieに保存する。
  - [x] ログイン成功後、`/admin/articles` へリダイレクトする。
  - [x] ログイン失敗時、画面にエラーメッセージを表示する。
- **ステータス:** **完了**

### 🎟️ チケット FE-09: 管理画面のルートガードとログアウト実装
- **担当:** Frontend
- **ブランチ:** `feature/FE-09-admin-route-guard`
- **説明:** 未認証ユーザーが管理画面にアクセスできないように保護し、ログアウト機能を実装する。
- **Output:**
  - [x] `/admin/**` へのアクセスを検証する`middleware.ts`を作成する。
  - [x] 未認証の場合、`/login`へリダイレクトさせる。
  - [x] 管理画面のレイアウトにログアウトボタンを設置する。
  - [x] ログアウトボタンクリック時、Cookieを削除し`/login`へリダイレクトさせる。
  - [x] ルートガードとログアウト機能を検証するE2Eテストを追加する。
- **ステータス:** **完了**

### 🎟️ チケット FE-10: レスポンシブ ハンバーガーメニュー実装
- **担当:** Frontend
- **ブランチ:** `feature/FE-10-responsive-hamburger-menu`
- **説明:** 画面幅に応じてヘッダーのグローバルメニューをハンバーガーメニューに切り替える。スマホ画面では常にハンバーガー、PC 画面でも横幅が一定以下の場合はハンバーガーを表示する。
- **Input:** `components/Header.tsx` に存在する現行ナビゲーション実装、Tailwind CSS のブレークポイント設定。
- **Output:**
  - 新しいハンバーガーアイコン (Lucide icon) を追加し、クリックでドロワーメニューがスライドイン / アウトする。
  - スマホサイズ (`sm`) では常にハンバーガー表示、PC サイズでも `md` 未満に縮小した場合はハンバーガー表示へ切替。
  - ドロワーメニューはキーボード操作 (Esc で閉じる) に対応し、アクセシビリティ属性 (`aria-*`) を付与する。
  - Playwright でメニュー開閉が正しく動作する E2E テストケースを追加する。
- **ステータス:** 未着手

#### 📝 Level 2 Plan (FE-10: レスポンシブ ハンバーガーメニュー実装)

1. 📋 **Overview**
   - 既存ヘッダー (`components/Header.tsx`) をレスポンシブ対応させ、画面幅に応じてハンバーガーメニューへ切り替える。
   - スマホサイズ (`<640px`) では常時ハンバーガーメニュー、PC 画面でもウィンドウ幅が `md` 未満に縮小するとハンバーガーメニューを表示する。

2. 📁 **Files to Modify / Create**
   - `components/Header.tsx` (メイン変更)
   - `app/globals.css` (必要に応じて汎用クラス追加)
   - `tests/e2e/header-menu.spec.ts` (Playwright E2E)

3. 🔄 **Implementation Steps**
   1. Lucide の `Menu` と `X` アイコンをインポート。
   2. `useState` で `isOpen` を管理し、ハンバーガークリックでトグル。
   3. TailwindCSS `md:hidden` / `md:flex` クラスを用いて、
      - PC 向けメニュー: `hidden md:flex`
      - ハンバーガーアイコン: `md:hidden`
   4. モバイルメニューを `fixed` / `absolute` で画面右からスライドインさせる (transition)。
   5. `Esc` キー押下・リンククリックで `isOpen = false` に。
   6. `aria-expanded` などアクセシビリティ属性を追加。

4. ⚠️ **Potential Challenges**
   - フォーカストラップ & キーボード操作のアクセシビリティ担保。
   - SSR 時に `window` 参照を避ける（不要と思われるが注意）。
   - Tailwind の `transition` と `overflow-hidden` 競合で body スクロールが残る可能性。

5. ✅ **Testing Strategy**
   - **Unit/Component**: `jest` + `@testing-library/react` (任意) でクリック時の DOM 表示を確認。
   - **E2E (必須)**: Playwright で以下を検証。
     1. 画面幅 375px でロード → ハンバーガー表示。
     2. ハンバーガークリック → メニューがスライドインし、リンクが表示される。
     3. リンククリック後にメニューが閉じる。
     4. 画面幅 1440px → PC メニューが表示され、ハンバーガーが非表示。

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
- **ステータス:** **完了**

####  📝 Level 3 計画ドキュメント (I-01.1)

##### 0. Branch Strategy
- **develop から最新を取得し、作業ブランチを同期する**
  ```bash
  # develop を最新化
  git checkout develop
  git pull origin develop

  # 作業ブランチを作成／切り替え
  git checkout -B feature/I-01-final-integration-test

  # develop の変更を取り込み（既にブランチが存在する場合はリベース推奨）
  git pull --rebase origin develop

  # 競合を解消して push
  git push -u origin feature/I-01-final-integration-test
  ```

##### 1. Requirements Analysis
- API `/api/contents` が **PostgreSQL** を介して完全 CRUD (Create / Read / Update / Delete) 可能であること。
- `type` (articles, quizzes など) ごとにコンテンツを分類・取得できること。
- 不足している **Delete** 処理を実装し、テストで保証すること。
- application.properties に **PostgreSQL** 接続設定を追加し、環境変数上書きも可能とすること。
- **ローカル開発** 用に H2 Memory DB プロファイルを用意し、迅速な起動を担保すること。

##### 2. Components Affected
- `backend/src/main/java/com/soma/backend/entity/Content.java`
- `backend/src/main/java/com/soma/backend/repository/ContentRepository.java`
- `backend/src/main/java/com/soma/backend/service/ContentService.java`
- `backend/src/main/java/com/soma/backend/controller/ContentController.java`
- `backend/src/main/resources/application.properties`
- `backend/src/test/java/com/soma/backend` (新規 Integration Test)

##### 3. Architecture Considerations
- `Content` エンティティに `type` カラム (`VARCHAR`) を追加し、`slug` と複合一意制約を検討（将来の拡張用）。
- Spring Data JPA を活用し、`findAllByType`・`findByTypeAndSlug`・`deleteByTypeAndSlug` を Repository に追加。
- Controller → Service → Repository まで `type` をパラメータとして受け渡す設計を統一。
- DB スキーマ更新は `spring.jpa.hibernate.ddl-auto=update` で自動マイグレーションに任せる。

##### 4. Implementation Strategy
1. **Git ブランチ同期 (前述)**
2. **Entity 変更**: `type` フィールド追加 + 既存レコードのデフォルト値 `articles` を設定。
3. **Repository 拡張**: 上記 3 で述べたメソッドを追加。
4. **Service 改修**:
   - 取得系メソッドで `type` でフィルタリング。
   - `deleteContent(type, slug)` を新規実装。
5. **Controller 改修**: DELETE エンドポイント実装。
6. **application.properties** に Postgres 接続設定 (`spring.datasource.*`) を追記し、`@Profile("local")` 用に H2 設定を分離。
7. **統合テスト**: Testcontainers + Postgres で CRUD 動作を検証。

##### 5. Detailed Steps & Checklist
- [x] ブランチを develop から最新化
- [x] `Content` エンティティに `type` 追加
- [x] `ContentRepository` にフィルタ・削除メソッド追加
- [x] `ContentService` で `type` フィルタ & `deleteContent` 実装
- [x] `ContentController` に DELETE 実装
- [x] `application.properties` に Postgres 接続設定追加
- [x] `application-local.properties` (H2) 追加
- [x] Integration Test 作成 (`ContentServiceIntegrationTest`)
- [x] `docker-compose up -d` で手動動作確認

##### 6. Dependencies
- `org.testcontainers:junit-jupiter` (テスト用)
- `org.testcontainers:postgresql`

##### 7. Challenges & Mitigations
- **スキーマ変更による既存データの整合性**: ローカル環境で DB を再構築するか、`ALTER TABLE` を手動実行。
- **Testcontainers の起動コスト**: `@Testcontainers` + `@DynamicPropertySource` で同一コンテナをテストクラス間共有。
- **複合一意制約**: まずは `slug` 単体制約を維持し、将来の拡張時に対応。

##### 8. Creative Phase Components
- 今回は UI/UX やアルゴリズムの大規模設計は不要のため **CREATIVE フェーズは不要**。

⏭️ NEXT MODE: IMPLEMENT MODE

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
- **ステータス:** **完了**

### 🎟️ チケット I-02: 記事CRUD機能のE2Eテストと最終調整
- **担当:** Frontend
- **ブランチ:** `feature/I-02-final-e2e-crud-test`
- **説明:** 記事のCRUD操作全体をカバーする、堅牢なE2Eテストスイートを実装する。
- **ステータス:** **完了**

### 📝 Level 3 計画ドキュメント (I-01.2: UI セレクタ整合)

#### 0. Overview
Playwright E2E テストが期待する `data-testid` と実際の管理画面 UI コンポーネントが不一致のため、画面側へテスト用セレクタを追加しテキストを統一する。

#### 1. Files to Modify
- `app/admin/articles/page.tsx` (一覧ページ)  
- `app/admin/new/page.tsx` + `components/ArticleEditorForm.tsx` (新規作成フォーム)  
- `app/admin/edit/[slug]/page.tsx` (編集ページがある場合)  
- `components/TagInput.tsx`（タグ入力のテスト用セレクタ）  
- `tests/e2e/article-crud.spec.ts`（ロケータを data-testid ベースに統一）

#### 2. Implementation Steps
1. 各操作ボタン・入力・モーダルに `data-testid` 属性を付与
   - 例: 新規ボタン `data-testid="new-article-button"`
   - 編集 `data-testid="edit-{slug}"`
   - 削除 `data-testid="delete-{slug}"`
   - 入力欄 `title-input`, `slug-input`, `content-textarea`, `tag-input`
2. UI 文言を Playwright 側に合わせる or テスト側をセレクタ中心にリファクタ
3. Playwright スクリプトを `getByTestId` (`[data-testid="..."]`) へ変更し可読性を向上
4. `docker-compose.e2e.yml` で再実行 → テストがグリーンになるまで微調整

#### 3. Potential Challenges
- Next.js サーバ再ビルド待ちでタイムアウト → Playwright `expect(...).toBeVisible({ timeout: 10000 })`
- スラッグ生成ロジックが重複し slug が衝突 → テスト用 slug を固定し、テスト開始時に既存記事を削除

#### 4. Testing Strategy
- ローカル: `npm run test:e2e` で緑になることを確認
- CI: GitHub Actions ワークフローで E2E ジョブ成功

⏭️ NEXT MODE: IMPLEMENT MODE

## フェーズ 4 進捗まとめ

### 🎟️ チケット I-01 & I-02: E2E 統合テスト **完了**

| 検証項目 | 結果 |
|----------|------|
| Playwright CRUD / API テスト | ✅ |
| `data-testid` 付与による UI 自動テスト対応 | ✅ |
| GitHub Actions `frontend-test` / `backend-test` / `e2e-test` | ✅ |
| Docker Compose v2 対応 (`docker compose`) | ✅ |
| Playwright イメージ 1.53.0-jammy へ更新 | ✅ |

これにより I-01, I-02 フェーズの目的（CI 上での統合テスト自動化）は達成されました。

---

## フェーズ 5: デプロイ準備 (Deployment Phase)

| チケットID | 内容 | ブランチ | 担当 |
|------------|------|----------|------|
| **CD-01** | Docker イメージのビルド & GHCR への Push ワークフロー追加 | `feature/CD-01-ghcr-push` | DevOps |
| **INF-01** | 本番用 PostgreSQL と GitHub Secrets の整備 | `feature/INF-01-prod-db-secrets` | Infrastructure |
| **BE-05-flyway-and-prod-profile** | 外部 Postgres 接続 + Flyway マイグレーション & `prod` プロファイル実装 | `feature/BE-05-external-postgres` | Backend |
| **OPS-01** | Nginx (または Traefik) による HTTPS リバースプロキシ設定 | `feature/OPS-01-nginx-https` | DevOps |

### TODO Checklist
- [ ] CD-01: GHCR へ backend / frontend イメージ自動 Push
- [ ] INF-01: 本番 DB 構築 & 接続シークレット登録
- [x] BE-05-flyway-and-prod-profile: `prod` プロファイルでの外部 Postgres 対応 + Flyway 移行スクリプト
- [ ] OPS-01: HTTPS 終端 & リバースプロキシ構築
- [ ] README / ドキュメント更新（デプロイ手順）

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

### 🎟️ チケット BE-05-tags-and-datetime (完了): バックエンド – メタデータ拡張 (`tags`, `dateTime`)
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
- [x] FE: UI にタグ入力欄を追加
- [x] FE: `api-client.ts` に `tags` 送信ロジック
- [x] BE: DTO クラスに `tags` 追加
- [x] BE: `ContentService` create/update ロジック改修
- [x] BE: Unit Test 追加 (`ContentServiceTests`)
- [x] FE: 動作確認 – 記事作成/編集でタグが保持される
- [x] FE: 記事一覧ページでタグ表示 (任意)

#### 6. Dependencies
- Lombok Getter/Setter 自動生成 (既存) – 追加フィールド用。
- `@JsonInclude` / `@JsonProperty` は不要 (Jackson のデフォルト設定を利用)。

#### 7. Challenges & Mitigations
- **タグの入力 UI**: 将来的にリッチ UI に差し替える可能性 → 今回はシンプルなテキスト入力で実装し、Creative Phase は不要。
- **メタデータ JSON の肥大化**: 検索性確保のため、将来は `tags` 用サブテーブルを検討。

#### 8. Creative Phase Components
- 今回はシンプル UI 採用のため CREATIVE フェーズ不要、直接実装に進む

---

⏭️ NEXT MODE: IMPLEMENT MODE

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
- [x] TagInput コンポーネント作成
  - [x] タグ配列管理機能
  - [x] 追加・削除・キーボードナビゲーション
  - [x] タグチップ UI スタイリング
- [x] ArticleEditorForm 改修
  - [x] タグ管理を文字列→配列に変更
  - [x] レイアウト順序変更
  - [x] TagInput コンポーネント統合
- [x] 動作確認テスト
  - [x] 既存タグの表示
  - [x] 新規タグ追加・削除
  - [x] Enter/Tab/Backspace キー操作
  - [x] フォーム送信時の正しいタグ配列生成

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

## フェーズ 3.5: 認証機能追加 (Auth Phase)

### 🎟️ チケット BE-06: 認証 API の実装
- **担当:** Backend
- **ブランチ:** `feature/BE-06-auth-api`
- **説明:** Spring Security + JWT を用いて login / refresh / user-info エンドポイントを実装し、Admin UI と連携できるトークンを発行する。
- **Output:**
  - `AuthController` (`/api/auth/login`, `/api/auth/refresh`)
  - `User` エンティティ & `UserRepository`
  - `PasswordEncoder` に `BCrypt`
  - JWT 署名鍵を `application.properties` で管理（Secrets 上書き可）。
  - 統合テスト：正しい資格情報で 200 / 誤認証で 401 を確認。
- **ステータス:** 完了

### 🎟️ チケット FE-08: ログイン画面の実装
- **担当:** Frontend
- **ブランチ:** `feature/FE-08-login-page`
- **説明:** ユーザーが認証するためのログインUIを実装する。
- **Input:** BE-06で実装された `/api/auth/login` エンドポイント。
- **Output:**
  - [x] `/login` ルートにメールアドレスとパスワードの入力フォームを設置する。
  - [x] フォーム送信時に `/api/proxy/auth/login` へPOSTリクエストを送信する。
  - [x] ログイン成功時、返却されたJWTをCookieに保存する。
  - [x] ログイン成功後、`/admin/articles` へリダイレクトする。
  - [x] ログイン失敗時、画面にエラーメッセージを表示する。
- **ステータス:** **完了**

### 🎟️ チケット FE-09: 管理画面のルートガードとログアウト実装
- **担当:** Frontend
- **ブランチ:** `feature/FE-09-admin-route-guard`
- **説明:** 未認証ユーザーが管理画面にアクセスできないように保護し、ログアウト機能を実装する。
- **Output:**
  - [x] `/admin/**` へのアクセスを検証する`middleware.ts`を作成する。
  - [x] 未認証の場合、`/login`へリダイレクトさせる。
  - [x] 管理画面のレイアウトにログアウトボタンを設置する。
  - [x] ログアウトボタンクリック時、Cookieを削除し`/login`へリダイレクトさせる。
  - [x] ルートガードとログアウト機能を検証するE2Eテストを追加する。
- **ステータス:** **完了**

### TODO Checklist (Auth Phase)
- [x] BE-06: JWT 認証 API
- [x] FE-08: ログイン画面
- [x] FE-09: 管理画面ルートガード

---

## フェーズ6: セキュリティ強化 (Security Hardening)

このフェーズでは、アプリケーションの堅牢性を高め、一般的なウェブの脅威から保護するための改善を行います。

### 🎟️ チケット BE-07: バックエンド基礎セキュリティ強化 (Level 3)

- **担当:** Backend, Frontend
- **ブランチ:** `feature/BE-07-security-hardening`
- **説明:** バックエンドの基本的なセキュリティ設定を強化し、フロントエンドの認証メカニズムをより安全な方式に更新します。
- **Output:**
    - [x] **シークレット管理:** JWT署名キーを`application.properties`に移動し、環境変数から読み込めるようにする (`@Value("${app.jwt.secret}")`)。
    - [x] **Docker環境修正:** `application-prod.properties`を分離し、`docker-compose.yml`に必要な環境変数を追加。
    - [x] **データ初期化:** `DataInitializer`にダミーコンテンツ作成機能を追加してAPI動作確認を可能にする。
    - [ ] **セキュアなCookie:**
        - [ ] `AuthController`の`/login`エンドポイントは、JWTをレスポンスボディで返す代わりに、`HttpOnly`, `Secure`, `SameSite=Strict`属性を持つCookieとして設定するように変更する。
        - [ ] フロントエンドのログイン処理を、レスポンスのCookieを自動的にブラウザに保存する方式に変更する。
        - [ ] フロントエンドのAPIクライアントから、手動で`Authorization`ヘッダーを付与する処理を削除する（Cookieは自動で送信されるため）。
    - [x] **グローバル例外処理:** `@RestControllerAdvice`を使用してグローバルな例外ハンドラを実装し、スタックトレースなどの詳細なエラー情報がクライアントに漏洩しないようにする。
    - [x] **セキュリティヘッダー:** Spring Securityの設定で、`X-Content-Type-Options`, `Content-Security-Policy`, `Strict-Transport-Security`などのセキュリティ関連HTTPヘッダーを追加する。
- **ステータス:** **部分完了** (Docker環境とJWT設定の修正完了、セキュアCookie実装は継続中)

### 🎟️ チケット BE-08: レートリミットの実装 (Level 2)

- **担当:** Backend
- **ブランチ:** `feature/BE-08-rate-limiting`
- **説明:** ブルートフォース攻撃を防ぐため、認証エンドポイントにレートリミットを導入します。
- **Output:**
    - [x] `bucket4j`などのライブラリを`pom.xml`に追加する。
    - [x] `/api/auth/login`エンドポイントに対して、IPアドレスごとに一定時間内の試行回数制限を設ける。
    - [x] 制限を超えた場合にHTTPステータスコード`429 Too Many Requests`を返す。
- **ステータス:** 完了

### 🎟️ チケット BE-09: ロールベースアクセス制御(RBAC)の実装 (Level 3)

- **担当:** Backend
- **ブランチ:** `feature/BE-09-rbac-implementation`
- **説明:** ユーザーの役割に基づいてAPIへのアクセスを制御する仕組みを導入します。
- **Output:**
    - [x] `Role`エンティティ（例: `ROLE_ADMIN`, `ROLE_USER`）を作成し、`User`エンティティと多対多の関連付けを行う。
    - [x] データ初期化時に管理者ユーザーを作成する仕組みを用意する（`CommandLineRunner`など）。
    - [x] `CustomUserDetailsService`がユーザーのロール情報を正しく`GrantedAuthority`として読み込むように修正する。
    - [x] コンテンツの作成・更新・削除など、管理者権限が必要なAPIエンドポイントに`@PreAuthorize("hasRole('ADMIN')")`アノテーションを追加してアクセスを制限する。
    - [x] 権限がない場合にHTTPステータスコード`403 Forbidden`が返ることを確認するテストを追加する。

#### 📝 Level 3 計画ドキュメント (BE-09)

##### 1. Requirements Analysis (要件分析)
- **コア要件:**
    - `ADMIN`と`USER`の2つの役割（Role）を定義する。
    - ユーザー(User)と役割(Role)を多対多で関連付ける。
    - APIエンドポイントごとに、必要な役割（例: `ADMIN`のみ）を設定してアクセスを制限できるようにする。
    - 権限がないアクセスに対しては、HTTPステータスコード `403 Forbidden` を返す。
- **技術的制約:**
    - Spring Securityの `@PreAuthorize` アノテーションまたは同等のメカニズムを利用する。
    - 既存のJWT認証フローと連携させる。トークン内に役割情報を含める。

##### 2. Components Affected (影響を受けるコンポーネント)
- `com.soma.backend.entity.User`: `Role`エンティティとの関連付けを追加。
- `com.soma.backend.security.CustomUserDetailsService`: JWT生成/検証時に役割情報を読み込むように修正。
- `com.soma.backend.security.JwtTokenProvider` (または同等のクラス): トークンのクレームに役割情報を含めるように修正。
- `com.soma.backend.controller.ContentController`: `CUD` (作成、更新、削除) 操作を行うエンドポイントにアクセス制限を追加。
- `com.soma.backend.config.SecurityConfig`: メソッドレベルのセキュリティを有効化する設定を追加。
- `com.soma.backend.DataInitializer`: `ADMIN`ロールを持つ初期ユーザーを作成するロジックを追加。
- **新規作成:**
    - `com.soma.backend.entity.Role`: 役割を表現するJPAエンティティ。
    - `com.soma.backend.repository.RoleRepository`: `Role`エンティティのJPAリポジトリ。

##### 3. Architecture Considerations (アーキテクチャに関する考慮事項)
- `Role`エンティティには `id` と `name` (例: `ROLE_ADMIN`) を持たせる。
- `User`エンティティには `Set<Role> roles` のような形で関連を定義する。
- データベース起動時に`DataInitializer`で`ADMIN`と`USER`のロールがDBに存在することを確認し、なければ作成する。
- JWTのペイロードに `roles: ["ROLE_ADMIN"]` のような形で役割のリストを含める。これにより、リクエストごとにDBへ問い合わせることなく認可チェックが可能になる。

##### 4. Implementation Strategy (実装戦略)
1.  **ドメイン層の実装:**
    -   [x] `Role`エンティティと`RoleRepository`を作成する。
    -   [x] `User`エンティティに`Role`との関連（`@ManyToMany`）を追加する。
2.  **セキュリティ設定の更新:**
    -   [x] `SecurityConfig`で `@EnableGlobalMethodSecurity(prePostEnabled = true)` を有効化する。
    -   [x] `JwtTokenProvider`を修正し、JWT作成時にユーザーの役割をクレームに追加する。
    -   [x] `CustomUserDetailsService`を修正し、`UserDetails`オブジェクトに`GrantedAuthority`として役割情報を設定する。
3.  **アクセス制御の適用:**
    -   [x] `ContentController`の`create`, `update`, `delete`のエンドポイントに `@PreAuthorize("hasRole('ADMIN')")` を追加する。
4.  **データ初期化:**
    -   [x] `DataInitializer`で`ADMIN`ロールを持つユーザーを初期データとして投入するように修正する。
5.  **テスト:**
    -   [x] 管理者権限を持つユーザーと持たないユーザーで保護されたAPIを呼び出し、それぞれ `200 OK` と `403 Forbidden` が返ることを確認するテストケースを追加する。

##### 5. Creative Phase Components (クリエイティブフェーズが必要なコンポーネント)
- このタスクは、確立されたセキュリティパターン（RBAC）の実装であり、新規のUI/UX設計や複雑なアルゴリズム設計を必要としないため、**クリエイティブフェーズは不要**です。

- **ステータス:** **完了**

### 🎟️ チケット CI-01: 依存関係の脆弱性スキャン (Level 2)

- **担当:** DevOps
- **ブランチ:** `feature/CI-01-vulnerability-scan`
- **説明:** CI/CDパイプラインに、既知の脆弱性を持つ依存ライブラリを検出するステップを追加します。
- **Output:**
    - [ ] `pom.xml`に`dependency-check-maven`プラグインを設定する。
    - [ ] GitHub Actionsのワークフローに、`mvn dependency-check:check`を実行するステップを追加する。
    - [ ] 脆弱性が発見された場合にビルドが失敗するように設定する。

---

## 🔍 QA調査記録: Docker環境でのJWT設定問題 (2025-06-16)

### 問題の概要
`docker-compose up`実行時にバックエンドコンテナが起動に失敗し、以下のエラーが発生：
```
Could not resolve placeholder 'app.jwt.secret' in value "${app.jwt.secret}"
```

### 根本原因の調査
1. **初期仮説**: JWT秘密鍵の設定が不足
2. **実際の原因**: 
   - Docker環境で`prod`プロファイルを使用しているが、`application.properties`内の`prod`プロファイル設定にJWT秘密鍵が含まれていなかった
   - `docker-compose.yml`でデータベース接続情報とJWT秘密鍵の環境変数が設定されていなかった

### 解決策の実装
1. **`application-prod.properties`の分離**:
   - 本番環境用の設定を独立したファイルに分離
   - JWT秘密鍵を環境変数から読み込むように設定: `app.jwt.secret=${JWT_SECRET:DefaultSecretKeyIsVeryLongAndShouldBeChangedInProductionEnvironment}`

2. **`docker-compose.yml`の環境変数追加**:
   ```yaml
   environment:
     - SPRING_PROFILES_ACTIVE=prod
     - DB_URL=jdbc:postgresql://db:5432/soma_db
     - DB_USERNAME=soma
     - DB_PASSWORD=password
     - JWT_SECRET=ProductionSecretKeyThatShouldBeChangedInRealDeployment123456789
   ```

3. **`DataInitializer`の拡張**:
   - ダミーコンテンツ作成機能を追加してAPI動作確認を可能にした
   - `dummy-post`記事を自動作成し、`GET /api/contents/articles/dummy-post`でテスト可能

### 検証結果
- ✅ バックエンドコンテナが正常に起動
- ✅ データベース接続が成功
- ✅ JWT認証システムが動作
- ✅ API エンドポイントが正常にレスポンス:
  ```json
  {
    "slug": "dummy-post",
    "metadata": {
      "title": "Dummy Post",
      "date": "2025-06-16",
      "dateTime": "2025-06-16T05:55:30.553453242",
      "summary": "A test post for API verification",
      "tags": ["test", "dummy", "api"]
    },
    "body": "This is a dummy post for testing the API..."
  }
  ```

### 学習ポイント
- Spring Bootのプロファイル設定は`application-{profile}.properties`形式が推奨
- Docker環境では環境変数による設定上書きが重要
- GlobalExceptionHandlerがエラー詳細を隠すため、ログ確認が必要
- 本番環境とテスト環境でのデータ初期化戦略の重要性

## フェーズ7: リリース準備 (Release Preparation)

### 🎟️ チケット INF-01: 本番用PostgreSQLとGitHub Secretsの整備 (Level 3)

- **担当:** DevOps/Backend
- **ブランチ:** `feature/release-preparation`
- **説明:** アプリケーションを本番環境で稼働させるために、外部のPostgreSQLデータベースに接続し、その認証情報を安全に管理する仕組みを構築します。
- **ステータス:** **完了**

#### 📝 Level 3 計画ドキュメント (INF-01)

##### 1. Overview (計画の概要)
本番環境でアプリケーションを動作させるため、外部のPostgreSQLデータベースに接続し、その接続情報（パスワードなど）を安全に管理する仕組みを整えます。具体的には、アプリケーションが環境変数からデータベース接続情報やJWTシークレットキーを読み込むように設定を確定させ、必要な環境変数をドキュメント化します。

##### 2. Files to Modify (影響範囲)
- `backend/src/main/resources/application-prod.properties`
- `docker-compose.prod.yml`
- `env.example.txt`

##### 3. Implementation Steps (実行手順)
1.  **`application-prod.properties`の確認:** `spring.datasource.url=${DB_URL}`のように、設定値が環境変数プレースホルダーになっていることを確認します。
2.  **`docker-compose.prod.yml`の確認:** バックエンドサービスに、`env_file`または`environment`セクションを使って環境変数を渡す設定になっていることを確認します。
3.  **`env.example.txt`の整備:** 以下の必須環境変数が記載されていることを確認し、なければ追記します。
    *   `DB_URL`
    *   `DB_USERNAME`
    *   `DB_PASSWORD`
    *   `JWT_SECRET`

##### 4. Testing Strategy (検証方法)
ローカル環境で`.env`ファイルにダミーの本番用情報を記載し、`docker compose -f docker-compose.prod.yml up`を実行してバックエンドがエラーなく起動することを確認します。最終的な検証は、実際に本番環境へデプロイした際に行われます。

**✅ すべて実施済み (2025-06-17)**

### 🎟️ チケット FE-11: ヒーローセクション画像差し替え

- **担当:** Frontend
- **ブランチ:** `feature/FE-11-hero-image-replacement`
- **説明:** トップページのヒーローセクションで使用するプロフィール画像を `topgyazo.jpg` に差し替え、縦長画像でも全体が表示されるようレイアウトを調整する。
- **Input:** 既存 `app/page.tsx` のヒーローセクション実装、`public/topgyazo.jpg` 画像ファイル。
- **Output:**
  - `public/topgyazo.jpg` がGit管理下に追加される。
  - `app/page.tsx` の `Image` コンポーネントが `src="/topgyazo.jpg"` を使用し、縦長画像を全体表示できるようコンテナが修正される。
  - レイアウトはスマホ・PC 双方で崩れず、画像が上下左右切れずに収まる (`object-contain`)。
  - Playwright E2E テストでヒーロー画像の表示が確認できる。
- **ステータス:** 未着手

#### 📝 Level 2 計画ドキュメント (FE-11: ヒーロー画像差し替え)

1. 📋 **Overview**
   - トップページヒーローのプロフィール画像を差し替え、縦長比率に合わせてコンテナを `aspect-ratio` で指定し、`object-contain` で画像全体を表示。

2. 📁 **Files to Modify / Create**
   - `public/topgyazo.jpg` (追加)
   - `app/page.tsx` (ヒーロー画像部分のレイアウト修正)
   - `tests/e2e/hero-image.spec.ts` (Playwright E2E – 画像表示確認)

3. 🔄 **Implementation Steps**
   1. 画像ファイル `topgyazo.jpg` を `public/` に追加し Git へコミット。
   2. `app/page.tsx` 内ヒーロー画像のコンテナを以下に変更:
      ```tsx
      <div className="relative w-48 md:w-60 lg:w-72 aspect-[3/4] overflow-hidden shrink-0">
        <Image
          src="/topgyazo.jpg"
          alt="Soma walking on a sunny path"
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 768px) 192px, 288px"
          priority
        />
      </div>
      ```
   3. 既存 `Image` コンポーネントの `objectFit` を `contain` にし、上下左右に空きが出る場合はコンテナ背景を `bg-gray-100` にして自然に見せる。
   4. `npm run dev` で確認し、幅375px/768px/1440px でレイアウト崩れが無いか確認。
   5. Playwright テスト (`hero-image.spec.ts`) で画像の `src` 属性が `/topgyazo.jpg` であることと画像がロードされていることを検証。

4. ⚠️ **Potential Challenges**
   - `object-contain` のため左右余白が発生する。背景色や max-w 調整で違和感を抑える。
   - 画像のファイルサイズが大きい場合は `next/image` の最適化により生成画像サイズを確認する。

5. ✅ **Testing Strategy**
   - **Manual:** ブラウザのレスポンシブモードでデザイン確認。
   - **E2E:** Playwright で画像の存在・表示確認 (ビューポート375×667と1280×800)。

### 🎟️ チケット FE-13: フッターリンクとコピーライト更新

- **担当:** Frontend
- **ブランチ:** `feature/FE-13-footer-update`
- **説明:** サイト全体のフッターを以下のように変更する。
  1. ナビゲーションリンクを「Contact」と「Blog」の2つのみにする。
  2. コピーライト表記を `fanda-dev.com` に変更する。
- **Input:** `components/Footer.tsx`
- **Output:**
  - `components/Footer.tsx` の `<nav>` 内のリンクリストが「Contact」「Blog」だけになる。
  - `<footer>` のコピーライト行が `© {currentYear} fanda-dev.com` になる。
  - 関連E2Eテスト（必要であれば）を追加または更新し、Playwright `footer.spec.ts` などで変更が検証される。
- **ステータス:** 未着手

#### 📝 Level 2 計画ドキュメント (FE-13: フッターリンク/コピーライト更新)

1. 📋 **Overview**
   - フッターのナビゲーションリンクをシンプルにし、ブランド名として `fanda-dev.com` を明示する。

2. 📁 **Files to Modify / Create**
   - `components/Footer.tsx`
   - `tests/e2e/footer.spec.ts` (新規: 任意)

3. 🔄 **Implementation Steps**
   1. 新ブランチ `feature/FE-13-footer-update` を `develop` から作成。
   2. `components/Footer.tsx` 内の `<ul>` を修正し、`Contact` と `Blog` のみ残す。
   3. `<p>` のコピーライト行を `&copy; {currentYear} fanda-dev.com` に置き換える。
   4. ローカルで `npm run lint` と `npm run test` を実行しエラーがないことを確認。
   5. 変更が正しく反映されているかブラウザで確認。
   6. Playwright テスト (必要に応じて) を追加・更新し、CI が通ることを確認。
   7. `git push` 後、GitHub CLI で PR を作成し、ベース `develop` へマージを依頼。

4. 🔗 **Subtasks**
   - [ ] ブランチ作成 (`feature/FE-13-footer-update`)
   - [x] ナビゲーションリンクをContactとBlogに変更
   - [x] コピーライト表記をfanda-dev.comに変更
   - [x] Playwrightテスト追加/更新
   - [ ] `npm run lint` と `npm run test` パス
   - [ ] PR作成・レビュー・マージ

5. ⏳ **Time Estimates**
   - 実装: 0.5h
   - テスト作成: 0.5h
   - 動作確認 & lint/test: 0.25h
   - PRレビュー & 修正: 0.25h
   - **合計: 約1.5h**

6. ⚠️ **Potential Challenges**
   - ナビゲーションリンクを削除したことにより、他コンポーネントやページで参照されていないか確認。
   - i18n（今後導入予定）があれば、テキスト変更時の翻訳ファイル影響に注意。

7. ✅ **Testing Strategy**
   - **Manual:** ローカルでフッターが期待通りに表示されるかをChrome DevToolsで確認。
   - **E2E:** Playwright テストでリンクが2つのみであり、クリック時にそれぞれ `/contact` `/blog` に遷移することを確認。

### 🎟️ チケット OPS-02: 本番VMの構成同期と環境変数修正

- **担当:** DevOps
- **ブランチ:** `feature/OPS-02-sync-production-with-main`
- **説明:** 本番サーバのコード/コンテナ構成を GitHub `main` ブランチと完全一致させ、APP_ADMIN_ 環境変数と Flyway マイグレーション不足問題（roles テーブル）を解消する。
- **複雑度レベル:** 2 (Simple Enhancement)

#### 📝 Level 2 Plan (OPS-02)

1. 📋 **Overview**
   - main ブランチ最新コミットへサーバコードを強制同期 (`git reset --hard origin/main`)。
   - `.env` に `APP_ADMIN_EMAIL / APP_ADMIN_PASSWORD` を追加し、旧 `ADMIN_` 行を削除。
   - `docker-compose.yml` に `env_file` 指定が反映されているか確認。
   - Flyway 用 V2 マイグレーション (`roles`, `user_roles`) を main に含める。DB 初期化または既存スキーマへ適用。

2. 📁 **Files to Modify**
   - `.env` (サーバ側)
   - `docker-compose.yml`
   - `backend/src/main/resources/db/migration/V2__Create_roles_tables.sql`（main へマージ済み確認）

3. 🔄 **Implementation Steps**
   1. ローカルでブランチ `feature/OPS-02-sync-production-with-main` を作成。
   2. 必要な修正（README への手順追記等）があれば commit → PR → main merge。
   3. 本番 VM で以下を実行:
      ```bash
      git fetch origin && git checkout main && git reset --hard origin/main
      docker-compose down --remove-orphans
      docker volume rm somadev-pages_postgres_data   # ← データ初期化が必要な場合
      docker-compose up -d --build
      ```
   4. コンテナ内環境変数確認:
      `docker-compose exec backend env | grep APP_ADMIN`
   5. Flyway ログで V2 マイグレーション適用を確認。
   6. `users` テーブルに管理者ユーザが 1 行生成されているか検証。

4. ⚠️ **Potential Challenges**
   - 旧バージョンの docker-compose (v1) による `ContainerConfig` エラー再発 → `docker system prune -af` でキャッシュを一掃し再ビルド。
   - 他の開発者ローカルリポジトリとの履歴不一致→ `git fetch && git reset --hard origin/main` を周知。

5. ✅ **Testing Strategy**
   - Flyway マイグレーションログ確認で `Successfully applied 2 migrations` を確認。
   - Postman/curl で `/api/auth/login` エンドポイントへ新管理者でログインし、200 OK と JWT 発行を検証。
   - Playwright E2E （CI パイプライン）を main ブランチマージ後に自動実行し、全テストグリーンを確認。

### 🎟️ チケット FE-BUG-01: ログインできない問題 (Cookie 転送バグ)

- **担当:** Frontend
- **ブランチ:** `feature/FE-BUG-01-login-cookie-proxy`
- **説明:** バックエンドから送られる `Set-Cookie` ヘッダが Next.js の API プロキシ (`/api/proxy`) でブラウザへ転送されず、JWT Cookie が保存されないためログインが完了しない。`route.ts` で `set-cookie` ヘッダをそのまま応答にコピーして解決する。
- **複雑度レベル:** 2 (Simple Enhancement)
- **ステータス:** 未着手

#### 📝 Level 2 計画ドキュメント (FE-BUG-01: ログイン Cookie 転送修正)

1. 📋 **Overview**
   - `app/api/proxy/[...path]/route.ts` の各 HTTP メソッドで、バックエンド応答の `set-cookie` ヘッダを取得し、Next.js の `NextResponse` に付与してフロントエンドへ転送する。

2. 📁 **Files to Modify / Create**
   - `app/api/proxy/[...path]/route.ts`
   - `tests/e2e/auth.spec.ts` (ログイン E2E テストの Cookie 確認を追加)

3. 🔄 **Implementation Steps**
   1. `develop` から新ブランチ `feature/FE-BUG-01-login-cookie-proxy` を作成。
   2. `route.ts` に共通関数 `forwardResponse` を作成し、`backendRes.headers.get('set-cookie')` を取得して `NextResponse` にコピー。ヘッダ大小文字を考慮し複数値にも対応。
   3. 各 HTTP メソッド (`GET`, `POST`, `PUT`, `DELETE`) で `forwardResponse` を使用してレスポンスを生成。
   4. `npm run dev` で `/login` → `/admin/articles` へ正常リダイレクトし、DevTools で `token` Cookie が存在することを確認。
   5. Playwright `auth.spec.ts` を更新し、ログイン後に `document.cookie` に `token=` が含まれることをアサート。
   6. `npm run lint` と `npm run test` をパスさせる。
   7. `git push` 後、GitHub CLI で PR を作成し、base=`develop` へマージを依頼。

4. ⚠️ **Potential Challenges**
   - `Set-Cookie` ヘッダは大小文字や複数値があり得るため、`backendRes.headers.getSetCookie?` のパターンを検証する必要がある。
   - 他のヘッダ (`location` など) が必要な場合は追加転送が必要になる可能性。

5. ✅ **Testing Strategy**
   - **Manual:** ブラウザでログインし、`Application > Cookies` タブに `token` が存在することを確認。
   - **E2E:** Playwright テストで `/login` フローを実行し、`token` Cookie が設定され、`/admin/articles` に遷移することを確認。

### 🎟️ チケット FE-BUG-02: ログアウトできない問題 (HttpOnly Cookie 未削除)

- **担当:** Frontend
- **ブランチ:** `feature/FE-BUG-02-logout-cookie-clear`
- **説明:** JWT を HttpOnly Cookie として保存しているため、フロント側の `js-cookie` で削除できずログアウトしてもセッションが残る。Next.js API ルートで `Set-Cookie` ヘッダに無効化 Cookie (`Max-Age=0`) を返して解決する。
- **複雑度レベル:** 2 (Simple Enhancement)
- **ステータス:** 未着手

#### 📝 Level 2 計画ドキュメント (FE-BUG-02: ログアウト Cookie 無効化)

1. 📋 **Overview**
   - `POST /api/auth/logout` を実装し、`token` Cookie を失効させる。
   - 管理レイアウトのログアウトボタンはこのエンドポイントを呼び出すよう修正。

2. 📁 **Files to Modify / Create**
   - `app/api/auth/logout/route.ts` (新規)
   - `app/admin/layout.tsx` (`handleLogout` 修正)
   - `tests/e2e/auth.spec.ts` (Cookie が削除されるテスト追加)

3. 🔄 **Implementation Steps**
   1. `develop` から `feature/FE-BUG-02-logout-cookie-clear` ブランチを作成。
   2. `logout` API ルートを作成し、`Set-Cookie: token=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict` を返す。
   3. `handleLogout` 内で `fetch('/api/auth/logout', { method: 'POST' })` を await し、完了後 `/login` へリダイレクト。
   4. 手動確認: `/admin` → Logout → `/login` で Cookie `token` が消えることを DevTools で確認。
   5. Playwright テスト更新: ログアウト後に `document.cookie` に `token=` が含まれないことをアサート。
   6. `npm run lint` と `npm run test` をパスさせる。
   7. Push & PR 作成、develop へマージ依頼。

4. ⚠️ **Potential Challenges**
   - `SameSite=Strict` で問題ないかブラウザ互換性を確認。
   - CSRF 対策として後日トークンや Origin チェックが必要になる可能性。

5. ✅ **Testing Strategy**
   - **Manual:** ブラウザ DevTools で Cookie が削除されることを確認。
   - **E2E:** Playwright でログアウトフローを自動検証し、Cookie が存在しないことをテスト。
