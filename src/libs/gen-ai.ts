import { GoogleGenerativeAI } from '@google/generative-ai'
import { GoogleAIFileManager } from '@google/generative-ai/server'

import { env } from '@/env'

type GeminiModel = 'gemini-1.5-pro' | 'gemini-1.5-flash'

export const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY)
export const fileManager = new GoogleAIFileManager(env.GEMINI_API_KEY)
export const geminiModel: GeminiModel = 'gemini-1.5-pro'
