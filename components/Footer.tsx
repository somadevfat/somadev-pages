import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 border-t border-gray-200 mt-auto w-full text-sm">
      <div className="container mx-auto text-center">
        <nav className="mb-4">
          <ul className="flex justify-center space-x-6">
            <li>
              <Link href="/blog" className="text-gray-600 hover:text-chicBlue">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/career" className="text-gray-600 hover:text-chicBlue">
                Career
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-gray-600 hover:text-chicBlue">
                Projects
              </Link>
            </li>
            {/* <li>
              <Link href="/contact" className="text-gray-600 hover:text-chicBlue">
                Contact
              </Link>
            </li> */}
          </ul>
        </nav>
        <div className="text-gray-500">
          <p>&copy; {currentYear} soma-pages</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 