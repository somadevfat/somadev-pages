import Layout from '@/components/Layout';

const CareerPage = () => {
  return (
    <Layout>
      <section className="py-section-y">
        <div className="container mx-auto px-4">
          <h1 className="text-display font-bold mb-content-gap text-center sm:text-left">
            Career
          </h1>

          <div className="space-y-item-gap">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-heading-md font-semibold mb-2">Placeholder Company Inc. - Jan 202X - Present</h2>
              <ul className="list-disc list-inside space-y-1 text-body-base">
                <li>Developed and maintained web applications using React, Next.js, and TypeScript.</li>
                <li>Collaborated with cross-functional teams to deliver high-quality software solutions.</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-heading-md font-semibold mb-2">Previous Tech Ltd. - Mar 20XX - Dec 202X</h2>
              <ul className="list-disc list-inside space-y-1 text-body-base">
                <li>Contributed to the development of a SaaS platform.</li>
                <li>Focused on front-end development and user experience improvements.</li>
              </ul>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-heading-md font-semibold mb-2">First Job Co. - Jun 20XX - Feb 20XX</h2>
              <ul className="list-disc list-inside space-y-1 text-body-base">
                <li>Assisted in the development of internal tools and websites.</li>
                <li>Gained foundational experience in web development.</li>
              </ul>
            </div>
          </div>

          <p className="mt-content-gap text-body-base">
            If you need a detailed explanation (results and impacts), please contact me via LinkedIn. Then, I&apos;ll send you a complete resume.
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4">
        <hr className="my-section-y border-t border-gray-200" />
      </div>
    </Layout>
  );
};

export default CareerPage; 