export class AppError extends Error {
	constructor(msg) {
		super(msg || 'AppError');
	}
}

// #region HttpError

export class HttpError extends AppError {
	constructor(msg) {
		super(msg || 'HttpError');
	}
}
export class HttpNetworkError extends HttpError {
	constructor(msg) {
		super(msg || 'HttpNetworkError');
	}
}
export class HttpTimeoutError extends HttpNetworkError {
	constructor(msg) {
		super(msg || 'HttpTimeoutError');
	}
}
export class HttpStatusError extends HttpError {
	constructor(statusCode, responseBody) {
		super(`${statusCode}: ${JSON.stringify(responseBody, undefined, 2)}`);

		this.statusCode = statusCode;
		this.responseBody = responseBody;
	}
}

// #endregion
