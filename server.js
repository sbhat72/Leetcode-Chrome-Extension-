import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.API_KEY
});  

const app = express();

app.use(cors());  // Allow all origins by default
app.use(express.json());  // Parse JSON body

app.post("/leetcode", async (req, res) => {
    const prompt = req.body;  // should be { problem: "..." }
    console.log(prompt);

    try {
        const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `How to solve ${prompt.problem}`,
    });
    
    console.log(response.text);

    res.json({ reply: response.text });
    } catch (error) {
        console.error("Error from Gemini", error);
        res.status(500).json({ error: "Something went wrong with Gemini API" });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
