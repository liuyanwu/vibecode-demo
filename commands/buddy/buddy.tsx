import { Box, Text } from 'ink';
import React, { useEffect, useState } from 'react';
import { getCompanion, roll, companionUserId } from '../../buddy/companion.js';
import { RARITY_COLORS, RARITY_STARS } from '../../buddy/types.js';
import { getGlobalConfig, saveGlobalConfig } from '../../utils/config.js';
import type { LocalJSXCommandCall } from '../../types/command.js';
import { useSetAppState } from '../../state/AppState.js';

const POKEBALL_ASCII = `
      .-----.
    .'       '.
   /           \\
  |             |
  |      .      |
  |             |
   \\           /
    '.       .'
      '-----'
`;

const HatchingFlow = ({ onDone }: { onDone: () => void }) => {
  const [step, setStep] = useState(0);
  const userId = companionUserId();
  const { bones } = roll(userId);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1500),
      setTimeout(() => setStep(2), 3500),
      setTimeout(() => {
        const config = getGlobalConfig();
        saveGlobalConfig((config) => ({
          ...config,
          companion: {
            name: bones.species,
            personality: 'A loyal Pokemon companion.',
            hatchedAt: Date.now(),
          },
        }));
        setStep(3);
      }, 6000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [bones]);

  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(onDone, 4000);
      return () => clearTimeout(timer);
    }
  }, [step, onDone]);

  return (
    <Box flexDirection="column" padding={1} alignItems="center">
      <Text color="red" bold>{POKEBALL_ASCII}</Text>
      <Box marginTop={1}>
        {step === 0 && <Text color="white" bold>A mysterious PokeBall appears...</Text>}
        {step === 1 && <Text color="red" bold>Shake... shake...</Text>}
        {step === 2 && <Text color="yellow" bold italic>Something is happening!</Text>}
        {step === 3 && (
          <Box flexDirection="column" alignItems="center">
            <Text color="green" bold>GOTCHA!</Text>
            <Text color="white">You caught a {bones.rarity === 'legendary' ? '✨ LEGENDARY ' : ''}{bones.species}!</Text>
            <Text dimColor>Type /buddy again to see your new friend's stats.</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

// Pet animation frames
const PET_FRAMES = [
  `  \\o/  Pika!`,
  `  \\o/  Pika!!`,
  `  \\o/  Pika!!!`,
  `  ^ω^  *happy*`,
  `  (˘⌣˘)  *content*`,
];

const PetAnimation = ({ onDone }: { onDone: () => void }) => {
  const [frame, setFrame] = useState(0);
  const companion = getCompanion();
  const setAppState = useSetAppState();

  useEffect(() => {
    // Trigger pet effect in CompanionSprite
    setAppState(prev => ({
      ...prev,
      companionPetAt: Date.now(),
    }));

    const timers = [
      setTimeout(() => setFrame(1), 500),
      setTimeout(() => setFrame(2), 1000),
      setTimeout(() => setFrame(3), 1500),
      setTimeout(() => setFrame(4), 2000),
      setTimeout(onDone, 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [setAppState, onDone]);

  return (
    <Box flexDirection="column" padding={1} alignItems="center">
      <Text color="autoAccept" bold>{PET_FRAMES[frame]}</Text>
      <Text dimColor marginTop={1}>You pet {companion?.name}!</Text>
    </Box>
  );
};

export const Buddy = ({ onDone, args }: { onDone: () => void; args?: string }) => {
  const companion = getCompanion();
  const setAppState = useSetAppState();

  // Parse args - check for pet subcommand
  const argsArray = args?.trim().split(/\s+/) || [];
  const isPet = argsArray[0] === 'pet';

  // Check for pet subcommand
  if (isPet) {
    if (!companion) {
      return (
        <Box flexDirection="column" padding={1}>
          <Text color="yellow">You don't have a buddy yet! Type /buddy to hatch one.</Text>
        </Box>
      );
    }
    return <PetAnimation onDone={onDone} />;
  }

  if (!companion) return <HatchingFlow onDone={onDone} />;

  useEffect(() => {
    const timer = setTimeout(onDone, 8000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <Box flexDirection="column" padding={1} borderStyle="round" borderColor={RARITY_COLORS[companion.rarity]} minWidth={40}>
      <Box justifyContent="space-between" marginBottom={1}>
        <Text bold color={RARITY_COLORS[companion.rarity]} backgroundColor="white">
          {" "}{companion.name} ({companion.species}){" "}
        </Text>
        <Text color={RARITY_COLORS[companion.rarity]}>{RARITY_STARS[companion.rarity]}</Text>
      </Box>

      <Box flexDirection="row">
        <Box flexDirection="column" width={12} marginRight={2}>
           <Text color="red" bold>{POKEBALL_ASCII}</Text>
        </Box>
        <Box flexDirection="column" flexGrow={1}>
          <Text bold underline color="cyan">Trainer's Pokemon Stats:</Text>
          {Object.entries(companion.stats).map(([stat, value]) => (
            <Box key={stat} marginTop={0}>
              <Box width={10}>
                <Text color="white">{stat}: </Text>
              </Box>
              <Text color={value > 80 ? "green" : value > 50 ? "yellow" : "red"}>
                {'█'.repeat(Math.floor(value / 10))}
              </Text>
              <Text dimColor> {value}</Text>
            </Box>
          ))}
        </Box>
      </Box>

      <Box marginTop={1} borderStyle="single" borderColor="dim">
        <Text italic color="white"> "{companion.personality}" </Text>
      </Box>

      <Box marginTop={1} justifyContent="flex-end">
        <Text dimColor>Hatched on: {new Date(companion.hatchedAt).toLocaleDateString()}</Text>
      </Box>

      <Box marginTop={1} justifyContent="center">
        <Text dimColor>Tip: Type </Text>
        <Text color="cyan">/buddy pet</Text>
        <Text dimColor> to pet your buddy!</Text>
      </Box>
    </Box>
  );
};

export const call: LocalJSXCommandCall = (onDone, _context, args) => {
  return Promise.resolve(<Buddy onDone={onDone} args={args} />);
};
