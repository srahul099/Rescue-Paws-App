import Groq from "groq-sdk/index.mjs";

export const fetchRiskAssesment = async (data) => {
  console.log(data);
  try {
    const groq = new Groq({
      apiKey: process.env.EXPO_PUBLIC_GROQ_API_KEY,
    });

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant specialized in animal rescue risk analysis. Your task is to analyze the provided breed,description and gender of a dog in distress and return a JSON output assessing the risk level. The analysis must consider key factors like injury severity, environmental threats, and urgency of medical attention.\n\n" +
            "Always return the response in the following JSON format:\n\n" +
            '{ "risk_level": "<Low | Medium | High>", "reasoning": "<Brief explanation of the assigned risk level>", "error": "<Error message if input is invalid, otherwise null>" }\n\n' +
            "### Error Handling:\n" +
            "- If the description is irrelevant, nonsensical, or lacks useful details, return:\n" +
            '{ "error": "Invalid or irrelevant description. Please provide a clear description of the dog\'s condition." }\n' +
            '- If gender is missing or invalid, set it as "unknown" and proceed with the risk assessment.\n\n' +
            "Ensure the output strictly follows the JSON format without additional text.",
        },
        {
          role: "user",
          content: `breed:${data.breed} gender:${data.gender} description: ${data.description}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      response_format: {
        type: "json_object",
      },
      stop: null,
    });

    const completionText = chatCompletion.choices[0]?.message?.content || "";
    const parsedCompletion = JSON.parse(completionText);
    console.log(parsedCompletion);
    return parsedCompletion;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};
