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
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-x-8 lg:gap-x-12 items-start">
            {/* Left Column: Text Content */}
            <div className="md:col-span-2 prose prose-lg lg:prose-xl max-w-none text-textDark">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Hey, I'm Soma! 👋
              </h1>
              
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-3 text-textDark">About</h2>
                <p>
                  I'm a Developer with a passion for creating beautiful and efficient web systems. 
                  My journey in tech has been driven by a love for continuous learning and a desire to build impactful solutions.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2 text-textDark">Expertise:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>TypeScript, Node.js, React</li>
                  <li>Serverless Architectures</li>
                  <li>Technical SEO</li>
                  <li>Next.js, TailwindCSS</li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2 text-textDark">Love:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Open Source Software</li>
                  <li>Personal Development (個人開発)</li>
                  <li>Exploring new technologies</li>
                </ul>
              </div>
              
              <p className="mt-8 text-lg font-medium text-textDark">
                Soma
              </p>
            </div>

            {/* Right Column: Profile Image */}
            <div className="md:col-span-1 mt-8 md:mt-0 flex justify-center md:justify-end">
              <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72">
                <Image
                  src="/profile.jpg" // publicディレクトリからのパス
                  alt="Soma - Profile Picture"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
