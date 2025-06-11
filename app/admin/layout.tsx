import Link from 'next/link';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold">
          <Link href="/admin">CMS Admin</Link>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded hover:bg-gray-700">
            Dashboard
          </Link>
          <Link href="/admin/articles" className="block px-4 py-2 rounded hover:bg-gray-700">
            Articles
          </Link>
          <Link href="/admin/new" className="block px-4 py-2 rounded hover:bg-gray-700">
            New Post
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
} 