import { ExpectsAsync } from './expectsAsync.js';
import { ExpectsAwaitable } from './expectsAwaitable.js';

export class Expects<T> extends ExpectsAwaitable<T> {
  constructor(value: T) {
    super(value);
  }

  get resolves(): ExpectsAsync<T> {
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

  protected _toBe(expected: any): void {
    this._valueToBe(this._value, expected);
  }
}
