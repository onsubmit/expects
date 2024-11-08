export class Expects<T> {
  private _value: T;

  constructor(value: T) {
    this._value = value;
  }

  toBe = (value: T): void => {
    if (!Object.is(this._value, value)) {
      throw new Error(`Expected: ${this._value}. Actual: ${value}`);
    }
  };
}
