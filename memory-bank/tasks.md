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
- **ステータス:** 未着手

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
- **ステータス:** レビュー待ち (BE-04待ち)
### 🎟️ チケット I-01: 最終統合テスト (Final Integration)

- **担当:** General
- **ブランチ:** `feature/I-01-final-integration-test`
- **説明:** 全機能を統合し、Dev Container内で一連のユーザーフローが問題なく動作することを確認します。
- **Input:**
    - **マージ元ブランチ:** `feature/BE-04-implement-db-logic`, `feature/FE-04-connect-to-real-api`
- **Output:**
    - 管理画面から記事を作成 → DBに保存される → 記事一覧に表示される → 記事を編集 → DB内容が更新される → 記事を削除 → DBから削除される、という一連の動作が正常に完了する。
    - このブランチが `main` にマージされ、タスク完了となる。
- **ステータス:** 未着手

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
