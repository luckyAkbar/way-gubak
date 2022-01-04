import errorLogWriteStream from '../util/errorLogWriteStream';

export type errorSeverityType = 'low' | 'moderate' | 'high';
export interface ErrorClassStructure {
  message: string,
  cause?: string,
  fixable?: boolean,
  severity?: errorSeverityType,
  logError(): Promise<void>,
}

export default class CustomError extends Error implements ErrorClassStructure {
  severity: errorSeverityType;

  fixable: boolean;

  cause: string;

  constructor(
    message = 'Unhandled Error Thrown',
    cause = '-',
    fixable = true,
    severity: errorSeverityType = 'low',
  ) {
    super(message);

    this.severity = severity;
    this.fixable = fixable;
    this.cause = cause;
  }

  async logError(): Promise<void> {
    try {
      const errorComponent: string[] = [
        '\n\n\x1b[31mNew Error Log\x1b[0m',
        new Date().toString(),
        this.message,
        this.severity,
        this.cause,
        `${this.fixable}`,
      ];

      await errorLogWriteStream(errorComponent);
    } catch (e: unknown) {
      process.stdout.write(`Error Logging failed ${e}`);
    }
  }
}
