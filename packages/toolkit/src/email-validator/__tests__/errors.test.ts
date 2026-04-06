import { describe, it, expect } from 'vitest';
import { InvalidEmailError } from '../errors';

describe('InvalidEmailError', () => {
  describe('instantiation', () => {
    it('should have code equal to INVALID_EMAIL', () => {
      const error = new InvalidEmailError();
      expect(error.code).toBe('INVALID_EMAIL');
    });
  });

  describe('default message', () => {
    it('should have default message', () => {
      const error = new InvalidEmailError();
      expect(error.message).toBe('Invalid email provided');
    });
  });

  describe('custom message', () => {
    it('should accept custom message', () => {
      const error = new InvalidEmailError('Custom error message');
      expect(error.message).toBe('Custom error message');
    });
  });

  describe('instanceof checks', () => {
    it('should be instance of Error', () => {
      const error = new InvalidEmailError();
      expect(error instanceof Error).toBe(true);
    });

    it('should be instance of InvalidEmailError', () => {
      const error = new InvalidEmailError();
      expect(error instanceof InvalidEmailError).toBe(true);
    });
  });

  describe('name property', () => {
    it('should have name equal to InvalidEmailError', () => {
      const error = new InvalidEmailError();
      expect(error.name).toBe('InvalidEmailError');
    });
  });
});
