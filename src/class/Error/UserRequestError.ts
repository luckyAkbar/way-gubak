export default class UserRequestError extends Error {
  hint: string;
  HTTPErrorStatus: number = 400;

  constructor(message: string, hint: string, HTTPErrorStatus: number = 400) {
    super(message);

    this.hint = hint;
    this.HTTPErrorStatus = HTTPErrorStatus;
  }
}