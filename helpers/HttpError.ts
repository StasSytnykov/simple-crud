const messageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

export const HttpError = (status: number, message = messageList[status]) => {
  const error: any = new Error(message);
  error.status = status;
  return error;
};
