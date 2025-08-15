import { ApiError } from "../utils/Apierror.js";

export const checkIsAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    throw new ApiError(403, "Access denied. Admins only.");
  }
  next();
};