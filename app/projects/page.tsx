import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';

const ProjectsPage = () => {
  const projects = [
    {
      title: "インジケーター開発",
      description: "相場分析を効率化するために開発したカスタムインジケーター。手動での分析作業をMQL5とPine Scriptで自動化し、分析時間を大幅に短縮しました。トレーダーとしての実践経験を活かし、実用性の高いツールに仕上げています。",
      longDescription: "トレーディングプラットフォーム向けに開発したカスタムインジケーターです。複雑な相場分析を自動化することで、トレーダーの意思決定をサポートします。MQL5やPine Scriptを使用し、テクニカル指標の組み合わせにより、高精度な売買シグナルを生成します。特に東京時間のゴールド相場に特化したパラメータ調整を行い、実際のトレーディングで使用できる実用的なツールとなっています。",
      technologies: ["MQL5", "Pine Script", "テクニカル分析"],
      imageSrc: "/picture/インジゲータ.jpg",
      imageWidth: 220,
      imageHeight: 440,
      isPhone: true,
      repoLink: "https://github.com/somadevfat/soma-gold-volatility",
    },
    {
      title: "JavaSilver17問題集Androidアプリ",
      description: "Java SE 17資格取得のための学習アプリです。JavaとXMLの従来の方法と、KotlinとJetpack Composeを使用したモダンなUI実装の両方で開発し、Androidアプリ開発スキルを向上させました。",
      longDescription: "Java SE 17資格試験の対策に特化した学習アプリケーションです。問題の出題、回答チェック、進捗管理など、効率的な学習をサポートする機能を実装しています。開発にあたっては、従来のXMLベースのレイアウトとJetpack Composeの両方を使用し、最新のAndroid開発手法の習得にも注力しました。データ管理にはRoom、状態管理にはViewModelを採用し、MVVM設計パターンに沿った構造を実現しています。",
      technologies: ["Java", "Kotlin", "Jetpack Compose", "Android"],
      imageSrc: "/picture/javaapp.gif",
      imageWidth: 220,
      imageHeight: 440,
      isPhone: true,
      repoLink: "https://github.com/somadevfat/quiz-app-contentful",
    },
    {
      title: "SnippetButton",
      description: "Jetpack Compose Multiplatformで開発したデスクトップアプリケーション。ワンクリックでコードスニペットをクリップボードにコピーでき、開発作業の効率化を実現します。マルチプラットフォーム対応で、Windows、Mac、Linuxで利用可能です。",
      longDescription: "Jetpack Compose Multiplatformを活用したクロスプラットフォームデスクトップアプリケーションです。頻繁に使用するコードスニペットをカテゴリごとに整理し、ワンクリックでクリップボードにコピーできます。開発者の作業効率を大幅に向上させ、コードの一貫性も保てるようになっています。マテリアルデザイン3を採用した美しいUIと、カスタマイズ可能なテーマ設定を備えています。Kotlinの単一言語で複数プラットフォーム対応を実現した実践的なプロジェクトです。",
      technologies: ["Kotlin", "Jetpack Compose", "Multiplatform"],
      imageSrc: "/picture/すにぺと.gif",
      imageWidth: 480,
      imageHeight: 320,
      isPhone: false,
      repoLink: "https://github.com/dopqLOL/SnippetButton",
    },
    {
      title: "価格データ分析アプリ（開発中）",
      description: "経済指標発表や要人発言時の価格変動を分析し、直感的なUIで変動の大きさを瞬時に判断できるWebアプリを開発中です。MQL5でデータを収集し、Spring Bootでバックエンド処理を実装しています。",
      longDescription: "金融市場における重要イベント（経済指標発表や要人発言）の際の価格変動パターンを分析するWebアプリケーションです。過去の変動データを収集・分析し、今後のイベント時の予測に役立てることができます。データ収集にはMQL5スクリプトを利用し、バックエンド処理にはSpring Bootを採用。フロントエンドはReactとD3.jsで構築し、データビジュアライゼーションを重視した設計となっています。現在も開発を継続中の実践的プロジェクトです。",
      technologies: ["MQL5", "Java", "Spring Boot", "データ分析"],
      isPhone: false,
      repoLink: "https://github.com/somadevfat/EconomicIndicators-java",
    },
  ];

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 tracking-tight">
            Projects
          </h1>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl">
            個人開発を通じて学習し、技術を磨いています。各プロジェクトは実用性と学習効果を両立させることを意識して取り組んでいます。
          </p>

          <div className="space-y-24">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="md:grid md:grid-cols-2 md:items-center">
                  {/* 画像エリア（スマホ画像とデスクトップ画像で表示方法を分ける） */}
                  {project.imageSrc ? (
                    <div className={`relative bg-gradient-to-b from-gray-50 to-white ${project.isPhone ? 'py-8' : 'p-6'} flex justify-center items-center h-[320px] md:h-[480px]`}>
                      <Image
                        src={project.imageSrc}
                        alt={`${project.title}のスクリーンショット`}
                        width={project.imageWidth || 400}
                        height={project.imageHeight || 300}
                        style={{ 
                          objectFit: 'contain', 
                          maxHeight: '100%',
                          maxWidth: project.isPhone ? '230px' : '90%'
                        }}
                        className={`${project.isPhone ? 'rounded-2xl shadow-lg' : 'rounded-lg shadow-md'}`}
                      />
                    </div>
                  ) : (
                    <div className="h-[320px] md:h-[480px] bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center p-8">
                      <div className="text-gray-400 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-sm font-medium">開発中</p>
                      </div>
                    </div>
                  )}

                  {/* テキストエリア */}
                  <div className="p-8 md:p-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      {project.title}
                    </h2>
                    <div className="mb-6">
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {project.longDescription}
                      </p>
                    </div>
                    <div className="mb-8">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">技術スタック</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.map((tech) => (
                          <span key={tech} className="border border-gray-200 rounded-full px-3 py-1 text-xs tracking-wider text-gray-600">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    {project.repoLink && (
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                      >
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsPage; 