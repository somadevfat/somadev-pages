import Layout from '@/components/Layout';

const CareerPage = () => {
  const careerData = [
    {
      company: "Sample Company Inc.",
      period: "Jan 2022 - Present",
      title: "Senior Frontend Developer",
      description: "Led the development of several key features for the company's flagship product, focusing on performance and user experience. Mentored junior developers and contributed to improving the team's development processes."
    },
    {
      company: "Another Tech LLC",
      period: "Jun 2020 - Dec 2021",
      title: "Full Stack Developer",
      description: "Worked on both frontend and backend development for various client projects. Utilized React, Node.js, and cloud services to deliver scalable solutions."
    },
    {
      company: "Web Solutions Co.",
      period: "Aug 2018 - May 2020",
      title: "Junior Web Developer",
      description: "Assisted in the development and maintenance of client websites. Gained experience with HTML, CSS, JavaScript, and various CMS platforms."
    },
  ];

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center text-textDark">
            Career
          </h1>
          <div className="max-w-3xl mx-auto">
            {careerData.map((job, index) => (
              <div key={index} className="mb-10 p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <h2 className="text-2xl font-semibold text-chicBlue mb-1">
                  {job.company}
                </h2>
                <p className="text-sm text-gray-500 mb-2">{job.period}</p>
                <h3 className="text-xl font-medium text-textDark mb-2">{job.title}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {job.description}
                </p>
              </div>
            ))}
            <div className="mt-12 text-center">
              <p className="text-gray-600">
                If you need a detailed explanation (results and impacts), please contact me via <a href="#" className="text-chicBlue underline hover:text-blue-700">LinkedIn</a>. Then, I'll send you a complete resume.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CareerPage; 