import { ExpectsAsync } from './expectsAsync.js';
import { ExpectsAwaitable } from './expectsAwaitable.js';

export class Expects<T> extends ExpectsAwaitable<T> {
  constructor(value: T) {
    super(value);
  }

  get resolves(): ExpectsAsync<T> {
    return new ExpectsAsync(this._value);
  }

  get rejects(): ExpectsAsync<T> {
    return new ExpectsAsync(this._value);
  }

  toBe(value: T): void {
    return this._toBe(value);
  }

  toBeFalsy(): void {
    this._valueToBe(!!this._value, false);
  }

  toBeTruthy(): void {
    this._valueToBe(!!this._value, true);
  }

  toBeDefined(): void {
    try {
      this.not._toBe(undefined);
    } finally {
      this._invert();
    }
  }

  toBeUndefined(): void {
    super.toBeUndefined();
  }

  toBeNull(): void {
    super.toBeNull();
  }

  toBeNaN(): void {
    super.toBeNaN();
  }

  toSatisfy(fn: (value: T) => boolean): void {
    this._valueToBe(fn(this._value), true);
  }

  toThrowError(expected?: string | RegExp | Error): void {
    if (typeof this._value !== 'function') {
      if (this._inverted) {
        return;
      }

      throw new Error(
        `${this._value} is not a function. You must provide a function argument to 'toThrowError'.`,
      );
    }

    try {
      this._value();
    } catch (e: any) {
      return this._catchThrownError(e, expected);
    }

    if (!this._inverted) {
      throw new Error('Function was expected to throw, but did not.');
    }
  }

  protected _toBe(expected: any): void {
    this._valueToBe(this._value, expected);
  }
}
