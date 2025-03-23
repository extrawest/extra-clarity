const escapedRegExpChars = {
  angularCompiler: /[.*+?^=!:${}()|[\]/\\]/g,
  custom: /[-/\\^$*+?.()|[\]{}]/g,
  lodash: /[\\^$.*+?()[\]{}|]/g,
};

export function escapeRegExp(str: string): string;
export function escapeRegExp(str: string | undefined): string | undefined {
  if (!str) {
    return str;
  }
  return str.replace(escapedRegExpChars.custom, '\\$&');
}
