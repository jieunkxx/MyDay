const errorGenerator = ({ statusCode, message }) => {
  const error: { statusCode?: number; message: string } = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

export default errorGenerator;
