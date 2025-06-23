# Active Context

**Task ID:** CD-02  
**概要:** GHCR から GCP VM への自動デプロイパイプライン構築の現状調査  
**フェーズ:** PLAN  
**次モード:** IMPLEMENT

## 調査目的
1. 現在の CI/CD パイプラインで Docker イメージがどこまでビルド・プッシュされているかを確認する。
2. GCP へのデプロイが自動化されているか、未実装かを判断する。
3. 既存リポジトリ / GitHub Actions で利用できるシークレット・認証方式 (SA キー) が整備されているか確認する。

## 現状把握
- `.github/workflows/ci.yml` に `publish-ghcr` ジョブが存在し、`main` ブランチ push 時に **frontend** / **backend** イメージを **GHCR** へ push している。✅
- GCP へデプロイするジョブ (`deploy-gcp` など) は現時点で存在しない。🚫
- リポジトリ内に `gcloud` コマンドや GCP 認証用設定 (Service Account JSON, `.cloud` ディレクトリ等) は見当たらない。🚫
- `docker-compose.prod.yml` が存在するため、VM 上では `docker compose` でアプリを起動する運用想定。✅

## ギャップ
- GHCR → GCP VM の自動デプロイフローが未構築。
- GitHub Secrets に GCP 認証情報 (`GCP_PROJECT_ID`, `GCP_SA_KEY_JSON` など) が未登録の可能性。

## 次のアクション (PLAN フェーズで検討)
1. **GitHub Actions** 新規ワークフロー `deploy-gcp.yml` の設計。
2. **google-github-actions/auth@v2** + `gcloud compute ssh` でのリモート更新方式、または **Artifact Registry** + **Cloud Build** トリガー方式の比較。
3. GCP サービスアカウントの権限最小化 (Compute Admin, Artifact Registry Reader)。
4. デプロイ後 Smoke Test / Slack 通知設計。 