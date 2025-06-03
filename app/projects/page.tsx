import Layout from '@/components/Layout';
import Link from 'next/link';

const ProjectsPage = () => {
  const projects = [
    {
      title: "My Awesome Project 1",
      description: "A brief description of what this project is about, its goals, and key features. It solves a real-world problem by doing X, Y, and Z.",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "Supabase"],
      liveLink: "#",
      repoLink: "#",
    },
    {
      title: "Cool App 2024",
      description: "This application helps users to achieve specific tasks more efficiently. Built with a focus on user experience and modern web standards.",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      liveLink: "#",
    },
    {
      title: "Utility Tool Plus",
      description: "A handy utility tool that provides several useful functions for developers or general users. Simple, effective, and open source.",
      technologies: ["Python", "Flask", "JavaScript"],
      repoLink: "#",
    },
  ];

  return (
    <Layout>
      <section className="py-section-y">
        <div className="container mx-auto px-4">
          <h1 className="text-display font-bold mb-content-gap text-center sm:text-left">
            Projects
          </h1>

          <div className="grid md:grid-cols-2 gap-item-gap">
            {projects.map((project, index) => (
              <div key={index} className="bg-white shadow-sm rounded-lg p-6 flex flex-col">
                <h2 className="text-heading-md font-semibold mb-2">{project.title}</h2>
                <p className="text-body-base mb-item-gap flex-grow">{project.description}</p>
                <div className="mb-item-gap">
                  <h3 className="text-body-sm font-semibold mb-1">Technologies:</h3>
                  <ul className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <li key={tech} className="bg-chicBlue/10 text-chicBlue text-xs font-medium px-2 py-0.5 rounded-full">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex space-x-4 mt-auto">
                  {project.liveLink && (
                    <Link href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-chicBlue hover:underline font-medium">
                      Live Demo
                    </Link>
                  )}
                  {project.repoLink && (
                    <Link href={project.repoLink} target="_blank" rel="noopener noreferrer" className="text-chicBlue hover:underline font-medium">
                      GitHub Repo
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4">
        <hr className="my-section-y border-t border-gray-200" />
      </div>
    </Layout>
  );
};

export default ProjectsPage; 