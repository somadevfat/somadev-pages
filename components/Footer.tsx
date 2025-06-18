import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 border-t border-gray-200 mt-auto w-full text-center">
      <nav className="mb-4">
        <ul className="flex justify-center space-x-4 items-center flex-wrap">
          <li>
            <Link href="/contact" className="text-body-sm font-medium text-gray-600 hover:text-chicBlue whitespace-nowrap">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-body-sm font-medium text-gray-600 hover:text-chicBlue whitespace-nowrap">
              Blog
            </Link>
          </li>
        </ul>
      </nav>
      <div className="text-body-sm text-gray-500">
        <p>&copy; {currentYear} fanda-dev.com</p>
      </div>
    </footer>
  );
};

export default Footer; 