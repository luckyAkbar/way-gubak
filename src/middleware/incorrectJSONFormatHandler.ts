import assert from 'assert';
import {
  Request, Response, NextFunction, Errback,
} from 'express';

const incorrectJSONFormatHandler = (err: Errback, req: Request, res: Response, next: NextFunction): void => {
  try {
    assert.strictEqual(err, undefined);

    next();
  } catch (e) {
    res.status(400).json({ message: 'You have incorrect JSON format body sent. Please fix it first' });
  }
};

export default incorrectJSONFormatHandler;
