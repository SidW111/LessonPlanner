import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generateLessonPlan } from "@/services/geminiApi";
import LessonPlan from "@/components/LessonPlan"; // ✅ Import the Lesson Plan component
import DarkModeToggle from "@/components/DarkModeToggle";

interface LessonData {
  topic: string;
  date: string;
  subject: string;
  gradeLevel: string;
  mainConcept: string;
  materials: string;
  learningObjectives: string;
  lessonOutline: string;
  assessment: string;
  notes: string;
  lessonOutlineItems: { id: string; content: string }[];
}


const Dashboard = () => {
  const [lessonData, setLessonData] = useState<LessonData>({
    topic: "",
    date: new Date().toISOString().split("T")[0], 
    subject: "",
    gradeLevel: "",
    mainConcept: "",
    materials: "",
    learningObjectives: "",
    lessonOutline: "",
    assessment: "",
    notes: "",
    lessonOutlineItems: []
  });

  const [loading, setLoading] = useState(false);
  const [showEditablePlan, setShowEditablePlan] = useState(false);

  const handleChange = (field: string, value: string) => {
    setLessonData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateLessonPlan(lessonData);
    console.log("AI Response", result)
    setLessonData((prev) => ({ ...prev, lessonOutline: result })); // Store AI response in state
    setLoading(false);
    setShowEditablePlan(true); // ✅ Show the editable version
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-900 dark:text-white min-h-screen transition">
      
      <DarkModeToggle />
      
      <h1 className="text-2xl font-bold mb-4">Lesson Planner</h1>
      <Card className="p-6 shadow-md">
        <Input placeholder="Topic" value={lessonData.topic} onChange={(e) => handleChange("topic", e.target.value)} className="mb-2" />
        <Input placeholder="Subject" value={lessonData.subject} onChange={(e) => handleChange("subject", e.target.value)} className="mb-2" />
        <Input placeholder="Grade Level" value={lessonData.gradeLevel} onChange={(e) => handleChange("gradeLevel", e.target.value)} className="mb-2" />
        <Textarea placeholder="Main Concept & Subtopics" value={lessonData.mainConcept} onChange={(e) => handleChange("mainConcept", e.target.value)} className="mb-2" />
        <Textarea placeholder="Materials Needed" value={lessonData.materials} onChange={(e) => handleChange("materials", e.target.value)} className="mb-2" />
        <Textarea placeholder="Learning Objectives" value={lessonData.learningObjectives} onChange={(e) => handleChange("learningObjectives", e.target.value)} className="mb-2" />

        <Button onClick={handleGenerate} className="mt-4 w-full" disabled={loading}>
          {loading ? "Generating..." : "Generate Lesson Plan (AI)"}
        </Button>
      </Card>

      {showEditablePlan && (
        <LessonPlan lessonData={lessonData} setLessonData={setLessonData} />
      )}
    </div>
  );
};

export default Dashboard;
