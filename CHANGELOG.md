# Changelog

All notable changes to this project will be documented in this file.

## [0.4.0] - 2026-04-05

### Added

#### DateTime Module

A comprehensive new module for Indonesian date/time operations:

- `formatDate()` - Format dates with Indonesian locale (6 styles: full, long, medium, short, weekday, month)
- `formatDateRange()` - Smart date range formatting with automatic redundancy removal
- `parseDate()` - Strict DD-MM-YYYY parser with ISO format auto-detection and leap year validation
- `toRelativeTime()` - Relative time in Indonesian ("X menit yang lalu", "Kemarin", "Besok", etc.)
- `getAge()` - Age calculation with years, months, days support (object or string output)
- `getIndonesianTimezone()` - Map IANA timezone names and UTC offsets to WIB/WITA/WIT
- `isLeapYear()` - Leap year validation with proper Gregorian calendar rules
- `daysInMonth()` - Days in month calculation accounting for leap years
- `isValidDate()` - Type guard for validating Date objects
- `isWeekend()` / `isWorkingDay()` - Weekend and working day detection
- `InvalidDateError` / `InvalidDateRangeError` - Custom error classes with error codes for programmatic handling

## [0.3.4] - 2026-04-04

### Breaking Changes

- `calculateTax()` now requires explicit `rate` parameter (removed default 0.11) to comply with Data Independence mandate

### Fixes

- `formatRupiah()` negative numbers now display as `-Rp 1.500.000` instead of `Rp -1.500.000` (standard accounting format)
- `formatCompact()` negative numbers now display as `-Rp 1,5 juta` (consistent with formatRupiah)
- `addRupiahSymbol()` no longer uses browser-dependent `toLocaleString` — uses internal formatting for consistency

### New Features

#### Currency Module Enhancements

- `splitAmount()` - Split amounts into equal or custom-ratio parts with optional rounding (e.g., split bills, installments)
- `percentageOf()` - Calculate what percentage a part is of a total (e.g., budget allocation)
- `difference()` - Calculate absolute and percentage difference between two amounts with direction tracking
- `validateRupiah()` - Validate whether a string is a valid Rupiah format
- `formatCompact()` now accepts `CompactOptions` (`symbol`, `spaceAfterSymbol`)
- `toWords()` now supports `withDecimals` option for decimal terbilang (e.g., "satu juta koma lima puluh")
- `InvalidSplitError` custom error class for split validation failures

## [0.3.3] - 2026-04-04

### New Features

#### Text Module Enhancements

- `maskText()` - Versatile text masking utility with `all`, `middle`, and `email` patterns for privacy-compliant data display
- `toCamelCase()` - Convert text to camelCase format (replaces Lodash dependency)
- `toPascalCase()` - Convert text to PascalCase format
- `toSnakeCase()` - Convert text to snake_case format, handles camelCase boundaries
- `countSyllables()` - Algorithm-based syllable counter for Indonesian text with dipthong awareness (ai, au, oi)

## [0.3.2] - 2026-04-03

### New Features

#### Email Validator Module

- `validateEmail()` - Standard email format validation with optional disposable domain detection
- `normalizeEmail()` - Utility to clean and lowercase email addresses
- `maskEmail()` - Securely mask email addresses for privacy protection (e.g., `u***r@example.com`)
- `getEmailInfo()` - Extract detailed metadata including domain and provider classification

## [0.3.1] - 2026-04-03

### New Features

#### VIN (Vehicle Identification Number) Module

- `validateVIN()` - Validate 17-character VIN strings according to ISO 3779 checksum standards

## [0.3.0] - 2026-04-03

### New Features

#### NPWP Module

- `validateNPWP()` - Validate format and checksums for 15-digit and 16-digit NPWP
- `formatNPWP()` - Format 15/16-digit data into standard NPWP notations
- `parseNPWP()` - Clean and parse NPWP segments
- `maskNPWP()` - Mask NPWP digits for privacy and logging

#### Vehicle Plate (Plat Nomor) Module

- `validatePlate()` - Validate standard Indonesian vehicle plate numbers
- `formatPlate()` - Format and normalize plate spacing
- `getRegionFromPlate()` - Extract corresponding province and region names based on plate prefix

#### Text Module Enhancements

- `profanityFilter()` - Safely filter out common Indonesian bad words
- `removeStopwords()` - Remove excessive filler words (stopwords) from Indonesian text
- `toFormal()` - Normalize informal writing variants (slang) into formal Indonesian
- `isAlay()` - Detect informal "alay" writing styles or excessive symbol usage
- `contractAbbreviation()` - Revert expanded text back into standard abbreviations
- `removeAccents()` - Remove diacritic marks (accents) for clean string comparisons

#### Documentation & Core

- Reorganized module utilities (`utils.ts`) into core functional exports
- Added `.prettierrc` for enforced source code formatting rules
- Updated `API Documentation` with multiple runtime installation tabs (`npm`, `pnpm`, `yarn`, `bun`)

## [0.2.0] - 2026-01-06

### Added

#### Text Module

- `toTitleCase()` - Smart capitalization handling Indonesian particles
- `expandAbbreviation()` - Expand common Indonesian abbreviations (Jl., Bpk., etc.)
- `slugify()` - URL-friendly slugs with Indonesian conjunction support (& -> dan)
- `truncate()` - Smart text truncation respecting word boundaries
- `compareStrings()` - Robust string comparison (case/accent/whitespace)
- `similarity()` - Calculate string similarity scores (Levenshtein)
- `extractWords()` - Word extraction preserving hyphenated words
- `sanitize()` - Text cleaning and normalization

#### Improvements

- Performance optimizations for text processing
- Comprehensive test coverage for text utilities

### Changed

- Centralized Prettier configuration to the root directory.
- Fixed MDX build issues by removing automatic `@format` pragmas.

### Fixed

- Improved `isAlay` detection accuracy.
- Enhanced NPWP masking to preserve formatting.
- Fixed duplicate exports in the main toolkit entry point.

## [0.1.0] - 2025-12-11

### Added

#### NIK Module

- `validateNIK()` - Validate Indonesian National Identity Number
- `parseNIK()` - Extract province, birth date, and gender information
- `formatNIK()` - Format NIK with separators
- `maskNIK()` - Mask NIK for privacy protection
- Support for all 38 Indonesian provinces
- Leap year validation
- Gender detection from birth date encoding

#### Phone Module

- `validatePhoneNumber()` - Validate Indonesian phone numbers
- `formatPhoneNumber()` - Format to international/national/e164 formats
- `getOperator()` - Detect mobile operator (Telkomsel, XL, Indosat, Smartfren, Axis)
- `parsePhoneNumber()` - Extract all phone information
- `maskPhoneNumber()` - Mask phone numbers for privacy
- `cleanPhoneNumber()` - Remove separators and normalize
- Support for 200+ Indonesian area codes
- Support for landline and mobile numbers

#### Currency Module

- `formatRupiah()` - Format numbers as Rupiah currency
- `formatCompact()` - Compact format with proper Indonesian grammar (1,5 juta)
- `parseRupiah()` - Parse formatted strings back to numbers
- `toWords()` - Convert numbers to Indonesian words (terbilang)
- `roundToClean()` - Round to clean amounts (ribu, ratus-ribu, juta)
- Support for decimal places and custom separators

#### Package

- TypeScript support with full type definitions
- Dual package support (ESM + CommonJS)
- Tree-shakeable exports
- Zero runtime dependencies
- 175+ test cases with 95%+ coverage
