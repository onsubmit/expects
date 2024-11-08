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

  toBeFalsy = (): void => {
    this._valueToBe(!!this._value, false);
  };

  toBeTruthy = (): void => {
    this._valueToBe(!!this._value, true);
  };

  toBeDefined = (): void => {
    try {
      this.not._toBe(undefined);
    } finally {
      this._invert();
    }
  };

  toBeUndefined = (): void => {
    this._toBe(undefined);
  };

  toBeNull = (): void => {
    this._toBe(null);
  };

  toBeNaN = (): void => {
    this._toBe(NaN);
  };

  private _invert = (): this => {
    this._evaluator.invert();
    return this;
  };

  private _toBe = (expected: any): void => {
    this._valueToBe(this._value, expected);
  };

  private _valueToBe = (actual: any, expected: any): void => {
    if (this._evaluator.evaluate(!Object.is(actual, expected))) {
      // TODO: improve error messages for non-primitives.
      throw new Error(
        `Expected:${this._evaluator.inverted ? ' <not>' : ''} ${expected}. Actual: ${actual}`,
      );
    }
  };
}
