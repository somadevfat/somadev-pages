import Layout from '@/components/Layout';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import { remark } from 'remark';
// import html from 'remark-html';

// async function getSampleArticle() {
//   const filePath = path.join(process.cwd(), 'content/articles/sample.md');
//   const fileContents = fs.readFileSync(filePath, 'utf8');
//   const { data, content } = matter(fileContents);

//   const processedContent = await remark()
//     .use(html)
//     .process(content);
//   const contentHtml = processedContent.toString();

//   return {
//     title: data.title as string,
//     date: data.date as string,
//     summary: data.summary as string,
//     contentHtml,
//   };
// }

export default function HomePage() {
  // const sampleArticle = await getSampleArticle();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 bg-gray-50">
        <div className="container mx-auto px-14">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            

            {/* Text Content */}
            <div className="max-w-xl">
              <h1 className="text-main-heading font-bold text-gray-800 mb-6">
                Hey, I&apos;m Soma! <span className="inline-block animate-wave">👋</span>
              </h1>
              <div className="mb-6">
                <h2 className="text-section-title-sm font-semibold text-gray-700 mb-4">About</h2>
                <p className="text-body-base text-gray-600 leading-relaxed mb-6">
                  <span className="block">java バックエンドエンジニアを目指し、</span>
                  <span className="block">個人開発にて学習中。</span>
                </p>
                <ul className="text-body-base text-gray-600 leading-relaxed list-disc list-outside pl-5 space-y-2">
                  <li className="text-body-base leading-normal">Learning: Java, Kotlin, Android app.</li>
                  <li className="text-body-base leading-normal">Love: Personal development (個人開発).</li>
                </ul>
              </div>
            </div>
            {/* Profile Image */}
            <div className="relative w-48 md:w-60 lg:w-72 aspect-[3/4] overflow-hidden shrink-0 bg-gray-100 rounded-lg">
              <Image
                src="/topgyazo.jpg"
                alt="Soma walking on a sunny path"
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 768px) 192px, (max-width: 1024px) 240px, 288px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4">
        <hr className="my-12 md:my-16 border-t border-gray-200" />
      </div>

      {/* Career Section */}
      <section id="career" className="py-12 md:py-20 ">
        <div className="container mx-auto px-4">
          <h2 className="text-section-title-lg font-bold text-gray-800 mb-10 md:mb-14 text-center ">Career</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-body-base text-gray-600 leading-relaxed mb-10 text-center">
              職務内容の詳細（成果や影響など）についてご興味のある方は、メールにてご連絡ください。
              <br />
              ご希望に応じて、詳しい履歴書をお送りいたします。
            </p>
            <div className="space-y-6">

              {/* 太陽誘電モバイルテクノロジー株式会社 */}
              <div className="p-6">
              <h3 className="text-item-title font-semibold text-gray-700 mb-1.5">
  <a
    href="https://www.tymt.co.jp/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-sky-700 hover:text-sky-500 hover:underline decoration-sky-500/70 underline-offset-2 transition-colors duration-300 ease-in-out"
  >
    太陽誘電モバイルテクノロジー株式会社
  </a>
</h3>
                <ul className="list-disc list-outside pl-5 space-y-1 text-body-base text-gray-700">
                  <li>
                    電気/ガス/空調/排水 設備管理及び流量計のデータを取り込み、<br/>
                    ソフトウェアへの表示。
                  </li>
                </ul>
              </div>

              {/* ゴールドCFD取引 */}
              <div className="p-6">
                <h3 className="text-item-title font-semibold text-gray-700 mb-1.5">
                  金相場トレーダー (XAU/USD専門)
                </h3>
                <ul className="list-disc list-outside pl-5 space-y-1 text-body-base text-gray-700">
                  <li>東京時間帯に特化し、3年間専業トレーダーとして活動。</li>
                  <li>コミュニティへ有益な情報を積極的に共有し、貢献。</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4">
        <hr className="my-12 md:my-16 border-t border-gray-200" />
      </div>

      {/* Projects Section */}
      <section id="projects" className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-section-title-lg font-bold text-gray-800 mb-10 md:mb-14 text-center">Projects</h2>
          <div className="max-w-4xl mx-auto space-y-10">

            {/* インジケーター開発 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col md:flex-row-reverse">
                <div className="w-full md:w-2/5 relative h-64 md:h-96 flex justify-center items-center p-4 bg-gradient-to-b from-gray-50 to-white">
                  <Image
                    src="/picture/インジゲータ.jpg"
                    alt="インジケーター開発のスクリーンショット"
                    width={220}
                    height={440}
                    style={{ objectFit: 'contain', maxHeight: '100%' }}
                    className="rounded-xl shadow-lg"
                  />
                </div>
                <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-3">
                    <h3 className="text-item-title font-semibold text-gray-800 mr-2">
                      インジケーター開発
                    </h3>
                    <a
                      href="https://github.com/somadevfat/soma-gold-volatility"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
                      aria-label="GitHub repository for インジケーター開発"
                    >
                      <FaGithub size={24} />
                    </a>
                  </div>
                  <p className="text-body-base text-gray-600 mb-5 leading-relaxed">
                    相場分析を効率化するために開発したカスタムインジケーター。手動での分析作業をMQL5とPine Scriptで自動化し、分析時間を大幅に短縮しました。
                  </p>
                  <div className="text-xs tracking-wider text-gray-500">
                    <span className="inline-block border border-gray-200 rounded-full px-3 py-1 mr-2 mb-2">MQL5</span>
                    <span className="inline-block border border-gray-200 rounded-full px-3 py-1 mr-2 mb-2">Pine Script</span>
                    <span className="inline-block border border-gray-200 rounded-full px-3 py-1 mr-2 mb-2">テクニカル分析</span>
                  </div>
                </div>
              </div>
            </div>

            {/* JavaSilver17問題集Androidアプリ */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col md:flex-row-reverse">
                <div className="w-full md:w-2/5 relative h-64 md:h-96 flex justify-center items-center p-4 bg-gradient-to-b from-gray-50 to-white">
                  <Image
                    src="/picture/javaapp.gif"
                    alt="JavaSilver17問題集Androidアプリのデモ"
                    width={220}
                    height={440}
                    style={{ objectFit: 'contain', maxHeight: '100%' }}
                    className="rounded-xl shadow-lg"
                  />
                </div>
                <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-3">
                    <h3 className="text-item-title font-semibold text-gray-800 mr-2">
                      JavaSilver17問題集Androidアプリ
                    </h3>
                    <a
                      href="https://github.com/somadevfat/quiz-app-contentful"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
                      aria-label="GitHub repository for JavaSilver17問題集Androidアプリ"
                    >
                      <FaGithub size={24} />
                    </a>
                  </div>
                  <p className="text-body-base text-gray-600 mb-5 leading-relaxed">
                    Java SE 17資格取得のための学習アプリです。JavaとXMLの従来の方法と、KotlinとJetpack Composeを使用したモダンなUI実装の両方で開発し、Androidアプリ開発スキルを向上させました。
                  </p>
                  <div className="text-xs tracking-wider text-gray-500">
                    <span className="inline-block border border-gray-200 rounded-full px-3 py-1 mr-2 mb-2">Java</span>
                    <span className="inline-block border border-gray-200 rounded-full px-3 py-1 mr-2 mb-2">Kotlin</span>
                    <span className="inline-block border border-gray-200 rounded-full px-3 py-1 mr-2 mb-2">Jetpack Compose</span>
                    <span className="inline-block border border-gray-200 rounded-full px-3 py-1 mr-2 mb-2">Android</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SnippetButton */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col md:flex-row-reverse">
                <div className="w-full md:w-2/5 relative h-64 md:h-96 flex justify-center items-center p-4 bg-gradient-to-b from-gray-50 to-white">
                  <Image
                    src="/picture/すにぺと.gif"
                    alt="SnippetButtonのデモ"
                    width={480}
                    height={320}
                    style={{ objectFit: 'contain', maxHeight: '100%' }}
                    className="rounded-xl shadow-lg"
                  />
                </div>
                <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-3">
                    <h3 className="text-item-title font-semibold text-gray-800 mr-2">
                      SnippetButton
                    </h3>
                    <a
                      href="https://github.com/dopqLOL/SnippetButton"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
                      aria-label="GitHub repository for SnippetButton"
                    >
                      <FaGithub size={24} />
                    </a>
                  </div>
                  <p className="text-body-base text-gray-600 mb-5 leading-relaxed">
                    Jetpack Compose Multiplatformで開発したデスクトップアプリケーション。ワンクリックでコードスニペットをクリップボードにコピーでき、開発作業の効率化を実現します。マルチプラットフォーム対応で、Windows、Mac、Linuxで利用可能です。
                  </p>
                  <div className="text-xs tracking-wider text-gray-500">
                    <span className="inline-block border border-gray-200 rounded-full px-3 py-1 mr-2 mb-2">Kotlin</span>
                    <span className="inline-block border border-gray-200 rounded-full px-3 py-1 mr-2 mb-2">Jetpack Compose</span>
                    <span className="inline-block border border-gray-200 rounded-full px-3 py-1 mr-2 mb-2">Multiplatform</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 価格データ分析アプリ - 見出しのみ残し、本文は削除（開発中のため） */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden p-8 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-3">
                <h3 className="text-item-title font-semibold text-gray-800 mr-2">
                  価格データ分析アプリ（開発中）
                </h3>
                <a
                  href="https://github.com/somadevfat/EconomicIndicators-java"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
                  aria-label="GitHub repository for 価格データ分析アプリ"
                >
                  <FaGithub size={24} />
                </a>
              </div>
              <p className="text-body-base text-gray-600 mb-5 leading-relaxed">
                経済指標発表や要人発言時の価格変動を分析し、直感的なUIで変動の大きさを瞬時に判断できるWebアプリを開発中です。MQL5でデータを収集し、Spring Bootでバックエンド処理を実装しています。
              </p>
              <div className="text-xs tracking-wider text-gray-500">
                <span className="inline-block border border-gray-200 rounded-full px-3 py-1 mr-2 mb-2">MQL5</span>
                <span className="inline-block border border-gray-200 rounded-full px-3 py-1 mr-2 mb-2">Java</span>
                <span className="inline-block border border-gray-200 rounded-full px-3 py-1 mr-2 mb-2">Spring Boot</span>
                <span className="inline-block border border-gray-200 rounded-full px-3 py-1 mr-2 mb-2">データ分析</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4">
        <hr className="my-12 md:my-16 border-t border-gray-200" />
      </div>

      {/* Articles Section */}
      <section id="articles" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-section-title-lg font-bold text-gray-800 mb-10 md:mb-14 text-center">Articles</h2>
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="p-6">
              <a href="https://zenn.dev/wyuma/articles/6ec13d3c2553d4" target="_blank" rel="noopener noreferrer" className="block group">
                <h3 className="text-item-title font-semibold text-gray-800 group-hover:underline mb-1.5">Android開発 主要ライブラリ・クラス リファレンス</h3>
                <p className="text-item-meta text-gray-500 mb-2">公開日: 2025/05/09</p>
                <p className="text-body-base text-gray-700">
                  • Android Jetpack (Activity, Fragment, ViewModel, Compose)
                  <br />
                  • Kotlin Coroutines と Flow API
                  <br />
                  • ネットワーク通信、Google API
                  <br />
                  • Android標準API (Context, Intent, Log, Resources)
                </p>
              </a>
            </div>
            <div className="p-6">
              <a href="https://zenn.dev/wyuma/articles/ddb90b50a9ff19" target="_blank" rel="noopener noreferrer" className="block group">
                <h3 className="text-item-title font-semibold text-gray-800 group-hover:underline mb-1.5">なぜ複数のプログラミング言語を使い分けるのか？</h3>
                <p className="text-item-meta text-gray-500 mb-2">公開日: 2025/05/16</p>
                <p className="text-body-base text-gray-700">
                  • C、C++、Java、Python各言語の特徴と役割
                  <br />
                  • 「適材適所」で言語を使い分ける理由
                  <br />
                  • プロジェクトに適した言語選択のポイント
                </p>
              </a>
            </div>
            <div className="p-6">
              <a href="https://zenn.dev/wyuma/articles/3db1832a1295bd" target="_blank" rel="noopener noreferrer" className="block group">
                <h3 className="text-item-title font-semibold text-gray-800 group-hover:underline mb-1.5">GitHub ActionsのAndroidテストが数時間も終わらない？根本原因と対策</h3>
                <p className="text-item-meta text-gray-500 mb-2">公開日: 2025/06/10</p>
                <p className="text-body-base text-gray-700">
                  • ディスパッチャーの競合によるテストハングの原因
                  <br />
                  • CI/CD環境でのみ発生する問題の解決方法
                  <br />
                  • Kotlinコルーチンテストの安定化テクニック
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
