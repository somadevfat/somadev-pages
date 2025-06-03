import React from 'react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <Header />
      <div className="w-full max-w-4xl">
        <main className="flex-grow py-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout; 