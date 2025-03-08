
import { ResumeData } from "@/lib/resumeContext";

interface ModernTemplateProps {
  resumeData: ResumeData;
}

const ModernTemplate = ({ resumeData }: ModernTemplateProps) => {
  const { personal, experience, education, skills, projects, certifications } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-800 p-8 flex flex-col">
      {/* Header */}
      <header className="border-b border-primary pb-4 mb-6">
        <h1 className="text-3xl font-bold text-primary">{personal.name || "Your Name"}</h1>
        <p className="text-xl font-medium text-gray-600">{personal.title || "Professional Title"}</p>
        
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          {personal.email && (
            <div className="flex items-center gap-1">
              <span>📧</span>
              <span>{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-1">
              <span>📱</span>
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.location && (
            <div className="flex items-center gap-1">
              <span>📍</span>
              <span>{personal.location}</span>
            </div>
          )}
          {personal.website && (
            <div className="flex items-center gap-1">
              <span>🌐</span>
              <span>{personal.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personal.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-primary mb-2">Professional Summary</h2>
          <p className="text-sm">{personal.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-primary mb-2">Work Experience</h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={index} className="text-sm">
                <div className="flex justify-between">
                  <h3 className="font-medium">{exp.position}</h3>
                  <span className="text-gray-600">{exp.startDate} - {exp.endDate || 'Present'}</span>
                </div>
                <div className="text-gray-600">{exp.company}, {exp.location}</div>
                {exp.description && <p className="mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-primary mb-2">Education</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="text-sm">
                <div className="flex justify-between">
                  <h3 className="font-medium">{edu.degree}</h3>
                  <span className="text-gray-600">{edu.startDate} - {edu.endDate || 'Present'}</span>
                </div>
                <div className="text-gray-600">{edu.institution}, {edu.location}</div>
                {edu.description && <p className="mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-primary mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-primary/10 px-2 py-1 rounded text-xs">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-primary mb-2">Projects</h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index} className="text-sm">
                <h3 className="font-medium">{project.name}</h3>
                {project.description && <p className="mt-1">{project.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-primary mb-2">Certifications</h2>
          <div className="space-y-2">
            {certifications.map((cert, index) => (
              <div key={index} className="text-sm">
                <div className="flex justify-between">
                  <h3 className="font-medium">{cert.name}</h3>
                  <span className="text-gray-600">{cert.date}</span>
                </div>
                <div className="text-gray-600">{cert.issuer}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;
