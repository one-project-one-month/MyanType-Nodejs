import { StatusCode } from "./StatusCode.js";

// Define types of known errors
export const errorKinds = {
  invalidToken: "invalidToken",
  internalServerError: "internalErrorServer",
  validationFailed: "validationFailed",
  invalidCredential: "invalidCredential",
  notFound: "notFound",
  notAuthorized: "notAuthorized",
  alreadyExist: "alreadyExist",
  forbidden: "forbidden",
  accessDenied: "accessDenied",
  unVerifyAccount: "unVerifyAccount",
  badRequest: "badRequest",
  oauthAccountAlreadyExist: "oauthAccountAlreadyExist",
  mailboxUnavailable: "mailboxUnavailable",
};

// Check if a value is a valid error kind
export const isErrorKinds = (message) => {
  return Object.values(errorKinds).includes(message);
};

// Custom error class
export class AppError extends Error {
  constructor(
    error = errorKinds.internalServerError,
    message = "Internal Server Error",
    payload = {}
  ) {
    super();
    this.error = error;
    this.message = message;
    this.payload = payload;
    this.statusCode = this.getStatus();

    Error.captureStackTrace(this, this.constructor);
  }

  // Create a new error instance
  static new(error, message, payload) {
    return new AppError(error, message, payload || {});
  }

  // Format payload for response
  errorPayload() {
    return {
      message: this.message,
      errors: this.payload || {},
    };
  }

  // Map error kind to status code
  getStatus() {
    switch (this.error) {
      case errorKinds.internalServerError:
        return StatusCode.InternalServerError;
      case errorKinds.invalidToken:
      case errorKinds.forbidden:
      case errorKinds.accessDenied:
      case errorKinds.unVerifyAccount:
        return StatusCode.Forbidden;
      case errorKinds.notFound:
        return StatusCode.NotFound;
      case errorKinds.notAuthorized:
        return StatusCode.Unauthorized;
      case errorKinds.validationFailed:
      case errorKinds.invalidCredential:
        return StatusCode.UnprocessableEntity;
      case errorKinds.alreadyExist:
      case errorKinds.oauthAccountAlreadyExist:
        return StatusCode.Conflict;
      case errorKinds.badRequest:
        return StatusCode.BadRequest;
      case errorKinds.mailboxUnavailable:
        return StatusCode.MailboxUnavailable;
      default:
        return StatusCode.InternalServerError;
    }
  }

  // Send formatted error as HTTP response
  response(res) {
    return res.status(this.statusCode).json(this.errorPayload()).end();
  }
}
