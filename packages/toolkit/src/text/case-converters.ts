/**
 * Convert text to camelCase
 *
 * Treats spaces, hyphens, and underscores as word boundaries.
 * Strips all other special characters. First word is lowercase.
 *
 * @param text - The text to convert
 * @returns camelCase string
 *
 * @example
 * ```typescript
 * toCamelCase('hello-world')
 * // → 'helloWorld'
 *
 * toCamelCase('hello_world')
 * // → 'helloWorld'
 *
 * toCamelCase('Hello World')
 * // → 'helloWorld'
 *
 * toCamelCase('')
 * // → ''
 * ```
 *
 * @public
 */
export function toCamelCase(text: string): string {
  if (!text) return text;

  const words = extractWords(text);

  if (words.length === 0) return '';

  return words
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      return capitalizeFirst(word);
    })
    .join('');
}

/**
 * Convert text to PascalCase
 *
 * Treats spaces, hyphens, and underscores as word boundaries.
 * Strips all other special characters. Every word is capitalized.
 *
 * @param text - The text to convert
 * @returns PascalCase string
 *
 * @example
 * ```typescript
 * toPascalCase('hello_world')
 * // → 'HelloWorld'
 *
 * toPascalCase('hello-world')
 * // → 'HelloWorld'
 *
 * toPascalCase('hello world')
 * // → 'HelloWorld'
 *
 * toPascalCase('')
 * // → ''
 * ```
 *
 * @public
 */
export function toPascalCase(text: string): string {
  if (!text) return text;

  const words = extractWords(text);

  return words.map((word) => capitalizeFirst(word)).join('');
}

/**
 * Convert text to snake_case
 *
 * Treats spaces, hyphens, and camelCase boundaries as word separators.
 * Strips all other special characters. All lowercase with underscores.
 *
 * @param text - The text to convert
 * @returns snake_case string
 *
 * @example
 * ```typescript
 * toSnakeCase('helloWorld')
 * // → 'hello_world'
 *
 * toSnakeCase('Hello-World')
 * // → 'hello_world'
 *
 * toSnakeCase('Hello World')
 * // → 'hello_world'
 *
 * toSnakeCase('')
 * // → ''
 * ```
 *
 * @public
 */
export function toSnakeCase(text: string): string {
  if (!text) return text;

  const words = extractWords(text);

  return words.map((word) => word.toLowerCase()).join('_');
}

/**
 * Extract words from text by splitting on boundaries
 */
function extractWords(text: string): string[] {
  const parts = text.split(/[\s\-_]+/);

  const words: string[] = [];
  for (const part of parts) {
    const camelWords = part.split(/(?=[A-Z])/);
    for (const word of camelWords) {
      const cleaned = word.replace(/[^a-zA-Z0-9]/g, '');
      if (cleaned) {
        words.push(cleaned);
      }
    }
  }

  return words;
}

/**
 * Capitalize first letter of a word
 */
function capitalizeFirst(word: string): string {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
