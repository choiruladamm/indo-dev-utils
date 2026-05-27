import { OPERATOR_PREFIXES } from '../phone/constants';

export const NIK_SCAN_PATTERN = /\b(\d{16})\b/g;
export const NPWP_SCAN_PATTERN = /\b(\d{2}\.\d{3}\.\d{3}[. -]?\d{1,2}[. -]?\d{3}(?:[. -]?\d{3})?)\b/g;
export const PHONE_SCAN_PATTERN = /(?:\+62|62|0)[2-9]\d{7,11}/g;
export const EMAIL_SCAN_PATTERN = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*/gi;
export const PASSPORT_SCAN_PATTERN = /\b([A-Z]{1,2}\d{6,8})\b/gi;
export const BPJS_SCAN_PATTERN = /(?:^|[^\d])(0{3}\d{8,11}|BPJS\d{9,13})(?![^\d])/gi;
export const BANK_ACCOUNT_SCAN_PATTERN = /\b(\d{7,16})\b/g;

export const VALID_PHONE_PREFIXES = Object.keys(OPERATOR_PREFIXES);
export const MAX_DEPTH = 10;
export const CIRCULAR_PLACEHOLDER = '[Circular]';
export const NIK_STRICT = /^\d{16}$/;
export const NPWP_STRICT = /^\d{2}\.\d{3}\.\d{3}\.\d{1}\.\d{3}$/;
export const PHONE_STRICT = /^(?:\+62|62|0)\d{9,12}$/;
