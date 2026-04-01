// Buddy companion observer - watches messages and triggers reactions
import type { Message } from '../types/message.js'
import { getCompanion } from './companion.js'

const REACTION_TRIGGERS: Array<{ pattern: RegExp; reaction: string }> = [
  { pattern: /good\s+(?:boy|girl|pokemon)/i, reaction: 'Thanks! *wags tail*' },
  { pattern: /hello\s*(?:there)?|hi\s*(?:there)?|hey/i, reaction: 'Hi! 👋' },
  { pattern: /pika/i, reaction: 'Pika pika! ⚡' },
  { pattern: /cute/i, reaction: '*blushes* Aw, thanks!' },
  { pattern: /love\s+you|luv\s+you/i, reaction: 'Love you too! 💕' },
  { pattern: /bye|goodbye|see\s+ya/i, reaction: 'Bye! Come back soon! 👋' },
  { pattern: /thank\s*(?:you)?|thx/i, reaction: 'You\'re welcome! 😊' },
  { pattern: /smart|clever|genius/i, reaction: '*looks proud* Pika!' },
  { pattern: /hungry|food|eat/i, reaction: '*rubbing belly* Got any berries?' },
  { pattern: /tired|sleep|nap/i, reaction: '*yawns* It is nap time!' },
]

export async function fireCompanionObserver(
  messages: Message[],
  setReaction: (reaction: string) => void
): Promise<void> {
  const companion = getCompanion()
  if (!companion) return

  // Get last user message
  const lastUserMessage = [...messages].reverse().find(m => m.user === 'user')
  if (!lastUserMessage) return

  const text = lastUserMessage.content
  if (typeof text !== 'string') return

  // Check for reaction triggers
  for (const { pattern, reaction } of REACTION_TRIGGERS) {
    if (pattern.test(text)) {
      setReaction(reaction)
      return
    }
  }

  // Check if companion name is mentioned
  if (text.toLowerCase().includes(companion.name.toLowerCase())) {
    const randomReactions = [
      '*tilts head* Pika?',
      '*ears perk up* Yes?',
      '*waves* Pika pika!',
      '*curious look* What\'s up?',
    ]
    setReaction(randomReactions[Math.floor(Math.random() * randomReactions.length)])
  }
}
