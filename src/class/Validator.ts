export default class Validator {
  static isValidDateString(dateString: string): void {
    const date = new Date(dateString);

    if (date.toString().toLowerCase() === 'invalid date') throw new Error('Invalid date supplied');
  }
}