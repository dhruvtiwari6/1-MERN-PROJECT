import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema(
    {
        otp: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        isVerified: {
            type: Boolean,
            default: false
        },

        createdAt: {
            type: Date,
            default: Date.now,
            expires: 3600 
        }
    },
    {
        timestamps: true
    }
);

export const otp = mongoose.model("OTP", otpSchema);
