
import { ResumeData } from "@/lib/resumeContext";

interface ProfessionalTemplateProps {
  resumeData: ResumeData;
}

const ProfessionalTemplate = ({ resumeData }: ProfessionalTemplateProps) => {
  const { personal, experience, education, skills, projects, certifications } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-800 flex flex-col">
      {/* Header with colored background */}
      <header className="bg-gray-800 text-white p-8">
        <h1 className="text-3xl font-bold mb-1">{personal.name || "Your Name"}</h1>
        <p className="text-xl text-gray-300 mb-4">{personal.title || "Professional Title"}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {personal.email && (
            <div className="flex items-center gap-2">
              <span className="text-gray-300">Email:</span>
              <span>{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-2">
              <span className="text-gray-300">Phone:</span>
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.location && (
            <div className="flex items-center gap-2">
              <span className="text-gray-300">Location:</span>
              <span>{personal.location}</span>
            </div>
          )}
          {personal.website && (
            <div className="flex items-center gap-2">
              <span className="text-gray-300">Website:</span>
              <span>{personal.website}</span>
            </div>
          )}
        </div>
      </header>

      <div className="p-8">
        {/* Summary */}
        {personal.summary && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-b-2 border-gray-800 pb-1">Professional Summary</h2>
            <p className="text-sm">{personal.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-b-2 border-gray-800 pb-1">Work Experience</h2>
            <div className="space-y-5">
              {experience.map((exp, index) => (
                <div key={index} className="text-sm">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <h3 className="font-bold text-lg">{exp.position}</h3>
                    <span className="text-gray-600">{exp.startDate} - {exp.endDate || 'Present'}</span>
                  </div>
                  <div className="text-gray-700 font-medium mb-1">{exp.company}, {exp.location}</div>
                  {exp.description && <p>{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {/* Education */}
            {education.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3 border-b-2 border-gray-800 pb-1">Education</h2>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="text-sm">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <h3 className="font-bold">{edu.degree}</h3>
                        <span className="text-gray-600">{edu.startDate} - {edu.endDate || 'Present'}</span>
                      </div>
                      <div className="text-gray-700">{edu.institution}, {edu.location}</div>
                      {edu.description && <p className="mt-1">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3 border-b-2 border-gray-800 pb-1">Projects</h2>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={index} className="text-sm">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{project.name}</h3>
                        {project.link && (
                          <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-xs"
                          >
                            View Project
                          </a>
                        )}
                      </div>
                      {project.technologies && <p className="text-xs text-gray-600 mt-1">Technologies: {project.technologies}</p>}
                      {project.description && <p className="mt-1">{project.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div>
            {/* Skills */}
            {skills.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3 border-b-2 border-gray-800 pb-1">Skills</h2>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="bg-gray-100 px-3 py-1 rounded text-sm">
                      {skill.name}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3 border-b-2 border-gray-800 pb-1">Certifications</h2>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="text-sm">
                      <h3 className="font-bold">{cert.name}</h3>
                      <div className="text-gray-600">{cert.issuer}</div>
                      <div className="text-gray-500 text-xs">{cert.date}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
