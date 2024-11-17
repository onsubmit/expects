import { Evaluator } from './evaluator.js';

type Awaitable<T> = T | PromiseLike<T>;

export abstract class ExpectsAwaitable<T> {
  protected _value: T;
  protected _evaluator: Evaluator;

  constructor(value: T) {
    this._value = value;
    this._evaluator = new Evaluator();
  }

  get not(): this {
    return this._invert();
  }

  protected abstract _toBe(expected: any): Awaitable<void>;

  abstract toBe(value: T): Awaitable<void>;
  abstract toBeFalsy(): Awaitable<void>;
  abstract toBeTruthy(): Awaitable<void>;
  abstract toBeDefined(): Awaitable<void>;
  abstract toSatisfy(fn: (value: T) => boolean): Awaitable<void>;

  protected toBeUndefined(): Awaitable<void> {
    this._toBe(undefined);
  }

  protected toBeNull(): Awaitable<void> {
    this._toBe(null);
  }

  protected toBeNaN(): Awaitable<void> {
    this._toBe(NaN);
  }

  protected _invert = (): this => {
    this._evaluator.invert();
    return this;
  };

  protected _valueToBe = (actual: any, expected: any): Awaitable<void> => {
    if (this._evaluator.evaluate(!Object.is(actual, expected))) {
      // TODO: improve error messages for non-primitives.
      throw new Error(
        `Expected:${this._evaluator.inverted ? ' <not>' : ''} ${expected}. Actual: ${actual}`,
      );
    }
  };
}
