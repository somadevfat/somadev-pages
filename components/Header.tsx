import Link from 'next/link';

const Header = () => {
  return (
    <header className="py-6 border-b border-gray-200">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
          My Portfolio
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600">
                Blog
              </Link>
            </li>
            {/* Optional Links - 必要に応じてコメントアウトを解除 */}
            {/*
            <li>
              <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600">
                LinkedIn
              </a>
            </li>
            */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 