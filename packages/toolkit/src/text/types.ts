/**
 * Options for title case conversion
 */
export interface TitleCaseOptions {
  /**
   * Preserve known acronyms in uppercase (default: true)
   * @example PT, CV, TNI, POLRI
   */
  preserveAcronyms?: boolean;

  /**
   * Strict mode forces lowercase before capitalizing (default: false)
   */
  strict?: boolean;

  /**
   * Additional words to keep lowercase (extends default list)
   */
  exceptions?: string[];
}

/**
 * Options for abbreviation expansion
 */
export interface ExpandOptions {
  /**
   * Filter abbreviations by category
   * - 'all': Expand all abbreviations (default)
   * - 'address': Only expand address abbreviations
   * - 'title': Only expand title abbreviations
   * - 'org': Only expand organization abbreviations
   */
  mode?: 'all' | 'address' | 'title' | 'org';

  /**
   * Custom abbreviation mappings (overrides built-in)
   */
  customMap?: Record<string, string>;

  /**
   * Preserve original case of expanded text (default: false)
   */
  preserveCase?: boolean;
}

/**
 * Options for abbreviation contraction
 */
export interface ContractOptions {
  /**
   * Filter abbreviations by category
   */
  mode?: 'all' | 'address' | 'title' | 'org';
}

/**
 * Options for slug generation
 */
export interface SlugifyOptions {
  /**
   * Separator character (default: '-')
   */
  separator?: string;

  /**
   * Convert to lowercase (default: true)
   */
  lowercase?: boolean;

  /**
   * Custom character replacements
   */
  replacements?: Record<string, string>;

  /**
   * Trim leading/trailing separators (default: true)
   */
  trim?: boolean;
}

/**
 * Options for text sanitization
 */
export interface SanitizeOptions {
  /**
   * Remove newline characters (default: false)
   */
  removeNewlines?: boolean;

  /**
   * Remove extra spaces (default: true)
   */
  removeExtraSpaces?: boolean;

  /**
   * Remove all punctuation (default: false)
   */
  removePunctuation?: boolean;

  /**
   * Only allow specific characters (regex pattern)
   */
  allowedChars?: string;

  /**
   * Trim leading/trailing whitespace (default: true)
   */
  trim?: boolean;
}

/**
 * Options for string comparison
 */
export interface CompareOptions {
  /**
   * Case-sensitive comparison (default: false)
   */
  caseSensitive?: boolean;

  /**
   * Ignore whitespace differences (default: false)
   */
  ignoreWhitespace?: boolean;

  /**
   * Ignore accent/diacritic marks (default: false)
   */
  ignoreAccents?: boolean;
}

/**
 * Options for word extraction
 */
export interface ExtractOptions {
  /**
   * Minimum word length to include
   */
  minLength?: number;

  /**
   * Treat hyphenated words as single word (default: true)
   * @example 'anak-anak' is one word
   */
  includeHyphenated?: boolean;

  /**
   * Convert extracted words to lowercase (default: false)
   */
  lowercase?: boolean;
}

/**
 * Options for text truncation
 */
export interface TruncateOptions {
  /**
   * Ellipsis string (default: '...')
   */
  ellipsis?: string;

  /**
   * Truncate at word boundary (default: true)
   */
  wordBoundary?: boolean;
}
