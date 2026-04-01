import { Box, Text, useInput } from 'ink';
import React, { useEffect, useState } from 'react';
import { getCompanion } from '../../buddy/companion.js';
import type { LocalJSXCommandCall } from '../../types/command.js';
import { useSetAppState } from '../../state/AppState.js';
import figures from 'figures';
import { getBuddyState, saveBuddyState, initBuddyState, type BuddyState } from '../../buddy/buddyState.js';

// 皮卡丘 ASCII 艺术 - 多帧动画
const PIKACHU_FRAMES = [
  // 帧 0: 正常
  `
    ⚡      ⚡
   /\\  ⚡  /\\
  (  •̀  ᴗ  •́  )
  (  ⚡  ⚡  ⚡  )
   (______)
    |    |
   ⚡    ⚡
  `,
  // 帧 1: 眨眼
  `
    ⚡      ⚡
   /\\  ⚡  /\\
  (  -  ᴗ  •́  )
  (  ⚡  ⚡  ⚡  )
   (______)
    |    |
   ⚡    ⚡
  `,
  // 帧 2: 开心
  `
    ⚡      ⚡
   /\\  ⚡  /\\
  (  ^  ᴗ  ^  )
  (  ⚡  ⚡  ⚡  )
   (______)
    |    |
   ⚡    ⚡
  `,
  // 帧 3: 兴奋
  `
   ⚡  ⚡  ⚡  ⚡
    /\\    /\\
   ( •̀  ᴗ  •́ )
  ~(  ⚡  ⚡  )~
    (____)
     |  |
    ⚡   ⚡
  `,
  // 帧 4: 放电
  `
  ⚡⚡⚡⚡⚡⚡⚡⚡⚡
 ⚡ /\\  ⚡  /\\ ⚡
⚡ ( •̀  ᴗ  •́ ) ⚡
 ⚡( ⚡  ⚡  ⚡ )⚡
  ⚡(______)⚡
   ⚡|    |⚡
  ⚡⚡    ⚡⚡
  `,
];

// 精灵球 ASCII 艺术
const POKEBALL_ASCII = `
      .-----.
    .'   O   '.
   /   O   O   \\
  |      .      |
  |             |
   \\           /
    '.       .'
      '-----'
`;

// 食物选项
const FOODS = [
  { name: '宝可梦饲料', value: 20, emoji: '🍖' },
  { name: '树果', value: 30, emoji: '🍒' },
  { name: '皮卡丘饼干', value: 40, emoji: '🍪' },
  { name: '能量饮料', value: 50, emoji: '⚡' },
  { name: '大师蛋糕', value: 80, emoji: '🎂' },
];

// 孵化流程
const HatchingFlow = ({ onDone }: { onDone: () => void }) => {
  const [step, setStep] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(dotInterval);
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 2000),
      setTimeout(() => setStep(2), 4000),
      setTimeout(() => setStep(3), 6000),
      setTimeout(() => setStep(4), 8000),
      setTimeout(() => {
        initBuddyState('Pikachu', 'Pikachu');
        setStep(5);
      }, 10000),
      setTimeout(onDone, 14000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Box flexDirection="column" alignItems="center">
            <Text color="red" bold>{POKEBALL_ASCII}</Text>
            <Text color="white">一个神秘的精灵球出现了{dots}</Text>
          </Box>
        );
      case 1:
        return (
          <Box flexDirection="column" alignItems="center">
            <Text color="red" bold>{POKEBALL_ASCII}</Text>
            <Text color="yellow" bold>摇晃{dots} 摇晃{dots}</Text>
          </Box>
        );
      case 2:
        return (
          <Box flexDirection="column" alignItems="center">
            <Text color="red" bold>{POKEBALL_ASCII}</Text>
            <Text color="yellow" bold italic>⚡ 有反应了！ ⚡</Text>
          </Box>
        );
      case 3:
        return (
          <Box flexDirection="column" alignItems="center">
            <Text color="red" bold>{POKEBALL_ASCII}</Text>
            <Text color="yellow" bold>光芒四射！</Text>
          </Box>
        );
      case 4:
        return (
          <Box flexDirection="column" alignItems="center">
            <Text color="yellow" bold>{PIKACHU_FRAMES[0]}</Text>
            <Text color="green" bold>🎉 成功了！ 🎉</Text>
            <Text color="white">你获得了一只皮卡丘！</Text>
            <Text color="cyan" italic>Pika! Pika!</Text>
          </Box>
        );
      case 5:
        return (
          <Box flexDirection="column" alignItems="center">
            <Text color="green" bold>✨ 欢迎你的新伙伴！ ✨</Text>
            <Text color="white">输入 /buddy 查看你的皮卡丘</Text>
            <Text color="dim">提示: 试试 /buddy pet 抚摸它！</Text>
          </Box>
        );
    }
  };

  return (
    <Box flexDirection="column" padding={1} alignItems="center">
      {renderStep()}
    </Box>
  );
};

// 抚摸动画
const PetAnimation = ({ onDone }: { onDone: () => void }) => {
  const [frame, setFrame] = useState(0);
  const setAppState = useSetAppState();
  const buddy = getBuddyState();

  useEffect(() => {
    setAppState(prev => ({
      ...prev,
      companionPetAt: Date.now(),
    }));

    // 更新状态
    if (buddy) {
      buddy.happiness = Math.min(100, buddy.happiness + 5);
      buddy.affection = Math.min(100, buddy.affection + 2);
      buddy.mood = 'happy';
      buddy.stats.petCount++;
      buddy.stats.totalInteractions++;
      buddy.stats.lastInteraction = Date.now();
      saveBuddyState(buddy);
    }

    const timers = [
      setTimeout(() => setFrame(1), 400),
      setTimeout(() => setFrame(2), 800),
      setTimeout(() => setFrame(3), 1200),
      setTimeout(() => setFrame(4), 1600),
      setTimeout(onDone, 2500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const cries = ['Pika!', 'Pika Pika!', '⚡ Pikachu! ⚡', 'Chuuu~ ❤', '*开心*'];

  return (
    <Box flexDirection="column" padding={1} alignItems="center">
      <Text color="yellow" bold>{PIKACHU_FRAMES[frame]}</Text>
      <Text color="autoAccept" bold>{cries[frame]}</Text>
      <Text dimColor>你抚摸了 {buddy?.name}！</Text>
      <Text color="green">亲密度 +2 | 快乐度 +5</Text>
    </Box>
  );
};

// 喂食组件
const FeedMenu = ({ onDone }: { onDone: () => void }) => {
  const [selected, setSelected] = useState(0);
  const [fed, setFed] = useState(false);
  const buddy = getBuddyState();

  useEffect(() => {
    if (fed) {
      const timer = setTimeout(onDone, 3000);
      return () => clearTimeout(timer);
    }
  }, [fed]);

  // 处理键盘输入
  useInput((input, key) => {
    if (fed) return; // 喂食完成后不再处理输入

    // 数字键 1-5 选择食物
    const num = parseInt(input, 10);
    if (!isNaN(num) && num >= 1 && num <= FOODS.length) {
      setSelected(num - 1);
      return;
    }

    // 上下箭头切换选择
    if (key.upArrow) {
      setSelected((prev: number) => (prev > 0 ? prev - 1 : FOODS.length - 1));
      return;
    }
    if (key.downArrow) {
      setSelected((prev: number) => (prev < FOODS.length - 1 ? prev + 1 : 0));
      return;
    }

    // Enter 或 Space 确认喂食
    if (key.return || input === ' ') {
      handleFeed();
      return;
    }

    // ESC 或 q 退出
    if (key.escape || input === 'q' || input === 'Q') {
      onDone();
      return;
    }
  });

  const handleFeed = () => {
    const food = FOODS[selected];
    if (buddy) {
      buddy.hunger = Math.max(0, buddy.hunger - food.value);
      buddy.happiness = Math.min(100, buddy.happiness + 3);
      buddy.energy = Math.min(100, buddy.energy + 10);
      buddy.mood = buddy.hunger > 50 ? 'happy' : 'normal';
      buddy.stats.feedCount++;
      buddy.stats.totalInteractions++;
      buddy.stats.lastInteraction = Date.now();
      saveBuddyState(buddy);
    }
    setFed(true);
  };

  if (fed) {
    const food = FOODS[selected];
    return (
      <Box flexDirection="column" padding={1} alignItems="center">
        <Text color="green" bold>🍽 喂食成功！</Text>
        <Text color="yellow" bold>{PIKACHU_FRAMES[2]}</Text>
        <Text>{buddy?.name} 吃了 {food.emoji} {food.name}</Text>
        <Text color="green">饥饿度 -{food.value} | 精力 +10</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold underline color="cyan">选择食物:</Text>
      {FOODS.map((food, index) => (
        <Box key={food.name} marginTop={1}>
          <Text color={selected === index ? 'cyan' : 'white'}>
            {selected === index ? figures.pointer + ' ' : '  '}
            {food.emoji} {food.name} (恢复 {food.value} 饥饿度)
          </Text>
        </Box>
      ))}
      <Box marginTop={2}>
        <Text dimColor>按数字 1-{FOODS.length} 选择 | ↑↓ 切换 | Enter 确认 | ESC/q 退出</Text>
      </Box>
    </Box>
  );
};

// 玩耍动画
const PlayAnimation = ({ onDone }: { onDone: () => void }) => {
  const [frame, setFrame] = useState(0);
  const buddy = getBuddyState();

  useEffect(() => {
    if (buddy) {
      buddy.happiness = Math.min(100, buddy.happiness + 10);
      buddy.energy = Math.max(0, buddy.energy - 15);
      buddy.hunger = Math.min(100, buddy.hunger + 10);
      buddy.affection = Math.min(100, buddy.affection + 3);
      buddy.mood = 'excited';
      buddy.stats.playCount++;
      buddy.stats.totalInteractions++;
      buddy.stats.lastInteraction = Date.now();
      // 增加经验
      buddy.exp += 10;
      if (buddy.exp >= buddy.expToNext) {
        buddy.exp -= buddy.expToNext;
        buddy.level++;
        buddy.expToNext = Math.floor(buddy.expToNext * 1.5);
      }
      saveBuddyState(buddy);
    }

    const timers = [
      setTimeout(() => setFrame(1), 500),
      setTimeout(() => setFrame(2), 1000),
      setTimeout(() => setFrame(3), 1500),
      setTimeout(() => setFrame(4), 2000),
      setTimeout(onDone, 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const texts = ['来玩吧！', 'Pika!', '⚡ 十万伏特！ ⚡', '太好玩了！', '*喘气*'];

  return (
    <Box flexDirection="column" padding={1} alignItems="center">
      <Text color="yellow" bold>{PIKACHU_FRAMES[frame]}</Text>
      <Text color="autoAccept" bold>{texts[frame]}</Text>
      <Text dimColor>你和 {buddy?.name} 一起玩耍！</Text>
      <Text color="green">快乐度 +10 | 亲密度 +3 | 经验 +10</Text>
      <Text color="yellow">精力 -15 | 饥饿度 +10</Text>
    </Box>
  );
};

// 睡觉动画
const SleepAnimation = ({ onDone }: { onDone: () => void }) => {
  const [frame, setFrame] = useState(0);
  const buddy = getBuddyState();

  useEffect(() => {
    if (buddy) {
      buddy.isSleeping = true;
      buddy.energy = 100;
      buddy.health = Math.min(100, buddy.health + 10);
      buddy.mood = 'sleepy';
      saveBuddyState(buddy);
    }

    const timers = [
      setTimeout(() => setFrame(1), 1000),
      setTimeout(() => setFrame(2), 2000),
      setTimeout(onDone, 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const sleepFrames = [PIKACHU_FRAMES[0], PIKACHU_FRAMES[1], 'Zzz...'];
  const texts = ['Pika...', '好困...', 'Zzz...'];

  return (
    <Box flexDirection="column" padding={1} alignItems="center">
      {frame < 2 ? (
        <Text color="dim" bold>{sleepFrames[frame]}</Text>
      ) : (
        <Text color="dim" bold>Zzz...</Text>
      )}
      <Text color="cyan" bold>{texts[frame]}</Text>
      <Text dimColor>{buddy?.name} 睡着了</Text>
      <Text color="green">精力恢复满 | 健康 +10</Text>
    </Box>
  );
};

// 唤醒动画
const WakeAnimation = ({ onDone }: { onDone: () => void }) => {
  const [frame, setFrame] = useState(0);
  const buddy = getBuddyState();

  useEffect(() => {
    if (buddy) {
      buddy.isSleeping = false;
      buddy.mood = 'happy';
      saveBuddyState(buddy);
    }

    const timers = [
      setTimeout(() => setFrame(1), 800),
      setTimeout(() => setFrame(2), 1600),
      setTimeout(onDone, 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const texts = ['Zzz... Pika?', '早安！', 'Pika Pika! ⚡'];

  return (
    <Box flexDirection="column" padding={1} alignItems="center">
      <Text color="yellow" bold>{PIKACHU_FRAMES[frame]}</Text>
      <Text color="autoAccept" bold>{texts[frame]}</Text>
      <Text dimColor>你叫醒了 {buddy?.name}</Text>
      <Text color="green">精力满满！准备好冒险了！</Text>
    </Box>
  );
};

// 主状态显示
const BuddyStatus = ({ onDone }: { onDone: () => void }) => {
  const buddy = getBuddyState();
  const [showTip, setShowTip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(onDone, 15000);
    const tipTimer = setInterval(() => {
      setShowTip(prev => !prev);
    }, 5000);
    return () => {
      clearTimeout(timer);
      clearInterval(tipTimer);
    };
  }, []);

  if (!buddy) return null;

  // 兼容性处理：确保 stats 存在
  if (!buddy.stats) {
    buddy.stats = {
      petCount: 0,
      feedCount: 0,
      playCount: 0,
      totalInteractions: 0,
      lastInteraction: Date.now(),
      birthDate: Date.now(),
    };
    saveBuddyState(buddy);
  }

  // 计算进度条
  const renderBar = (value: number) => {
    const filled = Math.floor(value / 10);
    return '█'.repeat(filled) + '░'.repeat(10 - filled);
  };

  // 获取亲密度等级
  const getAffectionLevel = (affection: number): string => {
    if (affection >= 90) return '灵魂伴侣 ❤❤❤❤❤';
    if (affection >= 70) return '最佳伙伴 ❤❤❤❤';
    if (affection >= 50) return '好朋友 ❤❤❤';
    if (affection >= 30) return '熟人 ❤❤';
    if (affection >= 10) return '新朋友 ❤';
    return '陌生人';
  };

  // 获取等级称号
  const getLevelTitle = (level: number): string => {
    if (level >= 50) return '传说级训练师';
    if (level >= 40) return '大师级训练师';
    if (level >= 30) return '精英训练师';
    if (level >= 20) return '高级训练师';
    if (level >= 10) return '中级训练师';
    if (level >= 5) return '初级训练师';
    return '新手训练师';
  };

  // 获取状态描述
  const getStatusDesc = (): string => {
    if (buddy.isSleeping) return `${buddy.name} 正在睡觉... zZz`;
    if (buddy.hunger > 70) return `${buddy.name} 很饿`;
    if (buddy.energy < 20) return `${buddy.name} 很累`;
    if (buddy.happiness > 80) return `${buddy.name} 非常开心！`;
    if (buddy.happiness < 30) return `${buddy.name} 有点不开心`;
    return `${buddy.name} 状态不错`;
  };

  return (
    <Box flexDirection="column" padding={1} borderStyle="round" borderColor="yellow" minWidth={50}>
      {/* 标题栏 */}
      <Box justifyContent="space-between" marginBottom={1}>
        <Text bold color="yellow" backgroundColor="black">
          {' '}⚡ {buddy.name} Lv.{buddy.level} ⚡{' '}
        </Text>
        <Text color="cyan">{getLevelTitle(buddy.level)}</Text>
      </Box>

      {/* 主要内容区 */}
      <Box flexDirection="row">
        {/* 左侧：精灵图 */}
        <Box flexDirection="column" width={18} marginRight={2} alignItems="center">
          <Text color={buddy.isSleeping ? 'dim' : 'yellow'} bold>
            {buddy.isSleeping ? 'Zzz...' : PIKACHU_FRAMES[0]}
          </Text>
          <Text color="yellow" bold>({buddy.mood === 'happy' ? '^ᴗ^' : buddy.mood === 'sleepy' ? '-ᴗ-' : '•̀ᴗ•́'})</Text>
          <Text color="white" italic>"{buddy.isSleeping ? 'Zzz...' : 'Pika!'}"</Text>
        </Box>

        {/* 右侧：状态面板 */}
        <Box flexDirection="column" flexGrow={1}>
          {/* 状态描述 */}
          <Box borderStyle="single" borderColor="dim" marginBottom={1} paddingX={1}>
            <Text color="white" italic>{getStatusDesc()}</Text>
          </Box>

          {/* 属性条 */}
          <Text bold underline color="cyan">状态:</Text>
          
          <Box marginTop={1}>
            <Box width={10}><Text color="green">快乐度:</Text></Box>
            <Text color={buddy.happiness > 50 ? 'green' : 'red'}>{renderBar(buddy.happiness)}</Text>
            <Text dimColor> {buddy.happiness}/100</Text>
          </Box>

          <Box marginTop={1}>
            <Box width={10}><Text color="orange">饥饿度:</Text></Box>
            <Text color={buddy.hunger < 50 ? 'green' : 'red'}>{renderBar(buddy.hunger)}</Text>
            <Text dimColor> {buddy.hunger}/100</Text>
          </Box>

          <Box marginTop={1}>
            <Box width={10}><Text color="blue">精力:</Text></Box>
            <Text color={buddy.energy > 30 ? 'green' : 'red'}>{renderBar(buddy.energy)}</Text>
            <Text dimColor> {buddy.energy}/100</Text>
          </Box>

          <Box marginTop={1}>
            <Box width={10}><Text color="red">健康:</Text></Box>
            <Text color={buddy.health > 50 ? 'green' : 'red'}>{renderBar(buddy.health)}</Text>
            <Text dimColor> {buddy.health}/100</Text>
          </Box>

          <Box marginTop={1}>
            <Box width={10}><Text color="magenta">亲密度:</Text></Box>
            <Text color="magenta">{renderBar(buddy.affection)}</Text>
            <Text dimColor> {buddy.affection}/100</Text>
          </Box>

          {/* 经验条 */}
          <Box marginTop={1}>
            <Box width={10}><Text color="cyan">经验:</Text></Box>
            <Text color="cyan">{renderBar((buddy.exp / buddy.expToNext) * 100)}</Text>
            <Text dimColor> {buddy.exp}/{buddy.expToNext}</Text>
          </Box>

          {/* 亲密度等级 */}
          <Box marginTop={1} borderStyle="single" borderColor="magenta" paddingX={1}>
            <Text color="magenta">❤ {getAffectionLevel(buddy.affection)}</Text>
          </Box>
        </Box>
      </Box>

      {/* 统计信息 */}
      <Box marginTop={1} borderStyle="single" borderColor="dim" paddingX={1}>
        <Text dimColor>统计: 抚摸 {buddy.stats.petCount} 次 | 喂食 {buddy.stats.feedCount} 次 | 玩耍 {buddy.stats.playCount} 次</Text>
      </Box>

      {/* 提示 */}
      {showTip && (
        <Box marginTop={1} justifyContent="center">
          {buddy.isSleeping ? (
            <>
              <Text color="yellow">{buddy.name} 正在睡觉 💤</Text>
              <Text dimColor> | </Text>
              <Text color="cyan">/buddy wake</Text>
              <Text dimColor> 叫醒它</Text>
            </>
          ) : (
            <>
              <Text dimColor>可用命令: </Text>
              <Text color="cyan">/buddy pet</Text>
              <Text dimColor> | </Text>
              <Text color="cyan">/buddy feed</Text>
              <Text dimColor> | </Text>
              <Text color="cyan">/buddy play</Text>
              <Text dimColor> | </Text>
              <Text color="cyan">/buddy sleep</Text>
            </>
          )}
        </Box>
      )}

      {/* 个性 */}
      <Box marginTop={1} justifyContent="flex-end">
        <Text dimColor italic>"{buddy.personality}"</Text>
      </Box>
    </Box>
  );
};

// 主组件
export const Buddy = ({ onDone, args }: { onDone: () => void; args?: string }) => {
  const companion = getCompanion();
  const buddy = getBuddyState();

  // 解析参数
  const argsArray = args?.trim().split(/\s+/) || [];
  const subCommand = argsArray[0]?.toLowerCase();

  // 如果没有伙伴，进入孵化流程
  if (!buddy && !companion) {
    return <HatchingFlow onDone={onDone} />;
  }

  // 处理子命令
  switch (subCommand) {
    case 'pet':
    case '抚摸':
      if (!buddy) {
        return (
          <Box flexDirection="column" padding={1}>
            <Text color="yellow">你还没有伙伴！输入 /buddy 获取一只皮卡丘。</Text>
          </Box>
        );
      }
      if (buddy.isSleeping) {
        return (
          <Box flexDirection="column" padding={1}>
            <Text color="yellow">{buddy.name} 正在睡觉，不要打扰它！</Text>
          </Box>
        );
      }
      return <PetAnimation onDone={onDone} />;
    
    case 'feed':
    case '喂食':
    case 'food':
      if (!buddy) {
        return (
          <Box flexDirection="column" padding={1}>
            <Text color="yellow">你还没有伙伴！输入 /buddy 获取一只皮卡丘。</Text>
          </Box>
        );
      }
      if (buddy.isSleeping) {
        return (
          <Box flexDirection="column" padding={1}>
            <Text color="yellow">{buddy.name} 正在睡觉，不能吃东西！</Text>
          </Box>
        );
      }
      return <FeedMenu onDone={onDone} />;
    
    case 'play':
    case '玩耍':
    case '玩':
      if (!buddy) {
        return (
          <Box flexDirection="column" padding={1}>
            <Text color="yellow">你还没有伙伴！输入 /buddy 获取一只皮卡丘。</Text>
          </Box>
        );
      }
      if (buddy.isSleeping) {
        return (
          <Box flexDirection="column" padding={1}>
            <Text color="yellow">{buddy.name} 正在睡觉，先叫醒它吧！</Text>
          </Box>
        );
      }
      return <PlayAnimation onDone={onDone} />;
    
    case 'sleep':
    case '睡觉':
      if (!buddy) {
        return (
          <Box flexDirection="column" padding={1}>
            <Text color="yellow">你还没有伙伴！输入 /buddy 获取一只皮卡丘。</Text>
          </Box>
        );
      }
      if (buddy.isSleeping) {
        return (
          <Box flexDirection="column" padding={1}>
            <Text color="yellow">{buddy.name} 已经在睡觉了！</Text>
            <Text dimColor>使用 /buddy wake 叫醒它</Text>
          </Box>
        );
      }
      return <SleepAnimation onDone={onDone} />;
    
    case 'wake':
    case '叫醒':
    case '唤醒':
      if (!buddy) {
        return (
          <Box flexDirection="column" padding={1}>
            <Text color="yellow">你还没有伙伴！输入 /buddy 获取一只皮卡丘。</Text>
          </Box>
        );
      }
      if (!buddy.isSleeping) {
        return (
          <Box flexDirection="column" padding={1}>
            <Text color="yellow">{buddy.name} 是醒着的！</Text>
          </Box>
        );
      }
      return <WakeAnimation onDone={onDone} />;
    
    case 'status':
    case '状态':
    default:
      if (!buddy) {
        // 从 companion 迁移数据
        if (companion) {
          const newBuddy = initBuddyState(companion.name, companion.species);
          return <BuddyStatus onDone={onDone} />;
        }
        return <HatchingFlow onDone={onDone} />;
      }
      return <BuddyStatus onDone={onDone} />;
  }
};

export const call: LocalJSXCommandCall = (onDone, _context, args) => {
  return Promise.resolve(<Buddy onDone={onDone} args={args} />);
};
