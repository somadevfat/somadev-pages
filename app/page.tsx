import Layout from '@/components/Layout';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

async function getSampleArticle() {
  const filePath = path.join(process.cwd(), 'content/articles/sample.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    title: data.title as string,
    date: data.date as string,
    summary: data.summary as string,
    contentHtml,
  };
}

export default async function HomePage() {
  const sampleArticle = await getSampleArticle();

  return (
    <Layout>
      {/* <header className="py-4 bg-gray-100 text-center">
        <h1 className="text-2xl font-bold">仮ヘッダー</h1>
      </header> */}

      <section className="my-8">
        <h2 className="text-xl font-semibold mb-4">メインコンテンツエリア</h2>
        <p>ここにメインコンテンツが入ります。</p>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-2">next/image テスト</h3>
          <Image
            src="https://via.placeholder.com/600x300.png?text=Dummy+Image"
            alt="Dummy Image"
            width={600}
            height={300}
            priority
          />
        </div>

        <article className="mt-8 prose lg:prose-xl">
          <h2 className="text-2xl font-bold mb-2">{sampleArticle.title}</h2>
          <p className="text-sm text-gray-600 mb-4">Date: {sampleArticle.date}</p>
          <p className="italic mb-4">{sampleArticle.summary}</p>
          <div dangerouslySetInnerHTML={{ __html: sampleArticle.contentHtml }} />
        </article>
      </section>

      {/* <footer className="py-4 bg-gray-100 text-center">
        <p>&copy; 2024 仮フッター</p>
      </footer> */}
    </Layout>
  );
}
