const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-6 border-t border-gray-200 mt-auto">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center text-gray-600">
        <p>&copy; {currentYear} My Portfolio</p>
      </div>
    </footer>
  );
};

export default Footer; 