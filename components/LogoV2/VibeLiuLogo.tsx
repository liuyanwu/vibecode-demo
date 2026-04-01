// VIBE LIU ASCII 艺术 - 足球图案
// 使用块字符创建一个足球图案

import * as React from 'react';
import { Box, Text } from '../../ink.js';

export function VibeLiuLogo() {
  return (
    <Box flexDirection="column" alignItems="center">
      {/* 足球图案 ASCII Art */}
      <Text>
        <Text color="clawd_body">      ▄▄▄▄▄      </Text>
      </Text>
      <Text>
        <Text color="clawd_body">   ▄█▀     ▀█▄   </Text>
      </Text>
      <Text>
        <Text color="clawd_body">  █▀  ▄▄▄▄  ▀█  </Text>
      </Text>
      <Text>
        <Text color="clawd_body"> █  ▄▀   ▀▄  █ </Text>
      </Text>
      <Text>
        <Text color="clawd_body"> █ █  ▀▀  █ █ </Text>
      </Text>
      <Text>
        <Text color="clawd_body"> █ █▄      ▄█ </Text>
      </Text>
      <Text>
        <Text color="clawd_body">  █▄▀▀▄▄▄▄▀▄█  </Text>
      </Text>
      <Text>
        <Text color="clawd_body">   ▀█▄     ▄█▀   </Text>
      </Text>
      <Text>
        <Text color="clawd_body">      ▀▀▀▀▀      </Text>
      </Text>
    </Box>
  );
}
