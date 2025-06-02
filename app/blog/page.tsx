import Layout from '@/components/Layout';
import Link from 'next/link';
import { getSortedArticlesData, ArticleData } from '@/lib/articles';

export default function ArticlesPage() {
  const articles = getSortedArticlesData();

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-textDark">
            Articles
          </h1>
          {articles.length === 0 ? (
            <p className="text-center text-gray-600">No articles found.</p>
          ) : (
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-8">
                {articles.map((article, index) => (
                  <li key={article.slug} className={index < articles.length - 1 ? "pb-8 border-b border-gray-200" : "pb-8"}>
                    <Link href={`/blog/${article.slug}`} className="block group">
                      <h2 className="text-2xl md:text-3xl font-semibold text-chicBlue group-hover:underline mb-2">
                        {article.title}
                      </h2>
                      <p className="text-sm text-gray-500 mb-3">{article.date}</p>
                      <p className="text-gray-700 leading-relaxed">
                        {article.summary}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
} 