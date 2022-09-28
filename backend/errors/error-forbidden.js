class ErrorForbidden extends Error {
  constructor(message = 'Доступ запрещён') {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ErrorForbidden;
