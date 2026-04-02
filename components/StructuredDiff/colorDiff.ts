import {
  ColorDiff,
  ColorFile,
  getSyntaxTheme as nativeGetSyntaxTheme,
  type SyntaxTheme,
} from 'color-diff-napi'
import { isEnvDefinedFalsy } from '../../utils/envUtils.js'

export type ColorModuleUnavailableReason = 'env' | 'module'

/**
 * Check if ColorDiff is a valid constructor (not a reserved placeholder module)
 */
function isColorDiffValid(): boolean {
  // The reserved color-diff-napi package exports an object instead of a class
  // Check if ColorDiff is actually a constructor function
  return typeof ColorDiff === 'function' &&
         Object.keys(ColorDiff).length === 0
}

/**
 * Returns a static reason why the color-diff module is unavailable, or null if available.
 * 'env' = disabled via VIBECODE_SYNTAX_HIGHLIGHT
 * 'module' = color-diff-napi is a reserved placeholder package
 */
export function getColorModuleUnavailableReason(): ColorModuleUnavailableReason | null {
  if (isEnvDefinedFalsy(process.env.VIBECODE_SYNTAX_HIGHLIGHT)) {
    return 'env'
  }
  if (!isColorDiffValid()) {
    return 'module'
  }
  return null
}

export function expectColorDiff(): typeof ColorDiff | null {
  return getColorModuleUnavailableReason() === null ? ColorDiff : null
}

export function expectColorFile(): typeof ColorFile | null {
  return getColorModuleUnavailableReason() === null ? ColorFile : null
}

export function getSyntaxTheme(themeName: string): SyntaxTheme | null {
  return getColorModuleUnavailableReason() === null
    ? nativeGetSyntaxTheme(themeName)
    : null
}
