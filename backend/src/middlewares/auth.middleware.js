import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { asynchandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/Apierror.js";

const verifyJwt = asynchandler(async function (req, res, next) {
  
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Access token not found");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(403, "Invalid or expired access token");
  }

  const user = await User.findById(decodedToken._id);
  if (!user) {
    throw new ApiError(404, "User not found from token");
  }

  req.user = user;
  next();
});

export { verifyJwt };