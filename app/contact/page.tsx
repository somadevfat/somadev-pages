import Layout from '@/components/Layout';
import Link from 'next/link';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-section-title-lg font-bold text-gray-800 mb-6">
              Contact
            </h1>
            <p className="text-body-base text-gray-600 leading-relaxed mb-12">
              お問い合わせやプロジェクトの相談など、お気軽にご連絡ください。
              以下の連絡先から直接メッセージをお送りいただけます。
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-8">
              
              {/* Email */}
              <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-chicBlue mr-6">
                  <FaEnvelope size={24} />
                </div>
                <div>
                  <h3 className="text-item-title font-semibold text-gray-700 mb-1">
                    Email
                  </h3>
                  <a 
                    href="mailto:somahiranodev@gmail.com" 
                    className="text-body-base text-chicBlue hover:underline break-all"
                  >
                    somahiranodev@gmail.com
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-chicBlue mr-6">
                  <FaLinkedin size={24} />
                </div>
                <div>
                  <h3 className="text-item-title font-semibold text-gray-700 mb-1">
                    LinkedIn
                  </h3>
                  <a 
                    href="https://www.linkedin.com/in/somahirano" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-body-base text-chicBlue hover:underline"
                  >
                    www.linkedin.com/in/somahirano
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-chicBlue mr-6">
                  <FaGithub size={24} />
                </div>
                <div>
                  <h3 className="text-item-title font-semibold text-gray-700 mb-1">
                    GitHub
                  </h3>
                  <a 
                    href="https://github.com/somadevfat" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-body-base text-chicBlue hover:underline"
                  >
                    github.com/somadevfat
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <p className="text-body-base text-gray-600 mb-6">
                ご連絡をお待ちしております。通常2営業日以内にご返信いたします。
              </p>
              <Link 
                href="/"
                className="inline-block px-6 py-3 bg-chicBlue text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                ホームに戻る
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 