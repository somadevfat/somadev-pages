"use client";

import Layout from '@/components/Layout';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ArticleData, TagCount } from '@/lib/articles';

interface BlogPageClientProps {
  articles: ArticleData[];
  tags: TagCount;
  totalArticles: number;
  currentPage: number;
  totalPages: number;
}

// Pagination Component
const Pagination = ({ currentPage, totalPages }: { currentPage: number, totalPages: number }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  const MAX_PAGES_TO_SHOW = 5;
  let startPage, endPage;

  if (totalPages <= MAX_PAGES_TO_SHOW) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= Math.ceil(MAX_PAGES_TO_SHOW / 2)) {
      startPage = 1;
      endPage = MAX_PAGES_TO_SHOW;
    } else if (currentPage + Math.floor(MAX_PAGES_TO_SHOW / 2) >= totalPages) {
      startPage = totalPages - MAX_PAGES_TO_SHOW + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - Math.floor(MAX_PAGES_TO_SHOW / 2);
      endPage = currentPage + Math.floor(MAX_PAGES_TO_SHOW / 2);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex items-center justify-center space-x-4 mt-content-gap pt-content-gap border-t border-gray-200">
      <Link 
        href={currentPage > 1 ? `/blog?page=${currentPage - 1}` : '#'} 
        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${currentPage === 1 ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </Link>

      <div className="hidden md:flex items-center space-x-2">
        {startPage > 1 && (
            <>
                <Link href="/blog?page=1" className="px-3 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">1</Link>
                {startPage > 2 && <span className="px-3 py-2 text-sm font-medium text-gray-500">...</span>}
            </>
        )}
        
        {pageNumbers.map(number => (
          <Link 
            key={number} 
            href={`/blog?page=${number}`}
            className={`px-3 py-2 text-sm font-medium rounded-md ${currentPage === number ? 'text-white bg-chicBlue' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
          >
            {number}
          </Link>
        ))}

        {endPage < totalPages && (
            <>
                {endPage < totalPages - 1 && <span className="px-3 py-2 text-sm font-medium text-gray-500">...</span>}
                <Link href={`/blog?page=${totalPages}`} className="px-3 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">{totalPages}</Link>
            </>
        )}
      </div>

      <Link 
        href={currentPage < totalPages ? `/blog?page=${currentPage + 1}` : '#'} 
        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${currentPage === totalPages ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
        aria-disabled={currentPage === totalPages}
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </Link>
    </nav>
  );
};

export default function BlogPageClient({ articles, tags, totalArticles, currentPage, totalPages }: BlogPageClientProps) {
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get('tag');

  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    let filtered = articles;

    if (selectedTag) {
      filtered = filtered.filter(article => article.tags && article.tags.includes(selectedTag));
    }

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(lowercasedQuery) ||
        article.summary.toLowerCase().includes(lowercasedQuery)
      );
    }

    return filtered;
  }, [articles, selectedTag, searchQuery]);

  return (
    <Layout>
      <section className="py-section-y">
        <div className="container mx-auto px-4">
          <div className="relative mb-content-gap max-w-md">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-chicBlue focus:border-chicBlue text-gray-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <div className="flex flex-col md:flex-row gap-x-section-gap">
            {/* Articles List */}
            <div className="w-full md:w-2/3">
              {filteredArticles.length === 0 ? (
                <div className="max-w-2xl">
                  <p className="text-body-base text-gray-600">No articles found on this page.</p>
                </div>
              ) : (
                <>
                  <ul className="space-y-0">
                    {filteredArticles.map((article, index) => (
                      <li
                        key={article.slug}
                        className={`py-content-gap ${index < filteredArticles.length - 1 ? "border-b border-gray-300" : ""}`}
                      >
                        <Link href={`/blog/${article.slug}`} className="block group">
                          <h2 className="text-heading-md font-semibold text-textDark group-hover:text-chicBlue group-hover:underline mb-px">
                            {article.title}
                          </h2>
                          <div className="flex items-center space-x-2 text-body-sm text-gray-500 mb-item-gap">
                            <span>{article.date}</span>
                            {article.tags && article.tags.length > 0 && <span>·</span>}
                            <div className="flex flex-wrap gap-x-2 gap-y-1">
                              {article.tags?.map(tag => (
                                <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-sm text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-body-base text-gray-700">
                            {article.summary}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Pagination currentPage={currentPage} totalPages={totalPages} />
                </>
              )}
            </div>

            {/* Tags Sidebar */}
            <aside className="w-full md:w-1/3 md:pl-item-gap mt-section-gap md:mt-0">
              <div className="sticky top-24 p-6 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-heading-sm font-semibold mb-item-gap text-textDark">Tags</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/blog" className={`hover:underline ${!selectedTag ? 'text-chicBlue font-bold' : 'text-chicBlue'}`}>
                      All ({totalArticles})
                    </Link>
                  </li>
                  {Object.entries(tags)
                    .sort(([, countA], [, countB]) => countB - countA)
                    .map(([tag, count]) => (
                      <li key={tag}>
                        <Link href={`/blog?tag=${tag}`} className={`hover:underline ${selectedTag === tag ? 'text-chicBlue font-bold' : 'text-chicBlue'}`}>
                          {tag} ({count})
                        </Link>
                      </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
} 