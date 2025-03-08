
import { ResumeData } from "@/lib/resumeContext";

interface ClassicTemplateProps {
  resumeData: ResumeData;
}

const ClassicTemplate = ({ resumeData }: ClassicTemplateProps) => {
  const { personal, experience, education, skills, projects, certifications } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-800 p-8 flex flex-col font-serif">
      {/* Header */}
      <header className="border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-center uppercase mb-1">{personal.name || "Your Name"}</h1>
        <p className="text-lg font-medium text-center">{personal.title || "Professional Title"}</p>
        
        <div className="mt-3 flex justify-center flex-wrap gap-4 text-sm">
          {personal.email && (
            <div className="flex items-center gap-1">
              <span>Email:</span>
              <span>{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-1">
              <span>Phone:</span>
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.location && (
            <div className="flex items-center gap-1">
              <span>Location:</span>
              <span>{personal.location}</span>
            </div>
          )}
          {personal.website && (
            <div className="flex items-center gap-1">
              <span>Website:</span>
              <span>{personal.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personal.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold border-b border-gray-300 mb-2 pb-1">Professional Summary</h2>
          <p className="text-sm">{personal.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold border-b border-gray-300 mb-2 pb-1">Work Experience</h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={index} className="text-sm">
                <div className="flex justify-between">
                  <h3 className="font-bold">{exp.position}</h3>
                  <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                </div>
                <div className="font-semibold">{exp.company}, {exp.location}</div>
                {exp.description && <p className="mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold border-b border-gray-300 mb-2 pb-1">Education</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="text-sm">
                <div className="flex justify-between">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <span>{edu.startDate} - {edu.endDate || 'Present'}</span>
                </div>
                <div className="font-semibold">{edu.institution}, {edu.location}</div>
                {edu.description && <p className="mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold border-b border-gray-300 mb-2 pb-1">Skills</h2>
          <div className="flex flex-wrap gap-x-1 gap-y-1">
            {skills.map((skill, index) => (
              <span key={index} className="text-sm">
                {skill.name}{index < skills.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold border-b border-gray-300 mb-2 pb-1">Projects</h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index} className="text-sm">
                <h3 className="font-bold">{project.name}</h3>
                {project.description && <p className="mt-1">{project.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h2 className="text-xl font-bold border-b border-gray-300 mb-2 pb-1">Certifications</h2>
          <div className="space-y-2">
            {certifications.map((cert, index) => (
              <div key={index} className="text-sm">
                <div className="flex justify-between">
                  <h3 className="font-bold">{cert.name}</h3>
                  <span>{cert.date}</span>
                </div>
                <div className="font-semibold">{cert.issuer}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
