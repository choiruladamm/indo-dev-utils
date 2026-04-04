import { describe, it, expect } from 'vitest';
import { toCamelCase, toPascalCase, toSnakeCase } from '../case-converters';

describe('toCamelCase', () => {
  it('converts hyphenated text to camelCase', () => {
    expect(toCamelCase('hello-world')).toBe('helloWorld');
  });

  it('converts underscored text to camelCase', () => {
    expect(toCamelCase('hello_world')).toBe('helloWorld');
  });

  it('converts space-separated text to camelCase', () => {
    expect(toCamelCase('hello world')).toBe('helloWorld');
  });

  it('handles already camelCase text', () => {
    expect(toCamelCase('helloWorld')).toBe('helloWorld');
  });

  it('handles PascalCase input', () => {
    expect(toCamelCase('HelloWorld')).toBe('helloWorld');
  });

  it('handles mixed separators', () => {
    expect(toCamelCase('hello-world_test')).toBe('helloWorldTest');
  });

  it('strips special characters', () => {
    expect(toCamelCase('hello@world!')).toBe('helloworld');
  });

  it('handles empty string', () => {
    expect(toCamelCase('')).toBe('');
  });

  it('handles single word', () => {
    expect(toCamelCase('hello')).toBe('hello');
  });

  it('handles multiple spaces', () => {
    expect(toCamelCase('hello   world')).toBe('helloWorld');
  });

  it('handles numbers', () => {
    expect(toCamelCase('hello2world')).toBe('hello2world');
  });
});

describe('toPascalCase', () => {
  it('converts hyphenated text to PascalCase', () => {
    expect(toPascalCase('hello-world')).toBe('HelloWorld');
  });

  it('converts underscored text to PascalCase', () => {
    expect(toPascalCase('hello_world')).toBe('HelloWorld');
  });

  it('converts space-separated text to PascalCase', () => {
    expect(toPascalCase('hello world')).toBe('HelloWorld');
  });

  it('handles already PascalCase text', () => {
    expect(toPascalCase('HelloWorld')).toBe('HelloWorld');
  });

  it('handles camelCase input', () => {
    expect(toPascalCase('helloWorld')).toBe('HelloWorld');
  });

  it('handles mixed separators', () => {
    expect(toPascalCase('hello-world_test')).toBe('HelloWorldTest');
  });

  it('strips special characters', () => {
    expect(toPascalCase('hello@world!')).toBe('Helloworld');
  });

  it('handles empty string', () => {
    expect(toPascalCase('')).toBe('');
  });

  it('handles single word', () => {
    expect(toPascalCase('hello')).toBe('Hello');
  });

  it('handles multiple spaces', () => {
    expect(toPascalCase('hello   world')).toBe('HelloWorld');
  });
});

describe('toSnakeCase', () => {
  it('converts camelCase to snake_case', () => {
    expect(toSnakeCase('helloWorld')).toBe('hello_world');
  });

  it('converts PascalCase to snake_case', () => {
    expect(toSnakeCase('HelloWorld')).toBe('hello_world');
  });

  it('converts hyphenated text to snake_case', () => {
    expect(toSnakeCase('hello-world')).toBe('hello_world');
  });

  it('converts space-separated text to snake_case', () => {
    expect(toSnakeCase('hello world')).toBe('hello_world');
  });

  it('handles already snake_case text', () => {
    expect(toSnakeCase('hello_world')).toBe('hello_world');
  });

  it('handles mixed separators', () => {
    expect(toSnakeCase('hello-World_test')).toBe('hello_world_test');
  });

  it('strips special characters', () => {
    expect(toSnakeCase('hello@world!')).toBe('helloworld');
  });

  it('handles empty string', () => {
    expect(toSnakeCase('')).toBe('');
  });

  it('handles single word', () => {
    expect(toSnakeCase('hello')).toBe('hello');
  });

  it('handles multiple spaces', () => {
    expect(toSnakeCase('hello   world')).toBe('hello_world');
  });

  it('handles numbers', () => {
    expect(toSnakeCase('hello2World')).toBe('hello2_world');
  });
});
