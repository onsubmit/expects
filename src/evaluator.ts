export class Evaluator {
  private _inverted: boolean;

  constructor() {
    this._inverted = false;
  }

  invert = (): void => {
    this._inverted = !this._inverted;
  };

  get inverted(): boolean {
    return this._inverted;
  }

  evaluate = (condition: any) => (this._inverted ? !condition : !!condition);
}
