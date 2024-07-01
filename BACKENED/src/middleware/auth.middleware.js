import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verify_jwt = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers['Authorization']?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "Unauthorized request: No token provided");
        }
        // Assuming you have a secret key for JWT verification
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userID = decoded._id;
        next();
    } catch (error) {
        throw new ApiError(401, "Unauthorized request", error);
    }
});
