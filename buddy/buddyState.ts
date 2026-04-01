import { getGlobalConfig, saveGlobalConfig } from '../utils/config.js'

// 伙伴状态接口
export interface BuddyState {
  // 基础属性
  name: string
  species: string
  level: number
  exp: number
  expToNext: number
  
  // 状态值 (0-100)
  happiness: number  // 快乐度
  hunger: number     // 饥饿度 (0=饱, 100=饿)
  energy: number     // 精力
  health: number     // 健康
  
  // 亲密度
  affection: number  // 与主人的亲密度
  
  // 心情
  mood: 'happy' | 'excited' | 'sleepy' | 'hungry' | 'sad' | 'angry' | 'love' | 'normal'
  
  // 统计
  stats: {
    petCount: number      // 被抚摸次数
    feedCount: number     // 被喂食次数
    playCount: number     // 玩耍次数
    totalInteractions: number  // 总互动次数
    lastInteraction: number    // 最后互动时间戳
    birthDate: number          // 出生日期
  }
  
  // 装备
  hat: string
  accessory?: string
  
  // 技能
  skills: string[]
  
  // 是否正在睡觉
  isSleeping: boolean
  
  // 个性
  personality: string
}

// 默认状态
export const DEFAULT_BUDDY_STATE: BuddyState = {
  name: 'Pikachu',
  species: 'Pikachu',
  level: 1,
  exp: 0,
  expToNext: 100,
  happiness: 50,
  hunger: 30,
  energy: 80,
  health: 100,
  affection: 10,
  mood: 'normal',
  stats: {
    petCount: 0,
    feedCount: 0,
    playCount: 0,
    totalInteractions: 0,
    lastInteraction: Date.now(),
    birthDate: Date.now(),
  },
  hat: 'none',
  accessory: undefined,
  skills: [],
  isSleeping: false,
  personality: 'A loyal Pokemon companion.',
}

// 获取伙伴状态
export function getBuddyState(): BuddyState | undefined {
  const config = getGlobalConfig() as any
  return config.buddyState
}

// 保存伙伴状态
export function saveBuddyState(state: BuddyState): void {
  saveGlobalConfig((config) => ({
    ...config,
    buddyState: state,
  }))
}

// 初始化新伙伴
export function initBuddyState(name?: string, species?: string): BuddyState {
  const state: BuddyState = {
    ...DEFAULT_BUDDY_STATE,
    name: name || 'Pikachu',
    species: species || 'Pikachu',
    stats: {
      ...DEFAULT_BUDDY_STATE.stats,
      birthDate: Date.now(),
      lastInteraction: Date.now(),
    },
  }
  saveBuddyState(state)
  return state
}

// 更新状态值
export function updateBuddyState(updates: Partial<BuddyState>): BuddyState | undefined {
  const current = getBuddyState()
  if (!current) return undefined
  
  const newState = { ...current, ...updates }
  saveBuddyState(newState)
  return newState
}

// 增加经验值
export function addExp(amount: number): BuddyState | undefined {
  const state = getBuddyState()
  if (!state) return undefined
  
  let { exp, expToNext, level } = state
  exp += amount
  
  // 检查升级
  while (exp >= expToNext) {
    exp -= expToNext
    level++
    expToNext = Math.floor(expToNext * 1.5)  // 每级所需经验增加
  }
  
  const newState = { ...state, exp, expToNext, level }
  saveBuddyState(newState)
  return newState
}

// 抚摸
export function petBuddy(): BuddyState | undefined {
  const state = getBuddyState()
  if (!state) return undefined
  
  const newState: BuddyState = {
    ...state,
    happiness: Math.min(100, state.happiness + 5),
    affection: Math.min(100, state.affection + 2),
    mood: 'happy',
    stats: {
      ...state.stats,
      petCount: state.stats.petCount + 1,
      totalInteractions: state.stats.totalInteractions + 1,
      lastInteraction: Date.now(),
    },
  }
  
  saveBuddyState(newState)
  return newState
}

// 喂食
export function feedBuddy(foodValue: number = 30): BuddyState | undefined {
  const state = getBuddyState()
  if (!state) return undefined
  
  const newState: BuddyState = {
    ...state,
    hunger: Math.max(0, state.hunger - foodValue),
    happiness: Math.min(100, state.happiness + 3),
    energy: Math.min(100, state.energy + 10),
    mood: state.hunger > 50 ? 'happy' : 'normal',
    stats: {
      ...state.stats,
      feedCount: state.stats.feedCount + 1,
      totalInteractions: state.stats.totalInteractions + 1,
      lastInteraction: Date.now(),
    },
  }
  
  saveBuddyState(newState)
  return newState
}

// 玩耍
export function playWithBuddy(): BuddyState | undefined {
  const state = getBuddyState()
  if (!state) return undefined
  
  const newState: BuddyState = {
    ...state,
    happiness: Math.min(100, state.happiness + 10),
    energy: Math.max(0, state.energy - 15),
    hunger: Math.min(100, state.hunger + 10),
    affection: Math.min(100, state.affection + 3),
    mood: 'excited',
    stats: {
      ...state.stats,
      playCount: state.stats.playCount + 1,
      totalInteractions: state.stats.totalInteractions + 1,
      lastInteraction: Date.now(),
    },
  }
  
  // 玩耍获得经验
  addExp(10)
  
  saveBuddyState(newState)
  return newState
}

// 睡觉
export function sleepBuddy(): BuddyState | undefined {
  const state = getBuddyState()
  if (!state) return undefined
  
  const newState: BuddyState = {
    ...state,
    isSleeping: true,
    energy: 100,
    health: Math.min(100, state.health + 10),
    mood: 'sleepy',
    stats: {
      ...state.stats,
      totalInteractions: state.stats.totalInteractions + 1,
      lastInteraction: Date.now(),
    },
  }
  
  saveBuddyState(newState)
  return newState
}

// 唤醒
export function wakeBuddy(): BuddyState | undefined {
  const state = getBuddyState()
  if (!state) return undefined
  
  const newState: BuddyState = {
    ...state,
    isSleeping: false,
    mood: 'happy',
    stats: {
      ...state.stats,
      totalInteractions: state.stats.totalInteractions + 1,
      lastInteraction: Date.now(),
    },
  }
  
  saveBuddyState(newState)
  return newState
}

// 时间流逝更新（随时间降低状态）
export function tickBuddyState(): BuddyState | undefined {
  const state = getBuddyState()
  if (!state) return undefined
  
  const now = Date.now()
  const hoursSinceLastInteraction = (now - state.stats.lastInteraction) / (1000 * 60 * 60)
  
  // 每小时降低的状态值
  const hungerIncrease = Math.floor(hoursSinceLastInteraction * 5)
  const energyDecrease = Math.floor(hoursSinceLastInteraction * 3)
  const happinessDecrease = Math.floor(hoursSinceLastInteraction * 2)
  
  let newMood = state.mood
  
  // 根据状态自动调整心情
  if (state.hunger + hungerIncrease > 70) {
    newMood = 'hungry'
  } else if (state.energy - energyDecrease < 20) {
    newMood = 'sleepy'
  } else if (state.happiness - happinessDecrease < 30) {
    newMood = 'sad'
  }
  
  const newState: BuddyState = {
    ...state,
    hunger: Math.min(100, state.hunger + hungerIncrease),
    energy: Math.max(0, state.energy - energyDecrease),
    happiness: Math.max(0, state.happiness - happinessDecrease),
    mood: newMood,
  }
  
  saveBuddyState(newState)
  return newState
}

// 获取状态描述
export function getStatusDescription(state: BuddyState): string {
  const descriptions: string[] = []
  
  if (state.isSleeping) {
    return `${state.name} 正在睡觉... zZz`
  }
  
  if (state.hunger > 70) {
    descriptions.push('很饿')
  } else if (state.hunger > 40) {
    descriptions.push('有点饿')
  }
  
  if (state.energy < 20) {
    descriptions.push('很累')
  } else if (state.energy < 50) {
    descriptions.push('有点累')
  }
  
  if (state.happiness > 80) {
    descriptions.push('非常开心')
  } else if (state.happiness > 50) {
    descriptions.push('心情不错')
  } else if (state.happiness < 30) {
    descriptions.push('不开心')
  }
  
  if (descriptions.length === 0) {
    descriptions.push('状态正常')
  }
  
  return `${state.name} ${descriptions.join('，')}`
}

// 获取等级称号
export function getLevelTitle(level: number): string {
  if (level >= 50) return '传说级训练师'
  if (level >= 40) return '大师级训练师'
  if (level >= 30) return '精英训练师'
  if (level >= 20) return '高级训练师'
  if (level >= 10) return '中级训练师'
  if (level >= 5) return '初级训练师'
  return '新手训练师'
}

// 获取亲密度等级
export function getAffectionLevel(affection: number): { level: number; title: string } {
  if (affection >= 90) return { level: 5, title: '灵魂伴侣' }
  if (affection >= 70) return { level: 4, title: '最佳伙伴' }
  if (affection >= 50) return { level: 3, title: '好朋友' }
  if (affection >= 30) return { level: 2, title: '熟人' }
  if (affection >= 10) return { level: 1, title: '新朋友' }
  return { level: 0, title: '陌生人' }
}
