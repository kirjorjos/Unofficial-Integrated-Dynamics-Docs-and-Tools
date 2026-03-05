export function sanitizeForRe2(pattern: string): string {
  return pattern
    .replaceAll(/\(\?(?!P)(?<name>[a-zA-Z0-9_]+)>/g, "(?P<$1>")
    .replaceAll(/\\u\{([0-9A-Fa-f]+)\}/g, "\\x{$1}");
}

export function sanitizeReplacement(replacement: string): string {
  return replacement
    .replaceAll(/\${(\w+)}/g, "$<$1>")
    .replaceAll(/(?<!\\)\$0(?!\d)/g, "$$&")
    .replaceAll(/\\(\$)/g, "$$$$");
}
