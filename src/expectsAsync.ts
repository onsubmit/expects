import { ExpectsAwaitable } from './expectsAwaitable.js';

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

  protected async _toBe(expected: any): Promise<void> {
    const actual = await this._value;
    return this._valueToBe(actual, expected);
  }
}
