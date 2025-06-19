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
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Articles</h1>
        <Link
          href="/admin/articles/new"
          data-testid="new-article-button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          New Article
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tags
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200" data-testid="articles-table-body">
            {articles.map((article) => (
              <tr key={article.slug}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {article.metadata.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {article.metadata.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {article.metadata.tags?.join(", ")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.slug}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                  <Link
                    href={`/admin/edit/${article.slug}`}
                    data-testid={`edit-${article.slug}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    data-testid={`delete-${article.slug}`}
                    className="text-red-600 hover:text-red-800"
                    onClick={async () => {
                      await fetch(`/api/proxy/contents/articles/${article.slug}`, { method: "DELETE" });
                      // Remove deleted article from local state without reload
                      setArticles((prev) => prev.filter((a) => a.slug !== article.slug));
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 