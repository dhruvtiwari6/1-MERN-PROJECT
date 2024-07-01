import mongoose , {Schema}from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import ApiError from '../utils/ApiError.js';


const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    Password: {
        type: String,
        required: [true, 'password is required'],
    },
    avatar: {
        type: String,
        required: false // change to true after adding functionality
    },

   
     refreshToken : {
        type:String
    }
    
}, {
    timestamps: true
});

UserSchema.pre("save", async function(next) {
    if (!this.isModified("Password")) return next();

    try {
        this.Password = await bcrypt.hash(this.Password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.isPasswordCorrect = async function(Password) {
    try {
        return await bcrypt.compare(Password, this.Password);
    } catch (error) {
        return false;
    }
};

UserSchema.methods.generateAccessToken =  function() {
    try {
      return jwt.sign(
          {
              _id: this._id,
              email: this.email,
              username: this.username,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
              expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
          }
      );
    } catch (error) {
      throw new ApiError(500, "Error in generating access token");
    }
 }
 
 UserSchema.methods.generateRefreshToken = function() {
     try {
         return jwt.sign(
             {
                 _id: this._id,
             },
             process.env.REFRESH_TOKEN_SECRET,
             {
                 expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
             }
         );
     } catch (error) {
         throw new ApiError(500, "Error in generating refresh token");
     }
 }
 




export const User = mongoose.model("User", UserSchema);

