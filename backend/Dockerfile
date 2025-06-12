# ---- ビルドステージ ----
FROM maven:3.9-eclipse-temurin-17-focal AS build

# アプリケーションのソースコードをコンテナにコピー
WORKDIR /workspace
COPY . .

# Mavenでアプリケーションをパッケージング（テストはスキップ）
RUN mvn package -DskipTests

# ---- 実行ステージ ----
FROM eclipse-temurin:17-jre-focal

# ビルドステージから生成されたJARファイルをコピー
COPY --from=build /workspace/target/*.jar app.jar

# ポート8080を開放
EXPOSE 8080

# コンテナ起動時にJARファイルを実行
ENTRYPOINT ["java","-jar","/app.jar"] 