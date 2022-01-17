import CustomError, { errorSeverityType } from './CustomError';

class ServerConfigError extends CustomError {
  constructor(
    message: string,
    cause = 'Missing config option in .env file.',
    fixable = true,
    severity: errorSeverityType = 'high',
  ) {
    super(message, cause, fixable, severity);
  }
}

export default ServerConfigError;
