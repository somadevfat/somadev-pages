import Link from 'next/link';

const Header = () => {
  const contactUrl = "/contact"; // Placeholder, assuming a contact page or section

  return (
    <header className="py-4 border-b border-gray-200">
      <div className="container mx-auto px-4 flex justify-between items-center w-full">
        <Link href="/" className="text-lg sm:text-xl font-semibold text-textDark hover:text-chicBlue whitespace-nowrap">
          soma-pages
        </Link>
        <nav>
          <ul className="flex space-x-4 sm:space-x-5 items-center flex-wrap justify-end">
            <li>
              <Link href="/blog" className="text-sm font-semibold text-textDark hover:text-chicBlue whitespace-nowrap">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm font-semibold text-textDark hover:text-chicBlue whitespace-nowrap">
                LinkedIn
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-sm font-semibold text-textDark hover:text-chicBlue whitespace-nowrap">
                Projects
              </Link>
            </li>
            <li>
              <Link href={contactUrl} className="text-sm font-semibold text-textDark hover:text-chicBlue whitespace-nowrap">
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