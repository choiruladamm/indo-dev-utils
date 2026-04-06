import { describe, it, expect } from 'vitest';
import { InvalidPlateError } from '../errors';

describe('InvalidPlateError', () => {
  describe('instantiation', () => {
    it('should have code equal to INVALID_PLATE', () => {
      const error = new InvalidPlateError();
      expect(error.code).toBe('INVALID_PLATE');
    });
  });

  describe('default message', () => {
    it('should have default message', () => {
      const error = new InvalidPlateError();
      expect(error.message).toBe('Invalid plate provided');
    });
  });

  describe('custom message', () => {
    it('should accept custom message', () => {
      const error = new InvalidPlateError('Custom error message');
      expect(error.message).toBe('Custom error message');
    });
  });

  describe('instanceof checks', () => {
    it('should be instance of Error', () => {
      const error = new InvalidPlateError();
      expect(error instanceof Error).toBe(true);
    });

    it('should be instance of InvalidPlateError', () => {
      const error = new InvalidPlateError();
      expect(error instanceof InvalidPlateError).toBe(true);
    });
  });

  describe('name property', () => {
    it('should have name equal to InvalidPlateError', () => {
      const error = new InvalidPlateError();
      expect(error.name).toBe('InvalidPlateError');
    });
  });
});
