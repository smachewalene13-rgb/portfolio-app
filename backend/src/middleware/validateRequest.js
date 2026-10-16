import { ApiError } from "../utils/ApiError.js";

export function validateRequest(validatorFn) {
  return (req, res, next) => {
    try {
      const error = validatorFn(req.body);
      if (error) {
        return next(ApiError.badRequest(error));
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}

export default validateRequest;
