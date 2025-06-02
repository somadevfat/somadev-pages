import Layout from '@/components/Layout';
import Image from 'next/image'; // For project image placeholders
import Link from 'next/link'; // For project links

const ProjectsPage = () => {
  const projectData = [
    {
      title: "Project Alpha",
      description: "A web application for managing tasks and collaborations. Built with modern web technologies to ensure scalability and a great user experience.",
      techStack: ["Next.js", "TypeScript", "TailwindCSS", "Supabase"],
      imageUrl: "https://via.placeholder.com/400x250.png?text=Project+Alpha+Screenshot",
      projectUrl: "#", // Replace with actual project URL
      repoUrl: "#", // Replace with actual GitHub/repo URL
    },
    {
      title: "Beta Framework",
      description: "An open-source library aimed at simplifying backend development for Node.js applications. Features include routing, middleware, and ORM integration.",
      techStack: ["Node.js", "TypeScript", "Express.js", "PostgreSQL"],
      imageUrl: "https://via.placeholder.com/400x250.png?text=Beta+Framework+Logo",
      projectUrl: "#",
      repoUrl: "#",
    },
    {
      title: "Gamma Design System",
      description: "A comprehensive design system with reusable React components to ensure consistency and accelerate UI development across multiple projects.",
      techStack: ["React", "Styled-Components", "Storybook"],
      imageUrl: "https://via.placeholder.com/400x250.png?text=Gamma+Components",
      projectUrl: "#",
      // repoUrl: null, // If no repo URL
    },
  ];

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-textDark">
            Projects
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectData.map((project, index) => (
              <div key={index} className="border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200">
                <div className="relative w-full h-48 md:h-56">
                  <Image
                    src={project.imageUrl}
                    alt={`${project.title} screenshot`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-semibold text-chicBlue mb-2">
                    {project.title}
                  </h2>
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-textDark mb-1">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-100 flex space-x-4">
                    {project.projectUrl && project.projectUrl !== "#" && (
                      <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-chicBlue hover:underline text-sm">
                        View Project
                      </Link>
                    )}
                    {project.repoUrl && project.repoUrl !== "#" && (
                      <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-chicBlue hover:underline text-sm">
                        View Code
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsPage; 