class CustomAPIError extends Error {
  constructor(messgae, statusCode) {
    super(messgae);
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};

module.exports = {
  CustomAPIError,
  createCustomError,
};
