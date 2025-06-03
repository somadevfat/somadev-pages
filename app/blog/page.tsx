import Layout from '@/components/Layout';
import Link from 'next/link';
import { getSortedArticlesData } from '@/lib/articles';

export default function ArticlesPage() {
  const articles = getSortedArticlesData();

  return (
    <Layout>
      <section className="py-section-y">
        <div className="container mx-auto px-4">
          <h1 className="text-heading-lg font-semibold mb-content-gap text-textDark">
            Articles
          </h1>
          {articles.length === 0 ? (
            <div className="max-w-2xl">
              <p className="text-body-base text-gray-600">No articles found.</p>
            </div>
          ) : (
            <div className="max-w-2xl">
              <ul className="space-y-0">
                {articles.map((article, index) => (
                  <li 
                    key={article.slug} 
                    className={`py-content-gap ${index < articles.length - 1 ? "border-b border-gray-300" : ""}`}
                  >
                    <Link href={`/blog/${article.slug}`} className="block group">
                      <h2 className="text-heading-md font-semibold text-textDark group-hover:text-chicBlue group-hover:underline mb-px">
                        {article.title}
                      </h2>
                      <p className="text-body-sm text-gray-500 mb-item-gap">{article.date}</p>
                      <p className="text-body-base text-gray-700">
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
      <div className="container mx-auto px-4">
        <hr className="my-section-y border-t border-gray-200" />
      </div>
    </Layout>
  );
} 