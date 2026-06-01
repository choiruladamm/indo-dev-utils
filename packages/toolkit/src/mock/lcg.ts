export interface LCGInstance {
  /** Returns next raw integer in [0, 2^32 - 1] */
  next(): number;
  /** Returns float in [0, 1) */
  nextFloat(): number;
  /** Returns integer in [0, max) */
  nextInt(max: number): number;
  /** Returns a random element from array */
  nextElement<T>(arr: readonly T[]): T;
  /** Returns random integer in [min, max] inclusive */
  nextRange(min: number, max: number): number;
  /** Returns a string of n random digits */
  nextDigits(n: number): string;
}

export function createLCG(seed: number = Date.now()): LCGInstance {
  // Ensure unsigned 32-bit integer, avoid 0 state
  let state = (Math.abs(Math.floor(seed)) >>> 0) || 1;

  const instance: LCGInstance = {
    next(): number {
      state = (Math.imul(1664525, state) + 1013904223) >>> 0;
      return state;
    },

    nextFloat(): number {
      return this.next() / 0x100000000;
    },

    nextInt(max: number): number {
      return Math.floor(this.nextFloat() * max);
    },

    nextElement<T>(arr: readonly T[]): T {
      return arr[this.nextInt(arr.length)];
    },

    nextRange(min: number, max: number): number {
      return min + this.nextInt(max - min + 1);
    },

    nextDigits(n: number): string {
      let result = '';
      for (let i = 0; i < n; i++) {
        result += this.nextInt(10).toString();
      }
      return result;
    },
  };

  return instance;
}
