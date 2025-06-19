'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Failed to logout:', error);
      // Optionally, show an error message to the user
    } finally {
      router.replace('/login');
    }
  };

  const Sidebar = (
    <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white flex flex-col transform transition-transform duration-200 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:inset-auto md:transform-none`}>        
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        <Link href="/admin" onClick={() => setSidebarOpen(false)}>CMS Admin</Link>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
        <Link href="/admin" className="block px-4 py-2 rounded hover:bg-gray-700" onClick={() => setSidebarOpen(false)}>
          Dashboard
        </Link>
        <Link href="/admin/articles" className="block px-4 py-2 rounded hover:bg-gray-700" onClick={() => setSidebarOpen(false)}>
          Articles
        </Link>
        <Link href="/admin/new" className="block px-4 py-2 rounded hover:bg-gray-700" onClick={() => setSidebarOpen(false)}>
          New Post
        </Link>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          data-testid="logout-button"
          className="w-full text-left px-4 py-2 rounded hover:bg-red-500 hover:text-white"
        >
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar & overlay */}
      <div className="md:hidden">
        {Sidebar}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block">{Sidebar}</div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-2 bg-white shadow md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            aria-label="Open sidebar"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-semibold text-lg">CMS Admin</span>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
} 