# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/choiruladamm/indo-dev-utils/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/choiruladamm/indo-dev-utils/releases/tag/v0.1.0