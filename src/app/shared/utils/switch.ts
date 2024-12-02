export class Switch {
  private _isOpened: boolean;

  get isOpened(): boolean {
    return this._isOpened;
  }

  constructor(initial: boolean = false) {
    this._isOpened = initial;
  }

  open = () => (this._isOpened = true);
  close = () => (this._isOpened = false);
  toggle = () => (this._isOpened = !this._isOpened);
}
