import OpenAI from "openai";

export const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1", //  Вказуємо шлях до серверів OpenRouter
  apiKey: process.env.OPENROUTER_API_KEY || "<OPENROUTER_API_KEY>", //   ключ
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // Обов'язково для рейтингу OpenRouter (можна будь-який URL)
    "X-Title": "UIUX Mockup Generator",      // Назва додатку
  }
});