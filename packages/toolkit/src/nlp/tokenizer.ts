import { SENTENCE_ABBREVIATIONS } from './constants';

/**
 * Splits Indonesian text into sentences.
 *
 * Handles Indonesian abbreviations (Yth., Bpk., Sdr., dll)
 * so periods inside abbreviations don't create false sentence breaks.
 *
 * @param text - Text to tokenize into sentences
 * @returns Array of sentences (empty array if input is empty/invalid)
 *
 * @example
 * ```typescript
 * tokenizeIndo("Kpd Yth. Bpk. Budi."); // ["Kpd Yth. Bpk. Budi."]
 * tokenizeIndo("Halo. Selamat pagi."); // ["Halo.", "Selamat pagi."]
 * ```
 *
 * @example
 * For processing formal Indonesian letters:
 * ```typescript
 * const letter = "Hormat kami, PT ABC.Jl. Merdeka No.10";
 * const sentences = tokenizeIndo(letter);
 * // Properly handles "Jl." (Jalan) abbreviation
 * ```
 */
export function tokenizeIndo(text: string): string[] {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const abbreviations = SENTENCE_ABBREVIATIONS;

  const abbrevPositions: Array<{ start: number; end: number }> = [];

  for (const abbrev of abbreviations) {
    let searchStart = 0;
    let index = text.indexOf(abbrev, searchStart);

    while (index !== -1) {
      abbrevPositions.push({ start: index, end: index + abbrev.length });
      searchStart = index + 1;
      index = text.indexOf(abbrev, searchStart);
    }
  }

  if (abbrevPositions.length === 0) {
    return text
      .split('.')
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }

  abbrevPositions.sort((a, b) => a.start - b.start);

  const sentenceEndPositions: number[] = [];

  for (const period of text.matchAll(/\./g)) {
    const periodIndex = period.index!;
    const isInsideAbbrev = abbrevPositions.some(
      pos => periodIndex >= pos.start && periodIndex < pos.end
    );

    if (!isInsideAbbrev) {
      sentenceEndPositions.push(periodIndex);
    }
  }

  const sentences: string[] = [];
  let prevEnd = 0;

  for (const endPos of sentenceEndPositions) {
    const sentence = text.substring(prevEnd, endPos).trim();
    if (sentence.length > 0) {
      sentences.push(sentence);
    }
    prevEnd = endPos + 1;
  }

  if (prevEnd < text.length) {
    const remaining = text.substring(prevEnd).trim();
    if (remaining.length > 0) {
      sentences.push(remaining);
    }
  }

  return sentences;
}
