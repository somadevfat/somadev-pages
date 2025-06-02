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

export default function HomePage() { // async を削除
  // const sampleArticle = await getSampleArticle();

  return (
    <Layout>
      <section className="my-8 text-center">
        <div className="mb-8">
          <Image
            src="https://via.placeholder.com/150"
            alt="Your Name"
            width={150}
            height={150}
            className="rounded-full mx-auto"
            priority 
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">
          Hey, I'm Your Name! 👋
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          ここに簡単な自己紹介文が入ります。Webデベロッパーで、美しいフロントエンドと効率的なバックエンドの構築に情熱を注いでいます。趣味は新しい技術の探求と美味しいコーヒーを淹れることです。
        </p>
        
        <div className="mt-12 border-t pt-8">
          <h3 className="text-lg font-medium mb-2">next/image テスト (元々あったもの)</h3>
          <Image
            src="https://via.placeholder.com/600x300.png?text=Dummy+Image"
            alt="Dummy Image"
            width={600}
            height={300}
          />
        </div>

        {/* サンプル記事の表示は一旦コメントアウト
        <article className="mt-8 prose lg:prose-xl text-left"> 
          // ... (sample article content)
        </article>
        */}
      </section>
    </Layout>
  );
}
