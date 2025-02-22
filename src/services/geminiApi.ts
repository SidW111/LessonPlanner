interface LessonData {
    topic: string;
    date: string;
    subject: string;
    gradeLevel: string;
    mainConcept: string;
    materials: string;
    learningObjectives: string;
    assessment?: string;
    notes?: string;
  }

export const generateLessonPlan = async (lessonData: LessonData): Promise<string> => {
    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!API_KEY) {
      console.error("🚨 API Key is missing! Check your .env.local file.");
      return "Error: API key not found.";
    }
  
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;
  
    
    const prompt = `
    Generate a structured lesson plan using the following template.
    The "Lesson Outline" section MUST be a properly formatted Markdown table.
    Return ONLY the lesson plan. Do NOT include any extra explanations.
    
    ---
    **LESSON PLAN**
    
    **Topic:** ${lessonData.topic}  
    **Summary:** (Provide a brief overview of the lesson)  
    
    **Date:** ${lessonData.date}  
    **Subject:** ${lessonData.subject}  
    **Year Group or Grade Level:** ${lessonData.gradeLevel}  
    
    ---
    **Main Topic or Unit:**  
    ${lessonData.mainConcept}  
    
    **Subtopics or Key Concepts:**  
    - (List important subtopics related to the lesson)  
    
    ---
    **Materials Needed:**  
    - (List any objects for demonstrations, activities, or references)  
    
    ---
    **Learning Objectives:**  
    - (Include at least two outcomes that help set and manage expectations)  
    - (Identify higher and lower-level thinking skills based on Bloom’s Taxonomy)  
    
    ---
    **Lesson Outline**  
    
    | Duration | Guide | Remarks |
    |----------|---------------------------------|---------------------------------|
    | xx min   | Springboard question or activity | (Add a reminder or personal prompts here) |
    | xx min   | Introduction of a new topic or continuation of a previous lesson |  |
    | xx min   | Review of previous concepts (as needed) |  |
    | xx min   | Main Discussion |  |
    | xx min   | Independent or Guided Activities |  |
    | xx min   | Assessment or Evaluation |  |
    | xx min   | Others |  |
    
    ---
    **Notes:**  
    (Add pre-lesson reminders or post-discussion observations here)
    
    ---
    **Important:**  
    - The "Lesson Outline" **must** be formatted as a Markdown table.  
    - The response **MUST** include the lesson plan **exactly as structured above**.  
    - **DO NOT** include any explanations, headers, or extra formatting.  
    `;
    
    
    
    
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("🔍 AI Raw Response:", data); 
  
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Error: No response from AI.";
    } catch (error) {
      console.error("API Request Failed:", error);
      return "Error generating lesson plan.";
    }
  };
  