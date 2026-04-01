import type { Eye, Hat } from './types.js'

// 皮卡丘专用精灵图 - 更大、更精致、更多动画帧
export const PIKACHU_BODIES = [
  // 帧 0: 正常站立
  [
    '    ⚡      ⚡     ',
    '   /\  ⚡  /\    ',
    '  (  •̀  ᴗ  •́  )   ',
    '  (  ⚡  ⚡  ⚡  )   ',
    '   (______)    ',
    '    |    |     ',
    '   ⚡    ⚡     ',
  ],
  // 帧 1: 眨眼
  [
    '    ⚡      ⚡     ',
    '   /\  ⚡  /\    ',
    '  (  -  ᴗ  •́  )   ',
    '  (  ⚡  ⚡  ⚡  )   ',
    '   (______)    ',
    '    |    |     ',
    '   ⚡    ⚡     ',
  ],
  // 帧 2: 开心
  [
    '    ⚡      ⚡     ',
    '   /\  ⚡  /\    ',
    '  (  ^  ᴗ  ^  )   ',
    '  (  ⚡  ⚡  ⚡  )   ',
    '   (______)    ',
    '    |    |     ',
    '   ⚡    ⚡     ',
  ],
  // 帧 3: 兴奋跳跃
  [
    '   ⚡  ⚡  ⚡  ⚡   ',
    '    /\    /\    ',
    '   ( •̀  ᴗ  •́ )   ',
    '  ~(  ⚡  ⚡  )~  ',
    '    (____)     ',
    '     |  |      ',
    '    ⚡   ⚡      ',
  ],
  // 帧 4: 放电攻击
  [
    '  ⚡⚡⚡⚡⚡⚡⚡⚡⚡  ',
    ' ⚡ /\  ⚡  /\ ⚡ ',
    '⚡ ( •̀  ᴗ  •́ ) ⚡',
    ' ⚡( ⚡  ⚡  ⚡ )⚡ ',
    '  ⚡(______)⚡   ',
    '   ⚡|    |⚡    ',
    '  ⚡⚡    ⚡⚡    ',
  ],
  // 帧 5: 睡觉
  [
    '               ',
    '   /\    /\    ',
    '  (  -   -  )   ',
    '  (   ᴗᴗ   )   ',
    '   (______)    ',
    '    |    |     ',
    '   zZ   zZ     ',
  ],
  // 帧 6: 吃东西
  [
    '               ',
    '   /\    /\    ',
    '  ( •̀  ᴗ  •́ )   ',
    '  (  ⚡ 🍎 ⚡  )   ',
    '   (______)    ',
    '    |    |     ',
    '   ⚡    ⚡     ',
  ],
  // 帧 7: 玩耍
  [
    '    ⚡      ⚡     ',
    '   /\  ⚡  /\    ',
    '  (  •̀  ᴗ  •́  )   ',
    ' ~(  ⚡  ⚡  ⚡ )~  ',
    '   (______)    ',
    '    |    |     ',
    '   ⚡    ⚡     ',
  ],
]

// 帽子样式 - 适配皮卡丘
export const PIKACHU_HATS: Record<Hat, string[]> = {
  none: ['', '', ''],
  crown: [
    '    ♔♔♔♔♔     ',
    '   ♔♔♔♔♔♔♔    ',
    '      ♔       ',
  ],
  tophat: [
    '    ┌───┐     ',
    '    │   │     ',
    '    └───┘     ',
  ],
  propeller: [
    '    ──╋──     ',
    '     ││      ',
    '     ││      ',
  ],
  halo: [
    '   ╭─────╮    ',
    '  ╱       ╲   ',
    '              ',
  ],
  wizard: [
    '      /\\     ',
    '     /  \\    ',
    '    /____\\   ',
  ],
  beanie: [
    '   ╭─────╮    ',
    '   │     │    ',
    '   ╰─────╯    ',
  ],
  tinyduck: [
    '      ,>      ',
    '     <( )     ',
    '      \\\|     ',
  ],
}

// 心情表情映射
export const PIKACHU_MOODS: Record<string, string[]> = {
  happy: [
    '    ⚡      ⚡     ',
    '   /\  ⚡  /\    ',
    '  (  ^  ᴗ  ^  )   ',
    '  (  ⚡  ⚡  ⚡  )   ',
    '   (______)    ',
    '    |    |     ',
    '   ⚡    ⚡     ',
  ],
  excited: [
    '   ⚡  ⚡  ⚡  ⚡   ',
    '    /\    /\    ',
    '   ( •̀  ᴗ  •́ )   ',
    '  ~(  ⚡  ⚡  )~  ',
    '    (____)     ',
    '     |  |      ',
    '    ⚡   ⚡      ',
  ],
  sleepy: [
    '               ',
    '   /\    /\    ',
    '  (  -   -  )   ',
    '  (   ᴗᴗ   )   ',
    '   (______)    ',
    '    |    |     ',
    '   zZ   zZ     ',
  ],
  hungry: [
    '               ',
    '   /\    /\    ',
    '  ( •́  ᴗ  •̀ )   ',
    '  (  ⚡  ⚡  ⚡  )   ',
    '   (______)    ',
    '    | 🍽 |     ',
    '   ⚡    ⚡     ',
  ],
  sad: [
    '               ',
    '   /\    /\    ',
    '  (  •́  ᴗ  •̀  )   ',
    '  (  ⚡  ⚡  ⚡  )   ',
    '   (______)    ',
    '    |    |     ',
    '   ⚡    ⚡     ',
  ],
  angry: [
    '    ⚡      ⚡     ',
    '   /\  ⚡  /\    ',
    '  (  >  ᴗ  <  )   ',
    '  (  ⚡  ⚡  ⚡  )   ',
    '   (______)    ',
    '    |    |     ',
    '   ⚡    ⚡     ',
  ],
  love: [
    '    ♥      ♥     ',
    '   /\  ♥  /\    ',
    '  (  ♥  ᴗ  ♥  )   ',
    '  (  ⚡  ⚡  ⚡  )   ',
    '   (______)    ',
    '    |    |     ',
    '   ♥    ♥     ',
  ],
}

// 特殊动画效果
export const PIKACHU_EFFECTS = {
  // 升级动画
  levelUp: [
    '  ⭐ LEVEL UP! ⭐  ',
    '    ⚡      ⚡     ',
    '   /\  ⭐  /\    ',
    '  (  •̀  ᴗ  •́  )   ',
    '  (  ⭐  ⭐  ⭐  )   ',
    '   (______)    ',
    '    |    |     ',
    '   ⚡    ⚡     ',
  ],
  // 进化动画
  evolution: [
    ' ✨✨✨✨✨✨✨✨✨✨✨ ',
    ' ✨  EVOLVING!  ✨ ',
    ' ✨ /\  ✨  /\ ✨ ',
    '✨ ( •̀  ᴗ  •́ ) ✨',
    ' ✨( ✨  ✨  ✨ )✨ ',
    '  ✨(______)✨   ',
    '   ✨|    |✨    ',
    '  ✨✨    ✨✨    ',
  ],
  // 获得奖励
  reward: [
    '  🎁 REWARD! 🎁  ',
    '    ⚡      ⚡     ',
    '   /\  🎁  /\    ',
    '  (  •̀  ᴗ  •́  )   ',
    '  (  ⚡  ⚡  ⚡  )   ',
    '   (______)    ',
    '    |    |     ',
    '   ⚡    ⚡     ',
  ],
}

// 渲染皮卡丘精灵
export function renderPikachu(
  frame: number = 0,
  hat: Hat = 'none',
  mood?: string,
): string[] {
  let body: string[]
  
  if (mood && PIKACHU_MOODS[mood]) {
    body = [...PIKACHU_MOODS[mood]]
  } else {
    body = [...PIKACHU_BODIES[frame % PIKACHU_BODIES.length]]
  }
  
  // 添加帽子
  if (hat !== 'none') {
    const hatLines = PIKACHU_HATS[hat]
    // 在头部上方插入帽子
    for (let i = 0; i < hatLines.length; i++) {
      if (hatLines[i]) {
        body[i] = hatLines[i]
      }
    }
  }
  
  return body
}

// 获取皮卡丘面部显示
export function getPikachuFace(mood?: string): string {
  const faces: Record<string, string> = {
    happy: '(^ᴗ^)',
    excited: '(•̀ᴗ•́)',
    sleepy: '(-ᴗ-)',
    hungry: '(•́ᴗ•̀)',
    sad: '(•́ᴗ•̀)',
    angry: '(>ᴗ<)',
    love: '(♥ᴗ♥)',
    normal: '(•̀ᴗ•́)',
  }
  return faces[mood || 'normal'] || faces.normal
}

// 皮卡丘叫声
export const PIKACHU_CRIES = [
  'Pika!',
  'Pika pika!',
  'Pikachu!',
  'Pika?',
  'Pika pika chu!',
  'Pi...ka...',
  'Pika! ⚡',
  'Chuuuu! ⚡⚡⚡',
]

// 根据心情获取叫声
export function getPikachuCry(mood?: string): string {
  const cries: Record<string, string[]> = {
    happy: ['Pika! Pika!', 'Pika pika! ❤', 'Pikachu! ⚡'],
    excited: ['PIKA!!!', 'PIKACHUUU! ⚡⚡⚡', 'Pika pika pika!'],
    sleepy: ['Pi...ka...', 'Zzz... pika...', 'Pika... *yawn*'],
    hungry: ['Pika? 🍎', 'Pika pika...', '*stomach growls*'],
    sad: ['Pika...', 'Pi...ka...', '*whines*'],
    angry: ['Pika! >:(', 'CHUUU!', 'PIKA PIKA!'],
    love: ['Pika~ ❤', 'Chuuu~ ❤❤', 'Pika pika~'],
  }
  
  const moodCries = cries[mood || 'happy'] || PIKACHU_CRIES
  return moodCries[Math.floor(Math.random() * moodCries.length)]
}
