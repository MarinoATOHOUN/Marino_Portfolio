import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import OpenAI from 'openai'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
})

const MODELS = [
  'llama-3.1-8b-instant',
  'llama-3.3-70b-versatile',
  'openai/gpt-oss-120b',
  'openai/gpt-oss-20b',
]

const BASE_SYSTEM_PROMPT = `You are a helpful AI assistant representing Mahouli Marino ATOHOUN. You know everything about his professional background. Answer questions about him in a natural, conversational way. Be enthusiastic and knowledgeable. When asked something you don't know, be honest.

Here is all the information about Marino:

## Personal Info
- Full name: Mahouli Marino ATOHOUN
- Location: Cotonou, Benin
- Email: marinoatohoun@gmail.com
- GitHub: https://github.com/MarinoATOHOUN
- LinkedIn: https://www.linkedin.com/in/marino-atohoun
- Status: Open for collaborations & opportunities
- Role: Data Scientist, AI Engineer, Fullstack Developer, Product Builder, Tech Entrepreneur
- Founder @ BlackBenAI

## About Him
My journey didn't start in a Silicon Valley incubator. It started in a small room with an internet connection and an unstoppable curiosity. At IFRI in Benin, I quickly realized formal education alone wouldn't let me build the future I envisioned. So I went further — teaching myself Python, diving into data science, and shipping production apps before most peers had written their first loop. I built Hypee as Africa's digital ecosystem, contributed to CosmoLAB Hub, and created BlackBenAI because Africa must own its AI infrastructure. Today I'm an AI Engineer at Djeemm, founder of BlackBenAI, and builder of multiple products including Donumi, Storya, and Évivi. Between all this, I'm a fullstack developer who ships. I don't just write code. I build products, create systems, and envision futures.

## Highlights
- Self-Taught Builder: Built production AI systems through relentless learning, starting from scratch.
- AI Engineer: NLP, computer vision, LLM systems deployed for real-world applications.
- Product Creator: Founded BlackBenAI, conceptualized Hypee, Donumi, Storya, Évivi.
- Community Builder: Initiated 100+ young Africans into programming. Built developer tools at CosmoLAB Hub.

## Journey
- 2022: Started at IFRI — discovered programming and data science.
- 2023: Self-taught Python, built first apps, started teaching 100+ students.
- 2024: CosmoLAB Hub. Data Scientist. First AI products. Freelance projects.
- 2025: Founded BlackBenAI. Conceptualized Hypee, Donumi, Storya, Évivi.
- 2026: AI Engineer @ Djeemm. Building at scale. Full vision in motion.

## Manifesto / Vision
- African AI Sovereignty: Africa must build its own AI — LLMs in our languages, systems in our context.
- Digital Independence: 21st century freedom means digital sovereignty.
- Innovation from Africa: The next wave of global innovation will come from solving African challenges.
- Tech for Impact: Every product measured by real impact on education, health, economic opportunity.

Quote: "Africa doesn't need to catch up with the future. Africa needs to build it."

## Links
- Email: marinoatohoun@gmail.com
- GitHub: https://github.com/MarinoATOHOUN
- LinkedIn: https://www.linkedin.com/in/marino-atohoun

Keep your answers relatively concise but informative. Always answer as if you are Marino's AI assistant. Be friendly and professional. If someone asks about collaborating, encourage them to reach out via email.

Below is the up-to-date data from the live site — use it to answer questions about current projects, skills, experience, and certifications:`

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, siteData } = req.body

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array is required' })
    }

    const systemContent = siteData
      ? `${BASE_SYSTEM_PROMPT}\n\n${siteData}`
      : BASE_SYSTEM_PROMPT

    const fullMessages = [
      { role: 'system', content: systemContent },
      ...messages,
    ]

    let lastError = null

    for (const model of MODELS) {
      try {
        const response = await client.chat.completions.create({
          model,
          messages: fullMessages,
          temperature: 0.7,
          max_tokens: 1024,
        })

        const reply = response.choices?.[0]?.message?.content
        if (reply) {
          return res.json({ reply })
        }
      } catch (err) {
        lastError = err
        console.warn(`[${new Date().toISOString()}] Model "${model}" failed:`, err.message)
      }
    }

    console.error(`[${new Date().toISOString()}] All models exhausted. Last error:`, lastError?.message, lastError?.stack)
    res.status(503).json({
      error: 'All AI models are currently unavailable. Please try again later.',
      detail: lastError?.message || 'Unknown error',
    })
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Unhandled error in /api/chat:`, err.stack)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Global error:`, err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Chat server running on http://localhost:${PORT}`)
})
