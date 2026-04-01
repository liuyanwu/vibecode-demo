Object.defineProperty(globalThis, 'MACRO', {
  value: {
    VERSION: '1.0.99',
    VERSION_CHANGELOG: {},
    PACKAGE_URL: '@anthropic-ai/claude-code',
    NATIVE_PACKAGE_URL: '@anthropic-ai/claude-code'
  },
  writable: true,
  configurable: true
});

// Mock feature flags - only enable essential features
(globalThis as any).feature = (name: string) => {
  const enabledFeatures: Record<string, boolean> = {
    'BUDDY': true,
    'ULTRAPLAN': false,  // Disable to avoid missing modules
    'TORCH': false,      // Disable to avoid missing modules
    'KAIROS': false,
    'KAIROS_BRIEF': false,
    'KAIROS_CHANNELS': false,
    'PROACTIVE': false,
    'DIRECT_CONNECT': true,
    'SSH_REMOTE': true,
  };
  return enabledFeatures[name] || false;
};

// Ensure MACRO is available globally with VERSION_CHANGELOG for logoV2Utils
(globalThis as any).MACRO.VERSION_CHANGELOG = (globalThis as any).MACRO.VERSION_CHANGELOG || {};
