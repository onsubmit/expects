import { Evaluator } from './evaluator.js';

type Awaitable<T> = T | PromiseLike<T>;
export type AwaitedArray<T, U = never> =
  T extends Array<infer R> ? R : T extends Promise<Array<infer R>> ? R : U;

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

  protected get _inverted(): boolean {
    return this._evaluator.inverted;
  }

  protected abstract _toBe(expected: any): Awaitable<void>;

  abstract toBe(value: T): Awaitable<void>;
  abstract toBeFalsy(): Awaitable<void>;
  abstract toBeTruthy(): Awaitable<void>;
  abstract toBeDefined(): Awaitable<void>;
  abstract toContain(value: AwaitedArray<T, string>): Awaitable<void>;
  abstract toSatisfy(fn: (value: T) => boolean): Awaitable<void>;
  abstract toThrowError(thrown?: string | RegExp | Error): Awaitable<void>;

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

  protected _catchThrownError(e: any, expected?: string | RegExp | Error): void {
    const message = e instanceof Error ? e.message : (e?.toString() ?? `Thrown error was ${e}`);
    if (expected === undefined) {
      if (this._inverted) {
        throw new Error(`Function was not expected to throw, but threw: ${message}`);
      }
    } else {
      if (expected instanceof Error) {
        this._stringToMatch(message, expected.message);
      } else {
        this._stringToMatch(message, expected);
      }
    }
  }

  protected _toContain(actual: T, value: AwaitedArray<T, string>): void {
    const categorize = () => {
      if (Array.isArray(actual)) {
        return {
          found: actual.includes(value),
          string: `[${actual.join(', ')}]`,
        };
      } else if (typeof actual === 'string' && typeof value === 'string') {
        return {
          found: actual.includes(value),
          string: actual,
        };
      }

      return 'invalid-types';
    };

    const category = categorize();
    if (category === 'invalid-types') {
      throw new Error('Both values must be strings or the actual value must be an array.');
    }

    const { found, string } = category;
    if (found && this._inverted) {
      throw new Error(`${value} was not expected to be contained by ${string}`);
    }

    if (!found && !this._inverted) {
      throw new Error(`${value} was expected to be contained by ${string}`);
    }
  }

  private get _not(): string {
    return `${this._inverted ? ' <not>' : ''}`;
  }

  protected _valueToBe = (actual: any, expected: any): Awaitable<void> => {
    if (this._evaluator.evaluate(!Object.is(actual, expected))) {
      // TODO: improve error messages for non-primitives.
      throw new Error(`Expected:${this._not} ${expected}. Actual: ${actual}`);
    }
  };

  protected _stringToMatch = (actual: string, expected: string | RegExp): Awaitable<void> => {
    if (
      this._evaluator.evaluate(
        expected instanceof RegExp ? !actual.match(expected) : !actual.includes(expected),
      )
    ) {
      throw new Error(`Expected "${actual}" to${this._not} match "${expected}"`);
    }
  };
}
