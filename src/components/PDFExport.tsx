
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
import html2pdf from 'html2pdf.js';

const PDFExport = () => {
  const { resumeData, selectedTemplate } = useResumeContext();
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExport = () => {
    if (!previewRef.current) {
      toast.error("Could not generate PDF. Please try again.");
      return;
    }

    toast.loading("Generating PDF...");

    // Clone the preview div to avoid modifying the visible DOM
    const element = previewRef.current.cloneNode(true) as HTMLElement;
    
    // Remove the scaling for the PDF export
    element.style.transform = 'none';
    element.style.width = '100%';
    element.style.height = '100%';

    // Configure html2pdf options
    const opt = {
      margin: [0, 0, 0, 0],
      filename: `${resumeData.personal.name || 'Resume'}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' 
      }
    };

    // Generate PDF and trigger download
    html2pdf().from(element).set(opt).save()
      .then(() => {
        toast.dismiss();
        toast.success("Resume PDF downloaded successfully!");
      })
      .catch((error) => {
        console.error("PDF generation error:", error);
        toast.dismiss();
        toast.error("Failed to generate PDF. Please try again.");
      });
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
