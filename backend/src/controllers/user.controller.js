import { asynchandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/Apierror.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import { deleteFronCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiresponse.js";
import jwt from "jsonwebtoken";

const generateRefreshAndAccessToken = async function (userId) {
  if (!userId) {
    throw new ApiError(404, "UserId not found");
  }
  let user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  let accessToken = user.generateAccessToken();
  if (!accessToken) {
    throw new ApiError(409, "access token not generated");
  }
  let refreshToken = user.generateRefreshToken();
  if (!refreshToken) {
    throw new ApiError(409, "refresh token not generated");
  }
  user.accessToken = accessToken;
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const registerUser = asynchandler(async (req, res) => {
  console.log("yeah");

  const { userName, password, email } = req.body;
  let isEmpty = [userName, password, email].some(
    (field) => field?.trim() === ""
  );
  if (isEmpty) {
    throw new ApiError(409, "all fields required");
  }
  const userPresent = await User.findOne({
    $or: [{ userName }, { email }],
  });
  if (userPresent) {
    throw new ApiError(504, "user is already present");
  }
  let avatarFilepath = req.file.path;
  console.log(avatarFilepath);
  if (req.file) console.log(`recieved ${avatarFilepath}`);

  if (!avatarFilepath) {
    throw new ApiError(400, "Avatar file is required");
  }

  let avatar;
  try {
    avatar = await uploadOnCloudinary(avatarFilepath);
  } catch (error) {
    throw new ApiError(
      400,
      `Avatar file not found on cloud ${avatarFilepath}${error}`
    );
  }

  let newUser;
  try {
    newUser = await User.create({
      userName,

      password,
      email,
      avatar: avatar.url,
    });
  } catch (error) {
    if (avatar?.public_id) {
      deleteFronCloudinary(avatar.public_id);
    }

    throw new ApiError(404, `error creating new user ${error}`);
  }
  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});
const loginUser = asynchandler(async function (req, res) {
  const { password, email } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "cant leave the email or password empty");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "not able to find the user");
  }
  let passwordvalidate = await user.isPasswordCorrect(password);
  if (!passwordvalidate) {
    throw new ApiError(409, "wrong password");
  }
  let { accessToken, refreshToken } = await generateRefreshAndAccessToken(
    user._id
  );
  let loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
});
const refreshAccessToken = asynchandler(async function (req, res) {
  let oldRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;
  if (!oldRefreshToken) {
    throw new ApiError(404, "refresh token not found");
  }
  let user;
  try {
    let decodedToken = jwt.verify(
      oldRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    user = await User.findById(decodedToken?._id);
  } catch (error) {
    throw new ApiError(404, "unable to decode refresh token");
  }
  if (!user) {
    throw new ApiError(403, "user not found from token id");
  }
  if (oldRefreshToken !== user?.refreshToken) {
    throw new ApiError(409, "refresh token used or expired");
  }
  const options = {
    httpOnly: true,
    secure: true,
  };
  const { accessToken, refreshToken } = await generateRefreshAndAccessToken(
    user._id
  );
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { accessToken, refreshToken }, "access token"));
});
const userLogOut = asynchandler(async function (req, res) {
  let user = req.user;
  await User.findByIdAndUpdate(
    user._id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(201)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

//accesing user by auth middleware
const changePassword = asynchandler(async function (req, res) {
  let user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  let { oldPassword, newPassword } = req.body;
  let validatePass = await user.isPasswordCorrect(oldPassword);
  if (!validatePass) {
    throw new ApiError(409, "wrong old password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  //always use save command to run the prehook in DB!!
  //other can use findandupdate but not in password
  return res.status(200).json(new ApiResponse(200, {}, "password changed "));
});

const getCurrentUser = asynchandler(async function (req, res) {
  let user = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res.status(200).json(new ApiResponse(200, user, "user here it is "));
});

const changeAccountDetails = asynchandler(async function (req, res) {
  let { userName } = req.body;
  if (!userName) {
    throw new ApiError(403, "All fields are required");
  }
  let user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { userName },
    },
    { new: true }
  ).select("-password");
  if (!user) {
    throw new ApiError(404, "user not find");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "updated successfully"));
});

const changeAvatar = asynchandler(async function (req, res) {
  let avatarLocalPath = await req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(404, "Avatar local path not found");
  }

  let avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar?.url) {
    throw new ApiError(404, "Avatar url not found");
  }
  let user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { avatar: avatar.url },
    },
    { new: true }
  ).select("-password");
  return res.status(200).json(new ApiResponse(200, user, "updated avatar"));
});

export {
  registerUser,
  loginUser,
  refreshAccessToken,
  userLogOut,
  changePassword,
  changeAvatar,
  changeAccountDetails,
  getCurrentUser,
};
