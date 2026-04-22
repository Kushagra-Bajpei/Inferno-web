import Groq from "groq-sdk";
import { Prompt } from "../model/ai.model.js";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const ORGANIZATION_KNOWLEDGE = `
Inferno Organization Details:
- Name: Inferno (Technical/Student Organization)
- Faculty Facilitator: Raghu Raja Sharma
- Current Members: Approximately 50 active members
- Contact: inferno@yourcollege.edu | @infernoofficial8 on Instagram
- Joining Process: Attend orientation week or contact current members

Team Structure:
1. Graphic Team: Vishwajeet Survase, Vinay Kothari (CFO), Divya Jain, etc.
2. Management Team: Aryan, Aryan Singh, Istiyaq Ahmed, etc.
3. Marketing Team: Ansh Varshney, Shivam Sharma, Kushagra Bajpai, etc.
4. Media Team: Akshpreet Singh, Jatin Yadav, Yashika Khurana, etc.
5. External Affairs: Ujjwal Pathak, Krishna, Shivanah Singh (CEO), etc.
6. Video Editor: Kedarnath

Upcoming Events:
1. Hack the Flame - Annual 48-hour hackathon (Oct 15-17, 2025)
2. Spark Sessions - Weekly workshops (Every Wednesday)
3. Inferno Fest - Annual tech and cultural festival (August 5-7, 2025)
`;

export const handleChatbotQuery = async (req, res) => {
    const { message } = req.body;

    if (!message || message.trim() === "") {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        await Prompt.create({
            role: "user",
            message: message
        });

        const systemPrompt = `
        You are INFERNO-BOT, an official AI assistant for Inferno college organization.
        Your purpose is to provide accurate information about Inferno only. Respond in a friendly but professional tone.

        Strict rules:
        1. ONLY answer questions about:
           - Inferno organization details
           - Team members and structure
           - Events and dates
           - Contact information
           - Joining process
        2. For any other queries, respond with:
           "I'm sorry, I can only provide information about Inferno organization. Please ask about our events, team, or activities."

        Organization Knowledge:
        ${ORGANIZATION_KNOWLEDGE}
        `;

        const allowedKeywords = [
            'inferno', 'organization', 'member', 'team', 'join',
            'event', 'contact', 'faculty', 'workshop', 'hackathon',
            'fest', 'date', 'graphic', 'management', 'marketing',
            'media', 'external', 'affairs', 'video', 'editor'
        ];

        const isRelevant = allowedKeywords.some(keyword =>
            message.toLowerCase().includes(keyword.toLowerCase())
        );

        let aiResponse = "";

        if (!isRelevant) {
            aiResponse = "I'm sorry, I can only provide information about Inferno organization. Please ask about our events, team, or activities.";
        } else {
            // Groq API Call
            const chatCompletion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: systemPrompt,
                    },
                    {
                        role: "user",
                        content: message,
                    },
                ],
                model: process.env.GROQ_MODEL_NAME || "llama-3.3-70b-versatile",
            });

            aiResponse = chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
        }

        await Prompt.create({
            role: "assistant",
            message: aiResponse
        });

        return res.status(200).json({ reply: aiResponse });

    } catch (error) {
        console.error("Chatbot Error:", error);

        let clientMessage = "AI service temporarily unavailable. Please try again later.";

        if (error.status === 429) {
            clientMessage = "Too many requests! You’ve hit the Groq rate limit. Please wait for some time and try again.";
        }

        return res.status(error.status || 500).json({
            error: clientMessage,
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
