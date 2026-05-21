import { GoogleGenAI } from "@google/genai";

const responseSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        totalWeeks: { type: "number" },
        weeks: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    weekNumber: { type: "number" },
                    title: { type: "string" },
                    topics: { type: "array", items: { type: "string" } },
                    project: { type: "string" },
                    resources: { type: "array", items: { type: "string" } },
                },
            },
        },
        technologies: { type: "array", items: { type: "string" } },
        interviewTopics: { type: "array", items: { type: "string" } },
        projectIdeas: { type: "array", items: { type: "string" } },
    },
};

export async function generateRoadmap({ targetRole, currentLevel, dailyHours }) {
    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `
        You are an expert career coach.
        Generate a detailed learning roadmap for:
        - Target Role: ${targetRole}
        - Current Level: ${currentLevel}
        - Daily Study Hours: ${dailyHours}
        Week-by-week plan, each week has topics, a mini project, and free resources.
        Also list technologies, interview topics, and 5 project ideas.
    `;

    const result = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema,
        },
    });

    // line ~48, replace your JSON.parse with this:
    const raw = result.text; // or however you get the text

    const cleaned = raw
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const parsed = JSON.parse(cleaned);
    return parsed;
}