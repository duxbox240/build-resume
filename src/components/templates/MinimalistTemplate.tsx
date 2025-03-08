
import { ResumeData } from "@/lib/resumeContext";

interface MinimalistTemplateProps {
  resumeData: ResumeData;
}

const MinimalistTemplate = ({ resumeData }: MinimalistTemplateProps) => {
  const { personal, experience, education, skills, projects, certifications } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-800 p-8 flex flex-col">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-light tracking-wide uppercase mb-1">{personal.name || "Your Name"}</h1>
        <p className="text-gray-600">{personal.title || "Professional Title"}</p>
        
        <div className="mt-3 flex justify-center flex-wrap gap-6 text-sm text-gray-600">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personal.summary && (
        <section className="mb-6">
          <h2 className="text-sm uppercase tracking-wider border-b mb-2 pb-1">About</h2>
          <p className="text-sm">{personal.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm uppercase tracking-wider border-b mb-4 pb-1">Experience</h2>
          <div className="space-y-5">
            {experience.map((exp, index) => (
              <div key={index} className="text-sm">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{exp.position}</h3>
                  <span className="text-gray-600">{exp.startDate} - {exp.endDate || 'Present'}</span>
                </div>
                <div className="text-gray-600 italic">{exp.company}, {exp.location}</div>
                {exp.description && <p className="mt-1 text-sm">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm uppercase tracking-wider border-b mb-4 pb-1">Education</h2>
          <div className="space-y-5">
            {education.map((edu, index) => (
              <div key={index} className="text-sm">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <span className="text-gray-600">{edu.startDate} - {edu.endDate || 'Present'}</span>
                </div>
                <div className="text-gray-600 italic">{edu.institution}, {edu.location}</div>
                {edu.description && <p className="mt-1 text-sm">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm uppercase tracking-wider border-b mb-4 pb-1">Skills</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {skills.map((skill, index) => (
              <span key={index} className="text-sm">
                {skill}{index < skills.length - 1 ? " •" : ""}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm uppercase tracking-wider border-b mb-4 pb-1">Projects</h2>
          <div className="space-y-5">
            {projects.map((project, index) => (
              <div key={index} className="text-sm">
                <h3 className="font-semibold">{project.name}</h3>
                {project.description && <p className="mt-1 text-sm">{project.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h2 className="text-sm uppercase tracking-wider border-b mb-4 pb-1">Certifications</h2>
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <div key={index} className="text-sm">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <span className="text-gray-600">{cert.date}</span>
                </div>
                <div className="text-gray-600 italic">{cert.issuer}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MinimalistTemplate;
