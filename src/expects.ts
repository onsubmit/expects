import { Evaluator } from './evaluator.js';

export class Expects<T> {
  private _value: T;
  private _evaluator: Evaluator;

  constructor(value: T) {
    this._value = value;
    this._evaluator = new Evaluator();
  }

  get not(): this {
    return this._invert();
  }

  toBe = (value: T): void => {
    this._toBe(value);
  };

  toBeDefined = (): void => {
    try {
      this.not._toBe(undefined);
    } finally {
      this._invert();
    }
  };

  private _invert = (): this => {
    this._evaluator.invert();
    return this;
  };

  private _toBe = (value: T | undefined): void => {
    if (this._evaluator.evaluate(!Object.is(this._value, value))) {
      // TODO: improve error messages for non-primitives.
      throw new Error(`Expected: ${value}. Actual: ${this._value}`);
    }
  };
}
