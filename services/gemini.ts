import { GoogleGenAI, Type } from "@google/genai";
import { MicroCourse } from "../types";

// Get API key from environment variables
const getApiKey = (): string => {
  const apiKey = import.meta.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "❌ Gemini API Key 未设置！\n\n" +
      "请按照以下步骤配置：\n" +
      "1. 复制 .env.example 为 .env.local\n" +
      "2. 在 .env.local 中设置: GEMINI_API_KEY=你的密钥\n" +
      "3. 重启开发服务器\n\n" +
      "获取 API Key: https://aistudio.google.com/apikey"
    );
  }

  return apiKey;
};

const generateMicroCourse = async (topic: string): Promise<MicroCourse> => {
  const apiKey = getApiKey();

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    创建一个关于主题 "${topic}" 的“微型课程”。
    目标受众是中文初学者。
    
    你需要生成 JSON 数据，包含：
    1. 3张知识卡片 (cards)，每张卡片包含：
       - title: 卡片标题 (中文，简短有力，不超过10个字)
       - emoji: 一个相关的Emoji
       - content: 核心知识点解释 (中文，50-80字，通俗易懂，富有洞察力)
       - keyword: 一个具体的英文视觉关键词 (visual keyword)，用于搜索高质量的极简主义摄影背景图 (例如 "abstract architecture", "minimalist landscape", "technology details")。确保不要使用抽象概念词。
    
    2. 1个互动测验 (quiz)，包含：
       - question: 针对上述内容的一个选择题 (中文)
       - options: 4个选项 (中文)
       - correctIndex: 正确选项的索引 (0-3)
       - explanation: 答案解析 (中文，一句话解释为什么选这个)
       
    请确保语言生动有趣，富有教育意义，严格使用中文。
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          topic: { type: Type.STRING },
          cards: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                emoji: { type: Type.STRING },
                content: { type: Type.STRING },
                keyword: { type: Type.STRING }
              },
              required: ["title", "emoji", "content", "keyword"]
            }
          },
          quiz: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING }
            },
            required: ["question", "options", "correctIndex", "explanation"]
          }
        },
        required: ["topic", "cards", "quiz"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response from AI");
  }

  try {
    return JSON.parse(text) as MicroCourse;
  } catch (e) {
    console.error("Failed to parse JSON", e);
    throw new Error("Failed to parse course data");
  }
};

const generateMindMapImage = async (topic: string): Promise<string> => {
  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey });

  // Use Gemini 3 Pro Image for high quality generation
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: `Design a clean, professional, and colorful mind map infographic summarizing the topic: "${topic}". 
               Visual style: Modern vector illustration, high resolution, white background, organized structure with icons and nodes. 
               Make it visually appealing for a learning summary.
               Important: The overall aesthetic should be suitable for a Chinese audience, modern and minimalist.`,
    config: {
      responseModalities: ["IMAGE"], // 明确指定返回图像
      imageConfig: {
        aspectRatio: "3:4", // 竖屏比例，适配卡片布局
        imageSize: "1K"     // 1K 分辨率
      }
    },
  });

  // 从响应中提取图像数据
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      const base64EncodeString = part.inlineData.data;
      return `data:image/png;base64,${base64EncodeString}`;
    }
  }

  throw new Error("No image generated");
};

export { generateMicroCourse, generateMindMapImage };