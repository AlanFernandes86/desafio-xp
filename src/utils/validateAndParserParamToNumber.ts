import HttpError from '../shared/HttpError';

const validateAndParserParamToInt = (
  param: string,
  errorMessage: string,
): number => {
  const int = Number.parseInt(param, 10);

  if (Number.isNaN(int)) {
    throw new HttpError(400, errorMessage);
  }

  return int;
};

export default validateAndParserParamToInt;
