import Link from 'next/link';

const Header = () => {
  const contactUrl = "/contact"; // Placeholder, assuming a contact page or section

  return (
    <header className="w-full border-b border-gray-200">
      <div className="max-w-4xl w-full mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-header-title font-semibold text-textDark hover:text-chicBlue whitespace-nowrap">
          Soma on bush
        </Link>
        <nav>
          <ul className="flex space-x-4 sm:space-x-5 items-center flex-wrap justify-end">
            <li>
              <Link href="/blog" className="text-header-nav font-semibold text-textDark hover:text-chicBlue whitespace-nowrap">
                Blog
              </Link>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/somahirano/" target="_blank" rel="noopener noreferrer" className="text-header-nav font-semibold text-textDark hover:text-chicBlue whitespace-nowrap">
                LinkedIn
              </a>
            </li>
            <li>
              <Link href="/projects" className="text-header-nav font-semibold text-textDark hover:text-chicBlue whitespace-nowrap">
                Projects
              </Link>
            </li>
            <li>
              <Link href={contactUrl} className="text-header-nav font-semibold text-textDark hover:text-chicBlue whitespace-nowrap">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 