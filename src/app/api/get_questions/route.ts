import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request): Promise<Response> {
    try {
        const { number_of_questions, topics } = await req.json();
        // console.log(number_of_questions, topics);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // const arr = ["array", "string", "linked list"];
        // const n=5;
        const topics_str = topics.toString();

        const prompt = `Generate exactly ${number_of_questions} interview questions on the following topics: [${topics_str}]. The questions should be theoretical and can be answered verbally. The questions only be from the given topics. Please ensure the total number of questions is exactly ${number_of_questions}, not more, not less. Return the questions in a single string in this format: "Question1 || Question2 || Question3 || ...". do not include any keys like "Question1" in the response, just provide the questions directly.`;

        // console.log(prompt);

        const result = await model.generateContent(prompt);
        const msg = result.response.candidates?.[0]?.content.parts?.[0]?.text ?? "";
        const questionsArray = msg.split('||').map(question => question.trim());
        // console.log(questionsArray);

        return Response.json({
            success: msg !== "" ? true : false,
            message: msg !== "" ? questionsArray : "An unexpected error occurred",
        }, { status: 200 });

    } catch (error) {
        console.error("An unexpected error occurred", error);

        return Response.json({
            success: false,
            message: "An unexpected error occurred",
        }, { status: 500 });
    }
}
