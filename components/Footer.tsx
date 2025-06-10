import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const githubUrl = "https://github.com/soma-dev"; // Placeholder
  const linkedInUrl = "https://www.linkedin.com/in/somahirano/";

  return (
    <footer className="py-10 border-t border-gray-200 mt-auto w-full text-center">
      <nav className="mb-4">
        <ul className="flex justify-center space-x-4 items-center flex-wrap">
          <li>
            <Link href="/" className="text-body-sm font-medium text-gray-600 hover:text-chicBlue whitespace-nowrap">
              About
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-body-sm font-medium text-gray-600 hover:text-chicBlue whitespace-nowrap">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/career" className="text-body-sm font-medium text-gray-600 hover:text-chicBlue whitespace-nowrap">
              Career
            </Link>
          </li>
          <li>
            <Link href="/projects" className="text-body-sm font-medium text-gray-600 hover:text-chicBlue whitespace-nowrap">
              Projects
            </Link>
          </li>
          <li>
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-body-sm font-medium text-gray-600 hover:text-chicBlue whitespace-nowrap">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-body-sm font-medium text-gray-600 hover:text-chicBlue whitespace-nowrap">
              GitHub
            </a>
          </li>
        </ul>
      </nav>
      <div className="text-body-sm text-gray-500">
        <p>&copy; {currentYear} Soma on bush</p>
      </div>
    </footer>
  );
};

export default Footer; 