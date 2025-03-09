
import { useRef } from "react";
import { useResumeContext } from "@/lib/resumeContext";
import { getTemplateByKey } from "@/lib/templates";
import { cn } from "@/lib/utils";

interface ResumePreviewProps {
  fullPage?: boolean;
}

const ResumePreview = ({ fullPage = false }: ResumePreviewProps) => {
  const { resumeData, selectedTemplate } = useResumeContext();
  const previewRef = useRef<HTMLDivElement>(null);

  const Template = getTemplateByKey(selectedTemplate);

  return (
    <div className={cn(
      "bg-white rounded-lg shadow-lg overflow-hidden mx-auto",
      fullPage ? "w-full max-w-full md:max-w-4xl h-auto min-h-[800px] md:min-h-[1056px]" : "w-full max-w-[100%] md:max-w-full aspect-[1/1.414] scale-90 origin-top", // A4 ratio with improved mobile width
    )}>
      <div 
        ref={previewRef}
        className="w-full h-full bg-white"
        style={{
          transform: fullPage ? "none" : "scale(0.65)", // Smaller scale on mobile
          transformOrigin: "top center",
        }}
      >
        <Template resumeData={resumeData} />
      </div>
    </div>
  );
};

export default ResumePreview;
