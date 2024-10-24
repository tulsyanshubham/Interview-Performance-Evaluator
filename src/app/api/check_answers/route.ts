import { GoogleGenerativeAI } from "@google/generative-ai";

// Define the structure of the request body data
interface QAData {
    question: string;
    answer_by_user: string;
}

interface EvaluatedResponse {
    question: string;
    answer_by_user: string;
    correct_answer: string;
    score: number;
}

export async function POST(req: Request): Promise<Response> {
    try {
        // Parse the incoming request JSON data
        const { data }: { data: QAData[] } = await req.json();

        // Map the data into a format suitable for the prompt
        const questionsAndAnswers = data.map(item => `{
            "question": "${item.question}",
            "answer_by_user": "${item.answer_by_user}"
        }`).join(", ");

        // Prepare the prompt
        const prompt = `I have a list of questions and answers provided by a user. I want you to evaluate each answer, provide the correct answer, and give a score out of 10. The response should be formatted in a single string for each question like this: "correct_answer1 ~~ Score1 || correct_answer2 ~~ Score2 || ...".
        no need to include the keys like "correct_answer" or "score" in the response, just drictly provide the correct answer and score.
        Please evaluate the following data:
        [${questionsAndAnswers}]
        Make sure the response is in the requested string format.`;

        // Access the generative AI model
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Send the prompt to the AI model
        const result = await model.generateContent(prompt);
        const msg = result.response.candidates?.[0]?.content.parts?.[0]?.text ?? "";

        // Split the AI's response based on the "||" delimiter
        const responseArray = msg.split("||").map(item => item.trim());

        // Parse the response into an array of evaluated results
        const evaluatedData: EvaluatedResponse[] = responseArray.map((item, index) => {
            const [correctAnswer, score] = item.split("~~").map(part => part.trim());
            return {
                question: data[index].question,
                answer_by_user: data[index].answer_by_user,
                correct_answer: correctAnswer,
                score: parseFloat(score) // Convert score to a number
            };
        });

        // Return the response in JSON format
        return new Response(JSON.stringify({
            success: true,
            message: evaluatedData
        }), { status: 200 });

    } catch (error) {
        console.error("An unexpected error occurred:", error);

        // Return an error response
        return new Response(JSON.stringify({
            success: false,
            message: "An unexpected error occurred."
        }), { status: 500 });
    }
}
