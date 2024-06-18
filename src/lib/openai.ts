import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY!;

if (!apiKey) {
  throw new Error(
    "Missing OpenAI API key. Make sure OPEN_API_KEY environment variable is set."
  );
}

export const openai = new OpenAI({
  apiKey,
});
