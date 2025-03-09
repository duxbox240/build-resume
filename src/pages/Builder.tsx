
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Save, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import Navbar from "@/components/Navbar";
import { useResumeContext } from "@/lib/resumeContext";
import PDFExport from "@/components/PDFExport";
import { toast } from "sonner";

const Builder = () => {
  const [activeTab, setActiveTab] = useState<string>("edit");
  const { resumeData, selectedTemplate } = useResumeContext();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/templates");
  };

  const handleSave = () => {
    // For demo, just show toast. In production, would save to database
    toast.success("Resume saved successfully", {
      description: "Your resume has been saved to your account.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-2 sm:px-4 pt-20 pb-16 flex-1 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-8 gap-3">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleBack} className="h-8 w-8 md:h-10 md:w-10">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Resume Builder
            </h1>
          </div>

          <div className="flex gap-2 w-full md:w-auto mt-3 md:mt-0">
            <Button variant="outline" onClick={handleSave} className="flex-1 md:flex-none text-sm px-3 py-1 h-9 md:h-10">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <PDFExport className="flex-1 md:flex-none text-sm px-3 py-1 h-9 md:h-10" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 flex-1">
          <Tabs
            defaultValue="edit"
            value={activeTab}
            onValueChange={setActiveTab}
            className="col-span-1 lg:col-span-12 flex flex-col flex-1"
          >
            <div className="flex justify-center mb-4 md:mb-6">
              <TabsList className="h-9 md:h-10">
                <TabsTrigger value="edit" className="text-sm md:text-base px-4 py-1.5">Edit</TabsTrigger>
                <TabsTrigger value="preview" className="text-sm md:text-base px-4 py-1.5">Preview</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="edit" className="flex-1 flex m-0">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 w-full flex-1">
                <div className="lg:col-span-5 xl:col-span-4">
                  <ResumeForm />
                </div>
                <div className="hidden lg:block lg:col-span-7 xl:col-span-8">
                  <div className="sticky top-24">
                    <ResumePreview />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="flex-1 m-0">
              <div className="max-w-4xl mx-auto w-full pt-4">
                <ResumePreview fullPage />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Builder;
