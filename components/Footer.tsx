const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-6 border-t border-gray-200 mt-auto w-full">
      <div className="text-center text-gray-600">
        <p>&copy; {currentYear} My Portfolio</p>
      </div>
    </footer>
  );
};

export default Footer; 