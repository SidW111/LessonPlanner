import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export const generatePDF = async (lessonData: any) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontSize = 12;
  const pageMargin = 50;
  const lineSpacing = 20;
  const pageHeight = 800;
  const pageWidth = 600;
  let y = pageHeight - 50;

  const addNewPage = () => {
    const newPage = pdfDoc.addPage([pageWidth, pageHeight]);
    y = pageHeight - 50;
    return newPage;
  };

  let page = pdfDoc.addPage([pageWidth, pageHeight]);

  const addText = (text: string, size = fontSize, isBold = false) => {
    const safeText = (text || "").replace(/[^\x00-\x7F]/g, ""); // Remove unsupported characters
    const lines = safeText.split("\n");
    lines.forEach((lineText) => {
      if (y < 50) page = addNewPage();
      page.drawText(lineText, { x: pageMargin, y, size, font: isBold ? boldFont : font, color: rgb(0, 0, 0) });
      y -= lineSpacing;
    });
  };

  addText("Lesson Plan", 18, true);
  addText(`Topic: ${lessonData.topic}`, 14, true);
  addText(`Date: ${lessonData.date}`);
  addText(`Subject: ${lessonData.subject}`);
  addText(`Grade Level: ${lessonData.gradeLevel}`);
  addText("\nMain Concept & Subtopics:", 14, true);
  addText(lessonData.mainConcept);
  addText("\nMaterials Needed:", 14, true);
  addText(lessonData.materials);
  addText("\nLearning Objectives:", 14, true);
  addText(lessonData.learningObjectives);
  addText("\nLesson Outline:", 14, true);
  addText(lessonData.lessonOutline, 12);

  //addText("\nNotes:", 14, true);
  addText(lessonData.notes);

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${lessonData.topic}-LessonPlan.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
