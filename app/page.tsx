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
                  <span className="block">I&apos;m a JavaScript Developer with 10+ years of</span>
                  <span className="block">experience in web systems development.</span>
                </p>
                <ul className="text-body-base text-gray-600 leading-relaxed list-disc list-outside pl-5 space-y-2">
                  <li className="text-body-base leading-normal">Expertise: TypeScript, Node.js, React, Serverless, Technical SEO.</li>
                  <li className="text-body-base leading-normal">Love: Open Source Software, Personal development (個人開発).</li>
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
      <section id="career" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-section-title-lg font-bold text-gray-800 mb-10 md:mb-14 text-center">Career</h2>
          <div className="space-y-8 max-w-2xl mx-auto">
            <div className="p-6">
              <h3 className="text-item-title font-semibold text-blue-600 mb-1.5">Company Name - Feb 2023 - Present</h3>
              <p className="text-body-base text-gray-700">Developer Advocate / Solution Engineer, Solving customer problems...</p>
            </div>
            <div className="p-6">
              <h3 className="text-item-title font-semibold text-blue-600 mb-1.5">Nulab Inc. - Jan 2021 - Jan 2023</h3>
              <p className="text-body-base text-gray-700">Development of the project management tool Backlog.</p>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <div className="w-full h-48 relative">
                <Image
                  src="/project-placeholder-1.jpg"
                  alt="Project 1"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-item-title font-semibold text-blue-600 mb-2">Project Title 1</h3>
                <p className="text-body-base text-gray-700 mb-3">Short description of the project. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p className="text-item-meta text-gray-500">Technologies: React, Next.js, TailwindCSS</p>
              </div>
            </div>
            <div>
              <div className="w-full h-48 relative">
                <Image
                  src="/project-placeholder-2.jpg"
                  alt="Project 2"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-item-title font-semibold text-blue-600 mb-2">Project Title 2</h3>
                <p className="text-body-base text-gray-700 mb-3">Another interesting project. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p>
                <p className="text-item-meta text-gray-500">Technologies: TypeScript, Node.js, GraphQL</p>
              </div>
            </div>
            <div>
              <div className="w-full h-48 relative">
                <Image
                  src="/project-placeholder-1.jpg"
                  alt="Project 3"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-item-title font-semibold text-blue-600 mb-2">Project Title 3</h3>
                <p className="text-body-base text-gray-700 mb-3">A third project to fill the row. Curabitur aliquet quam id dui posuere blandit.</p>
                <p className="text-item-meta text-gray-500">Technologies: Python, Django, PostgreSQL</p>
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
