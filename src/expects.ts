import { Evaluator } from './evaluator.js';

export class Expects<T> {
  private _value: T;
  private _evaluator: Evaluator;

  constructor(value: T) {
    this._value = value;
    this._evaluator = new Evaluator();
  }

  get not(): this {
    this._evaluator.invert();
    return this;
  }

  toBe = (value: T): void => {
    if (this._evaluator.evaluate(!Object.is(this._value, value))) {
      throw new Error(`Expected: ${this._value}. Actual: ${value}`);
    }
  };
}
