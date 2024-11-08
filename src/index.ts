import { Expects } from './expects.js';

function expects<T>(value: T): Expects<T> {
  return new Expects(value);
}

export { expects };
