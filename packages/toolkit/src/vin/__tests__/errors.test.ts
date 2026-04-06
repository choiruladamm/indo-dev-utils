import { describe, it, expect } from 'vitest';
import { InvalidVINError } from '../errors';

describe('InvalidVINError', () => {
  describe('instantiation', () => {
    it('should have code equal to INVALID_VIN', () => {
      const error = new InvalidVINError();
      expect(error.code).toBe('INVALID_VIN');
    });
  });

  describe('default message', () => {
    it('should have default message', () => {
      const error = new InvalidVINError();
      expect(error.message).toBe('Invalid VIN provided');
    });
  });

  describe('custom message', () => {
    it('should accept custom message', () => {
      const error = new InvalidVINError('Custom error message');
      expect(error.message).toBe('Custom error message');
    });
  });

  describe('instanceof checks', () => {
    it('should be instance of Error', () => {
      const error = new InvalidVINError();
      expect(error instanceof Error).toBe(true);
    });

    it('should be instance of InvalidVINError', () => {
      const error = new InvalidVINError();
      expect(error instanceof InvalidVINError).toBe(true);
    });
  });

  describe('name property', () => {
    it('should have name equal to InvalidVINError', () => {
      const error = new InvalidVINError();
      expect(error.name).toBe('InvalidVINError');
    });
  });
});
