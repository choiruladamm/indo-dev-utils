import { describe, it, expect } from 'vitest';
import { InvalidPhoneError } from '../errors';

describe('InvalidPhoneError', () => {
  describe('instantiation', () => {
    it('should have code equal to INVALID_PHONE', () => {
      const error = new InvalidPhoneError();
      expect(error.code).toBe('INVALID_PHONE');
    });
  });

  describe('default message', () => {
    it('should have default message', () => {
      const error = new InvalidPhoneError();
      expect(error.message).toBe('Invalid phone number provided');
    });
  });

  describe('custom message', () => {
    it('should accept custom message', () => {
      const error = new InvalidPhoneError('Custom error message');
      expect(error.message).toBe('Custom error message');
    });
  });

  describe('instanceof checks', () => {
    it('should be instance of Error', () => {
      const error = new InvalidPhoneError();
      expect(error instanceof Error).toBe(true);
    });

    it('should be instance of InvalidPhoneError', () => {
      const error = new InvalidPhoneError();
      expect(error instanceof InvalidPhoneError).toBe(true);
    });
  });

  describe('name property', () => {
    it('should have name equal to InvalidPhoneError', () => {
      const error = new InvalidPhoneError();
      expect(error.name).toBe('InvalidPhoneError');
    });
  });
});
