import { fileManager, genAI } from '@/libs/gen-ai'

interface ExtractDataFromImageResponse {
  measureValue: number
}

export async function extractDataFromImage(
  filePath: string,
): Promise<ExtractDataFromImageResponse> {
  const geminiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

  const { file } = await fileManager.uploadFile(filePath, {
    mimeType: 'image/jpeg',
    displayName: filePath,
  })

  const result = await geminiModel.generateContent([
    {
      fileData: {
        mimeType: file.mimeType,
        fileUri: file.uri,
      },
    },
    {
      text: `
        Analise esta fatura de consumo de água ou gás e identifique o metro cúbico total consumido no mês.
        Normalmente este número é apresentado como CONSUMO, FATURADO, LEITURA ou expressões similares.
        Não confunda este número com o valor de pagamento da fatura.
        Retorne uma mensagem contendo apenas o número do consumo, exemplo: XX
      `,
    },
  ])

  const measureValue = Number(result.response.text()) ?? 0

  return { measureValue }
}
