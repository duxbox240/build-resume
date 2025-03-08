
import { useRef } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useResumeContext } from "@/lib/resumeContext";
import { getTemplateByKey } from "@/lib/templates";
import { toast } from "sonner";

const PDFExport = () => {
  const { resumeData, selectedTemplate } = useResumeContext();
  const previewRef = useRef<HTMLDivElement>(null);

  // This would use a library like html2pdf.js or jsPDF in a real implementation
  const handleExport = () => {
    // Simulate download delay
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: "Generating PDF...",
        success: "Resume PDF downloaded successfully!",
        error: "Failed to generate PDF. Please try again.",
      }
    );
  };

  const Template = getTemplateByKey(selectedTemplate);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Export Resume as PDF</DialogTitle>
          <DialogDescription>
            Preview your resume before exporting to PDF
          </DialogDescription>
        </DialogHeader>
        
        <Separator className="my-4" />
        
        <div className="flex flex-col items-center">
          <div
            className="h-80 w-full overflow-hidden bg-white rounded border"
            style={{ maxHeight: "300px" }}
          >
            <div 
              ref={previewRef}
              className="w-full h-full scale-50 origin-top"
              style={{ transformOrigin: "top center" }}
            >
              <Template resumeData={resumeData} />
            </div>
          </div>
          
          <Button onClick={handleExport} className="mt-6">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFExport;
