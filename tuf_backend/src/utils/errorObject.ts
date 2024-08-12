interface CustomError extends Error {
  statusCode?: number;
}

const errorHandling = (message?: string, name?: string, statusCode?: number): CustomError => {
  const error: CustomError = new Error();
  error.message = message ?? 'Something went wrong';
  error.name = name ?? '';
  error.statusCode = statusCode;
  return error;
};

export default errorHandling;
