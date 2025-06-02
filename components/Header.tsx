import Link from 'next/link';

const Header = () => {
  return (
    <header className="py-6 border-b border-gray-200 w-full">
      {/* <div className="container mx-auto flex justify-between items-center"> */}
      {/* container mx-auto を削除し、Layout.tsx側で幅制約をかける想定 */}
      <div className="flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-textDark hover:text-chicBlue">
          soma-pages
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-textDark hover:text-chicBlue">
                About
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-textDark hover:text-chicBlue">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/career" className="text-textDark hover:text-chicBlue">
                Career
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-textDark hover:text-chicBlue">
                Projects
              </Link>
            </li>
            {/* Optional Links - 必要に応じてコメントアウトを解除 */}
            {/*
            <li>
              <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="text-textDark hover:text-chicBlue">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="text-textDark hover:text-chicBlue">
                LinkedIn
              </a>
            </li>
            <li>
              <Link href="/contact" className="text-textDark hover:text-chicBlue">
                Contact
              </Link>
            </li>
            */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 