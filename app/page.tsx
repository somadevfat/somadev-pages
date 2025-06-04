import Layout from '@/components/Layout';
import Image from 'next/image';
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
            <div className="w-80 h-40 md:md:w-96 md:h-96 relative shrink-0 overflow-hidden">
              <Image
                src="/profile.jpg"
                alt="Soma - Profile Picture"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 320px, 384px"
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
                  <li>電気/ガス/空調/排水 設備管理及び流量計のデータを取り込み、ソフトウェアへの表示。</li>
                </ul>
              </div>

              {/* ゴールドCFD取引 */}
              <div className="p-6">
                <h3 className="text-item-title font-semibold text-gray-700 mb-1.5">
                  ゴールドCFD取引 (XAU/USD専門)
                </h3>
                <ul className="list-disc list-outside pl-5 space-y-1 text-body-base text-gray-700">
                  <li>東京時間専門にして、3年間専業として継続。コミュニティでの有益な情報を惜しみなく発信、貢献。</li>
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
          <div className="max-w-2xl mx-auto space-y-6">

            {/* インジゲーター開発 */}
            <div className="p-6">
              <h3 className="text-item-title font-semibold text-gray-700 mb-1.5">インジケーター開発</h3>
              <ul className="list-disc list-outside pl-5 space-y-1 text-body-base text-gray-700">
                <li>MQL5, Pine scriptにて手動分析の自動化。</li>
              </ul>
            </div>

            {/* 価格データ分析アプリ */}
            <div className="p-6">
              <h3 className="text-item-title font-semibold text-gray-700 mb-1.5">価格データ分析アプリ</h3>
              <ul className="list-disc list-outside pl-5 space-y-1 text-body-base text-gray-700">
                <li>MQL5, Spring boot にて経済指標及び要人発言において、直近価格の変動値で大中小のGUIで瞬時に判断できるwebアプリ開発中。</li>
              </ul>
            </div>

            {/* JavaSilver17問題集Andoroidアプリ */}
            <div className="p-6">
              <h3 className="text-item-title font-semibold text-gray-700 mb-1.5">JavaSilver17問題集Andoroidアプリ</h3>
              <ul className="list-disc list-outside pl-5 space-y-1 text-body-base text-gray-700">
                <li>Java + Xml, Kotlin + Jetpack composeでのjava学習アプリを開発。</li>
              </ul>
            </div>

            {/* Gemini Gmail Filter */}
            <div className="p-6">
              <h3 className="text-item-title font-semibold text-gray-700 mb-1.5">Gemini Gmail Filter</h3>
              <ul className="list-disc list-outside pl-5 space-y-1 text-body-base text-gray-700">
                <li>Kotlin + Jetpack composeでのGemini APIを利用したGmail filter個人チーム開発(中、高の友人と共に開発中)。</li>
              </ul>
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
              <a href="#" className="block group">
                <h3 className="text-item-title font-semibold text-blue-600 group-hover:underline mb-1.5">Article Title 1: A Comprehensive Guide</h3>
                <p className="text-item-meta text-gray-500 mb-2">Published on: Jan 15, 2024</p>
                <p className="text-body-base text-gray-700">This article will introduce you to a collection of libraries for creating PDFs in Javascript, showing their use-cases and comparing their features...</p>
              </a>
            </div>
            <div className="p-6">
              <a href="#" className="block group">
                <h3 className="text-item-title font-semibold text-blue-600 group-hover:underline mb-1.5">Manage your life task with GitHub</h3>
                <p className="text-item-meta text-gray-500 mb-2">Published on: Dec 20, 2023</p>
                <p className="text-body-base text-gray-700">I suggested using Github to manage a personal task, which is already familiar to engineers, and using it for projects other than system development...</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
