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
- **ステータス:** 進行中 (BLOCKER: `I-01.1`の完了待ち)

### 📝 Level 3 計画ドキュメント (I-01: 最終統合テスト)

#### 0. Branch
- ブランチ: `feature/I-01-e2e-integration`

#### 1. Requirements Analysis
- フロントエンド(Next.js) とバックエンド(Spring Boot) を Docker Compose で同時起動し、管理画面から記事 CRUD が問題なく動作することを確認する。
- API プロキシ (`/api/proxy/...`) がフロントエンド → バックエンドへ正しくルーティングされること。
- テストは **Playwright** でブラウザ E2E、自動化スクリプトを GitHub Actions で実行可能にする。

#### 2. Components Affected
- `docker-compose.yml` (E2E 専用 profile 追加)  
- `app/api/proxy/[...path]/route.ts` (必要に応じ修正)  
- `tests/e2e/*` (Playwright テストスイート)  
- `.github/workflows/ci.yml` (E2E ジョブ追加)

#### 3. Implementation Strategy
1. **Environment**: Docker Compose で backend:8080、frontend:3000 を起動後、Playwright コンテナで E2E 実行
2. **Playwright Setup**: `npx playwright install` → `playwright.config.ts` を作成し、Chromium ヘッドレスで実行
3. **Test Scenarios**:
   - 記事一覧が 200 OK で表示される
   - 「新規作成」→ 記事フォームに入力→ 保存 → 一覧に表示
   - 記事をクリック→ 編集→ タイトル変更→ 保存 → 一覧に反映
   - 記事削除→ モーダル確認→ 一覧から消える
4. **CI**: GitHub Actions 上で docker compose + Playwright を起動し、E2E ジョブを追加

#### 4. Detailed Steps & Checklist
- [ ] Docker Compose に `e2e` サービス (Playwright) 追加
- [ ] `playwright.config.ts` 作成
- [ ] 記事 CRUD の E2E テストスクリプト実装
- [ ] `package.json` に `npm run e2e` スクリプト追加
- [ ] `.github/workflows/ci.yml` に E2E ステップ追加
- [ ] ローカル `npm run e2e` がグリーン
- [ ] GitHub Actions でワークフローが成功

#### 5. Potential Challenges
- コンテナ間ネットワーク遅延によるタイムアウト → Playwright `timeout` 拡大
- CSRF / CORS 問題 → フロント↔バック間は同一 docker ネットワークで解決

#### 6. Creative Phase Components
- UI は既存のまま、Creative フェーズ不要

⏭️ NEXT MODE: IMPLEMENT MODE

### 📝 Level 2 計画ドキュメント (I-01.2: UI セレクタ整合)

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

---

## フェーズ 4 進捗まとめ

### 🎟️ チケット I-01: E2E 統合テスト **完了**

| 検証項目 | 結果 |
|----------|------|
| Playwright CRUD / API テスト 5 本 | ✅ |
| `data-testid` 付与による UI 自動テスト対応 | ✅ |
| GitHub Actions `frontend-test` / `backend-test` / `e2e-test` | ✅ |
| Docker Compose v2 対応 (`docker compose`) | ✅ |
| Playwright イメージ 1.53.0-jammy へ更新 | ✅ |

これにより I-01 フェーズの目的（CI 上での統合テスト自動化）は達成されました。

---

## フェーズ 5: デプロイ準備 (Deployment Phase)

| チケットID | 内容 | ブランチ | 担当 |
|------------|------|----------|------|
| **CD-01** | Docker イメージのビルド & GHCR への Push ワークフロー追加 | `feature/CD-01-ghcr-push` | DevOps |
| **INF-01** | 本番用 PostgreSQL と GitHub Secrets の整備 | `feature/INF-01-prod-db-secrets` | Infrastructure |
| **BE-05** | 外部 Postgres 接続 + Flyway マイグレーション & `prod` プロファイル実装 | `feature/BE-05-external-postgres` | Backend |
| **OPS-01** | Nginx (または Traefik) による HTTPS リバースプロキシ設定 | `feature/OPS-01-nginx-https` | DevOps |

### TODO Checklist
- [ ] CD-01: GHCR へ backend / frontend イメージ自動 Push
- [ ] INF-01: 本番 DB 構築 & 接続シークレット登録
- [ ] BE-05: `prod` プロファイルでの外部 Postgres 対応 + Flyway 移行スクリプト
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

### 🎟️ チケット FE-08: ログイン画面の実装
- **担当:** Frontend
- **ブランチ:** `feature/FE-08-login-page`
- **説明:** Next.js App Router で `/login` ルートを作成し、メール + パスワードでログインできるフォームを実装。成功時に JWT を cookie に保存する。
- **Output:**
  - `app/login/page.tsx` + `LoginForm` コンポーネント
  - `lib/auth-client.ts` で `login()` を実装
  - 成功時に `/admin` へリダイレクト、失敗時にエラーメッセージ表示。

### 🎟️ チケット FE-09: 管理画面ルートガード
- **担当:** Frontend
- **ブランチ:** `feature/FE-09-admin-route-guard`
- **説明:** App Router の `middleware.ts` で `/admin/**` へのアクセスを検査し、JWT が無い場合 `/login` へリダイレクト。
- **Output:**
  - `middleware.ts` に認可ロジック追加
  - E2E テストに「未ログイン時にリダイレクトされる」シナリオを追加。

### TODO Checklist (Auth Phase)
- [ ] BE-06: JWT 認証 API
- [ ] FE-08: ログイン画面
- [ ] FE-09: 管理画面ルートガード
