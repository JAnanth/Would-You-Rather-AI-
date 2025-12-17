import type { Category, Question, QuestionOption } from "../types";

const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

interface AIResponse {
  optionA: QuestionOption;
  optionB: QuestionOption;
}

const getCategoryPrompt = (category: Category): string => {
  const categoryDescriptions: Record<Category, string> = {
    career: "related to work, professional life, and career choices",
    relationships: "related to personal relationships, friendships, and romantic life",
    superpowers: "related to hypothetical superpowers and abilities",
    money: "related to financial decisions and wealth",
    ethics: "related to moral dilemmas and ethical choices",
    lifestyle: "related to daily life, habits, and lifestyle choices",
    random: "from any category - be creative and surprising",
  };

  return categoryDescriptions[category];
};

const createPrompt = (category: Category): string => {
  return `Generate a thought-provoking "Would You Rather?" question ${getCategoryPrompt(category)}.

Requirements:
- Create two options that both have significant tradeoffs
- Neither option should be obviously better
- Options should have real-world implications
- Make it memorable and conversation-worthy
- Avoid silly or trivial choices
- Each option should be a complete scenario (1-2 sentences max)
- Consequences should be detailed but concise (2-3 sentences)

Format your response as JSON:
{
  "optionA": {
    "text": "Brief description of option A",
    "consequences": "2-3 sentences explaining the real implications, tradeoffs, and what life would be like with this choice"
  },
  "optionB": {
    "text": "Brief description of option B",
    "consequences": "2-3 sentences explaining the real implications, tradeoffs, and what life would be like with this choice"
  }
}

IMPORTANT: Return ONLY the JSON object, no additional text or explanation.`;
};

export const generateQuestion = async (category: Category): Promise<Question> => {
  if (!ANTHROPIC_API_KEY) {
    throw new Error("Anthropic API key is not configured. Please set VITE_ANTHROPIC_API_KEY in your .env file.");
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: createPrompt(category),
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}. ${
          errorData.error?.message || ""
        }`
      );
    }

    const data = await response.json();
    const content = data.content[0].text;

    // Parse the JSON response
    const aiResponse: AIResponse = JSON.parse(content);

    // Generate initial vote counts (randomized but realistic)
    const totalVotes = Math.floor(Math.random() * 1000) + 100;
    const votesA = Math.floor(Math.random() * totalVotes);
    const votesB = totalVotes - votesA;

    // Create the question object
    const question: Question = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      category,
      optionA: aiResponse.optionA,
      optionB: aiResponse.optionB,
      votesA,
      votesB,
      timestamp: Date.now(),
    };

    return question;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate question: ${error.message}`);
    }
    throw new Error("Failed to generate question: Unknown error");
  }
};

// Pre-generate multiple questions for better UX
export const generateMultipleQuestions = async (
  category: Category,
  count: number = 3
): Promise<Question[]> => {
  const promises = Array.from({ length: count }, () => generateQuestion(category));

  try {
    return await Promise.all(promises);
  } catch (error) {
    console.error("Error generating multiple questions:", error);
    // If some fail, return whatever succeeded
    const results = await Promise.allSettled(promises);
    return results
      .filter((result): result is PromiseFulfilledResult<Question> => result.status === "fulfilled")
      .map((result) => result.value);
  }
};
