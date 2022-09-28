class ErrorBadRequest extends Error {
  constructor(message = 'Плохой запрос') {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = ErrorBadRequest;
