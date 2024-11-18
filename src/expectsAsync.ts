import { AwaitedArray, AwaitedObjLength, ExpectsAwaitable } from './expectsAwaitable.js';

export class ExpectsAsync<T> extends ExpectsAwaitable<T> {
  constructor(value: T) {
    super(value);
  }

  async toBe(value: Awaited<T>): Promise<void> {
    return this._toBe(value);
  }

  async toBeFalsy(): Promise<void> {
    this._valueToBe(!!(await this._value), false);
  }

  async toBeTruthy(): Promise<void> {
    this._valueToBe(!!(await this._value), true);
  }

  async toBeDefined(): Promise<void> {
    try {
      await this.not._toBe(undefined);
    } finally {
      this._invert();
    }
  }

  async toBeUndefined(): Promise<void> {
    super.toBeUndefined();
  }

  async toBeNull(): Promise<void> {
    super.toBeNull();
  }

  async toBeNaN(): Promise<void> {
    super.toBeNaN();
  }

  async toSatisfy(fn: (value: Awaited<T>) => boolean): Promise<void> {
    this._valueToBe(fn(await this._value), true);
  }

  async toContain(value: AwaitedArray<T, string>): Promise<void> {
    this._toContain(await this._value, value);
  }

  async toHaveLength(expected: AwaitedObjLength<T>): Promise<void> {
    this._toHaveLength(await this._value, expected);
  }

  async toThrowError(expected?: string | RegExp | Error): Promise<void> {
    try {
      const promise = typeof this._value === 'function' ? this._value() : this._value;
      await promise;
    } catch (e: any) {
      return this._catchThrownError(e, expected);
    }

    if (!this._inverted) {
      throw new Error('Function was expected to throw, but did not.');
    }
  }

  protected async _toBe(expected: any): Promise<void> {
    const actual = await this._value;
    return this._valueToBe(actual, expected);
  }
}
