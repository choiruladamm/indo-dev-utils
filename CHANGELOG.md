# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-12-10

### Added

#### NIK Module
- `validateNIK()` - Validate Indonesian National Identity Number
- `parseNIK()` - Extract province, birth date, and gender information
- `formatNIK()` - Format NIK with separators
- `maskNIK()` - Mask NIK for privacy protection

#### Phone Module
- `validatePhoneNumber()` - Validate Indonesian phone numbers
- `formatPhoneNumber()` - Format to international/national/e164 formats
- `getOperator()` - Detect mobile operator (Telkomsel, XL, Indosat, Smartfren, Axis)
- `parsePhoneNumber()` - Extract all phone information
- Support for 200+ Indonesian area codes

#### Currency Module
- `formatRupiah()` - Format numbers as Rupiah currency
- `formatCompact()` - Compact format with proper Indonesian grammar (1,5 juta)
- `parseRupiah()` - Parse formatted strings back to numbers
- `toWords()` - Convert numbers to Indonesian words (terbilang)
- `roundToClean()` - Round to clean amounts (ribu, ratus-ribu, juta)

[0.1.0]: https://github.com/yourusername/indo-dev-utils/releases/tag/v0.1.0