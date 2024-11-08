export class Evaluator {
  private _inverted: boolean;

  constructor() {
    this._inverted = false;
  }

  invert = (): void => {
    this._inverted = !this._inverted;
  };

  evaluate = (condition: boolean) => (this._inverted ? !condition : condition);
}