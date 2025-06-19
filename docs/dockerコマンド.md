### 使うコマンド
**全停止**
docker-compose down --remove-orphans

**立ち上げ**
docker-compose up -d --build backend

### Docker Compose コマンド (`docker-compose`)
複数のコンテナで構成されるアプリケーションを、`docker-compose.yml`ファイルを使ってまとめて管理するためのコマンドです。あなたのプロジェクトに最も関係が深いです。

#### `docker-compose up`
コンテナをビルド（作成）し、起動します。

```bash
# フォアグラウンドで起動し、ログを画面に表示し続ける
docker-compose up

# バックグラウンドで起動する（最もよく使う）
docker-compose up -d

# イメージを強制的に再ビルドしてから起動する
docker-compose up -d --build

# docker-compose.ymlに定義されていない孤児コンテナを削除しつつ起動
docker-compose up -d --remove-orphans
```

#### `docker-compose down`
`up`で作成したコンテナ、ネットワークなどを停止・削除します。

```bash
# コンテナとネットワークを停止・削除する
docker-compose down

# 【注意：データが消えます】コンテナ、ネットワークに加え、ボリュームも削除する
docker-compose down -v
```
**※ `-v` オプションはデータベースのデータなども完全に削除するため、使用には十分注意してください。**

#### `docker-compose ps`
現在のプロジェクトのコンテナの状態を確認します。

```bash
# コンテナの一覧と状態（Up, Exitedなど）を表示
docker-compose ps
```

#### `docker-compose logs`
コンテナのログを確認します。

```bash
# 全てのサービスのログを表示
docker-compose logs

# 特定のサービスのログだけ表示（例: backend）
docker-compose logs backend

# ログをリアルタイムで表示し続ける
docker-compose logs -f

# 最後の100行だけ表示
docker-compose logs --tail=100
```

#### `docker-compose exec`
**起動中**のコンテナの中に入って、コマンドを実行します。デバッグに非常に便利です。

```bash
# backendコンテナの中で、ls -l コマンドを実行する
docker-compose exec backend ls -l

# postgresコンテナの中に入って、psqlコマンドを実行する
docker-compose exec postgres psql -U user -d somapages
```

---

### Docker コマンド (`docker`)
個別のコンテナ、イメージ、ボリュームなどを直接操作するためのコマンドです。

#### コンテナの管理

```bash
# 起動中のコンテナ一覧を表示
docker ps

# 停止中のコンテナも含め、全てのコンテナを表示
docker ps -a

# コンテナを起動する
docker start [コンテナID or コンテナ名]

# コンテナを停止する
docker stop [コンテナID or コンテナ名]

# コンテナを再起動する
docker restart [コンテナID or コンテナ名]

# 【注意】コンテナを削除する（停止しているコンテナのみ）
docker rm [コンテナID or コンテナ名]

# 【注意】起動中のコンテナを強制的に削除する
docker rm -f [コンテナID or コンテナ名]

# コンテナの中に入って操作する（インタラクティブモード）
docker exec -it [コンテナID or コンテナ名] /bin/bash
```

#### イメージの管理

```bash
# ローカルにあるイメージの一覧を表示
docker images

# イメージを削除する
docker rmi [イメージID or イメージ名]
```

#### システム全体の掃除 (`prune`)
不要になったリソースをまとめて削除します。ディスク容量を確保したいときに使います。

```bash
# システム全体をクリーンアップ（停止中のコンテナ、未使用ネットワーク、宙ぶらりんイメージなど）
docker system prune

# 【注意：データが消えます】未使用のボリュームを全て削除
docker volume prune
```

# Docker コマンド集

## 基本コマンド

### 起動・停止
```bash
# 起動
docker-compose up -d

# 停止
docker-compose down

# 完全削除（ボリューム含む）
docker-compose down -v
```

### ビルド・再起動
```bash
# リビルドして起動
docker-compose up -d --build

# 特定サービスのみリビルド
docker-compose up -d --build backend
```

## メモリ最適化設定

### 設定内容
- **Java ヒープサイズ**: 最大400MB、初期200MB
- **PostgreSQL**: shared_buffers=128MB、max_connections=50
- **ガベージコレクタ**: G1GC使用で低レイテンシ

### 対象環境
- メモリ1GB以下のサーバー
- VPSやクラウドの小規模インスタンス

### 設定確認
```bash
# コンテナのメモリ使用量確認
docker stats

# Java プロセスの確認
docker-compose exec backend ps aux
```

## トラブルシューティング

### メモリ不足の症状
- Spring Boot起動が完了しない
- API接続でConnection reset by peer
- CPU使用率が異常に高い

### 対処法
```bash
# システムメモリ確認
free -h

# Swap確認
swapon --show

# ログ確認
docker-compose logs backend | tail -50
```