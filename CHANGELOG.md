# Changelog

All notable changes to this project will be documented in this file.

## [0.7.1] - 2026-04-10

### Added

#### Plate Module

- `maskPlate()` - Mask license plate for privacy
- `cleanPlate()` - Remove non-alphanumeric characters
- `isPrivatePlate()` - Check if private vehicle plate
- `isPublicPlate()` - Check if public transportation plate
- `isDiplomatPlate()` - Check if diplomat plate
- `PlateMaskOptions` type

#### VIN Module

- `maskVIN()` - Mask VIN for privacy
- `cleanVIN()` - Remove non-alphanumeric characters
- `VINMaskOptions` type

#### NPWP Module

- `cleanNPWP()` - Remove non-digit characters
- `isNIKBasedNPWP()` - Check if 16-digit NIK-based NPWP

#### Main Export Additions

Added missing barrel exports:

- NIK: `cleanNIK`, `validateNIKDetailed`, `compareNIK`, `isAdult`
- Phone: `normalizePhoneNumber`, `comparePhones`, `getLandlineRegion`
- Currency: `splitAmount`, `percentageOf`, `difference`

### Fixed

- `InvalidSplitError` - Added `readonly code` property and default message (was missing, inconsistent with other error classes)

---

## [0.7.0] - 2026-04-06

### Added

#### Error Classes

New custom error classes with `code` property for programmatic error handling:

- `InvalidPhoneError` - Error for invalid phone numbers
- `InvalidNPWPError` - Error for invalid NPWP
- `InvalidEmailError` - Error for invalid email addresses
- `InvalidPlateError` - Error for invalid vehicle plates
- `InvalidVINError` - Error for invalid VINs

#### Parse Functions

- `parseVIN()` - Extract VIN components (WMI, VDS, check digit, model year, plant code, serial number)
- `parsePlate()` - Extract plate components (prefix, number, suffix, type, formatted)

### Changed

#### Mask Options (Breaking Change with Deprecation)

Standardized mask option names across all modules:

| Old Name | New Name       |
| -------- | -------------- |
| `start`  | `visibleStart` |
| `end`    | `visibleEnd`   |
| `char`   | `maskChar`     |

**Migration:** Old names still work but emit deprecation warnings. Will be removed in v1.0.0.

#### NIK Module

- `maskNIK()` - Now uses standardized `visibleStart`, `visibleEnd`, `maskChar` options

#### Phone Module

- `maskPhoneNumber()` - Now uses standardized `visibleStart`, `visibleEnd`, `maskChar` options

#### Text Module

- `maskText()` - Now uses standardized `visibleStart`, `visibleEnd`, `maskChar` options, added `separator` support

## [0.6.0] - 2026-04-06

### Added

#### NIK Module

- `cleanNIK()`: Normalize NIK input by stripping separators (`.`, `-`, ` `)
- `compareNIK()`: Check if two NIKs belong to the same person
- `isAdult()`: Check KTP eligibility (17 years default, configurable)
- `validateNIKDetailed()`: Structured validation result with error codes and messages
- `NIKValidationResult`, `NIKValidationError`, `NIKErrorCode` types
- `Age` and `GetAgeOptions` types

### Changed

#### NIK Module (Breaking Change)

- `getAge()` now returns `{ years, months, days }` object instead of `number`
  - Use `{ asString: true }` option for formatted output ("35 Tahun 2 Bulan 6 Hari")
  - Use `age.years` for year comparison
- `formatBirthDate()` now uses internal formatting (consistent with datetime module)

### Documentation

- Updated NIK docs with all new functions
- Added Type Reference for new types
- Updated Quick Start examples

## [0.5.0] - 2026-04-06

### Changed

#### Phone Module

- `generateWALink()` and `generateSmsLink()` now reject landlines (breaking change)
  - WhatsApp and SMS only work on mobile numbers
  - Landline numbers now return empty string `''`
  - Use `generateTelLink()` for landline phone calls

### Fixed

#### Phone Module

- `comparePhones()` now properly compares using E.164 format for accurate comparison
- `getLandlineRegion()` now uses shared `normalizePhoneNumber()` utility (removed code duplication)

### Internal

- Removed internal `normalizeToNational` helper (now uses `normalizePhoneNumber`)

## [0.4.2] - 2026-04-06

### Changed

#### NIK Module Code Quality

- Extracted shared date validation logic to `utils/date.ts` (DRY principle)
- Added `InvalidNIKError` custom error class for consistent error handling with datetime module
- Cached regex pattern in `validateNIK()` and `parseNIK()` for ~10% performance improvement

### Fixed

- `parseNIK()` now properly validates calendar dates (e.g., Feb 30, Feb 31 returned incorrect results)

### Documentation

- Removed `sanitizeNIK()` from best practices section (function not exported)

## [0.4.1] - 2026-04-06

### Added

#### Phone Module Enhancements

- `normalizePhoneNumber()` - New utility to normalize phone numbers to national format (08xx)
- `comparePhones()` - Compare two phone numbers regardless of format
- `getLandlineRegion()` - Get region name from landline area code

### Fixed

- `isMobileNumber()` - Fixed 620 prefix edge case bug (was treating invalid 620xxx as valid)
- Removed code duplication in `format.ts` and `parse.ts` (single source of truth in `utils.ts`)

### Changed

- `getOperator()` - Return type now properly typed as `OperatorName | null`
- Constants now use `as const` for better type safety
- `OPERATOR_PREFIXES` values typed as `OperatorName` union type

### Documentation

- Added `@public` JSDoc tags to `generateWALink`, `generateSmsLink`, `generateTelLink`
- Updated module documentation with new function examples

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
