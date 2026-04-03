# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2026-01-06

### Added

- **NIK Module Improvements**:
  - Added `getAge` to calculate age from NIK.
  - Added `formatBirthDate` for localized birth date formatting.
  - Added `isValidForGender` and `isValidForBirthDate` for detailed NIK verification.
- **Phone Module Improvements**:
  - Added link generation utilities: `generateWALink`, `generateSmsLink`, and `generateTelLink`.
  - Added `isProvider` utility for detecting mobile operators.
- **Currency Module Improvements**:
  - Added `formatAccounting` for financial formatting.
  - Added `calculateTax` for tax calculations.
  - Added `addRupiahSymbol` helper.
- **Text Module Improvements**:
  - Added `profanityFilter` with Indonesian/English support.
  - Added `removeStopwords` for text processing.
  - Added `toFormal` and `isAlay` for Indonesian text normalization.
- **NPWP Module**: New module for validating, formatting, and masking Indonesian Tax Identity Numbers.
- **Plate Module**: New module for validating and detecting regions from Indonesian Vehicle License Plates.

### Changed

- Centralized Prettier configuration to the root directory.
- Fixed MDX build issues by removing automatic `@format` pragmas.

### Fixed

- Improved `isAlay` detection accuracy.
- Enhanced NPWP masking to preserve formatting.
- Fixed duplicate exports in the main toolkit entry point.
