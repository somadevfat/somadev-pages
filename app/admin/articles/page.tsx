"use client";
import { useEffect, useState } from "react";
import { getContents } from "@/lib/api-client";
import Link from "next/link";
import type { Content } from "@/types/content";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Content[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getContents("articles");
  // 日付で降順にソート
      setArticles(
        data.sort((a, b) => {
    const dateA = new Date(a.metadata.date);
    const dateB = new Date(b.metadata.date);
    return dateB.getTime() - dateA.getTime();
        })
      );
    })();
  }, []);

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-md h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Articles</h1>
        <Link
          href="/admin/new"
          data-testid="new-article-button"
          className="inline-flex items-center px-3 py-2 md:px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          New Article
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4 min-w-[120px]">
                Title
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6 min-w-[100px]">
                Date
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4 min-w-[120px]">
                Tags
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5 min-w-[100px]">
                Slug
              </th>
              <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6 min-w-[120px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200" data-testid="articles-table-body">
            {articles.map((article) => (
              <tr key={article.slug}>
                <td className="px-3 py-4 text-sm font-medium text-gray-900 max-w-0 truncate">
                  <div className="truncate" title={article.metadata.title}>
                    {article.metadata.title}
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(article.metadata.date).toLocaleDateString()}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 max-w-0">
                  <div className="truncate" title={article.metadata.tags?.join(", ")}>
                    {article.metadata.tags?.join(", ")}
                  </div>
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 max-w-0">
                  <div className="truncate" title={article.slug}>
                    {article.slug}
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link
                      href={`/admin/edit/${article.slug}`}
                      data-testid={`edit-${article.slug}`}
                      className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-indigo-600 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-900"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      data-testid={`delete-${article.slug}`}
                      className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-800"
                      onClick={async () => {
                        if (window.confirm('Are you sure you want to delete this article?')) {
                          await fetch(`/api/proxy/contents/articles/${article.slug}`, { method: "DELETE" });
                          // Remove deleted article from local state without reload
                          setArticles((prev) => prev.filter((a) => a.slug !== article.slug));
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 