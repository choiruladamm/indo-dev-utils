import { describe, it, expect } from 'vitest';
import { InvalidNPWPError } from '../errors';

describe('InvalidNPWPError', () => {
  describe('instantiation', () => {
    it('should have code equal to INVALID_NPWP', () => {
      const error = new InvalidNPWPError();
      expect(error.code).toBe('INVALID_NPWP');
    });
  });

  describe('default message', () => {
    it('should have default message', () => {
      const error = new InvalidNPWPError();
      expect(error.message).toBe('Invalid NPWP provided');
    });
  });

  describe('custom message', () => {
    it('should accept custom message', () => {
      const error = new InvalidNPWPError('Custom error message');
      expect(error.message).toBe('Custom error message');
    });
  });

  describe('instanceof checks', () => {
    it('should be instance of Error', () => {
      const error = new InvalidNPWPError();
      expect(error instanceof Error).toBe(true);
    });

    it('should be instance of InvalidNPWPError', () => {
      const error = new InvalidNPWPError();
      expect(error instanceof InvalidNPWPError).toBe(true);
    });
  });

  describe('name property', () => {
    it('should have name equal to InvalidNPWPError', () => {
      const error = new InvalidNPWPError();
      expect(error.name).toBe('InvalidNPWPError');
    });
  });
});
