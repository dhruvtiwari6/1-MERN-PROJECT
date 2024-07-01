import { User } from "../model/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const generateAccessandRefreshToken = async (userId) => {
            const newUser = await User.findById(userId);

            if (!newUser) {
                throw new Error('User not found');
            }
  

            if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
                throw new ApiError(500, 'Token secrets are not set');
            }

            const accessToken = newUser.generateAccessToken()
            const refreshToken = newUser.generateRefreshToken()


            newUser.refreshToken = refreshToken
            await newUser.save({validateBeforeSave : false});

            return {accessToken , refreshToken};

        
        
        }

const loginHandler = asyncHandler( async(req ,res) => {
    const {email, Password} = req.body;
    console.log("body : ", req.body)        // check whether getting information



    if([email , Password].some(field => field?.trim() === "")) {
        throw new ApiError(400 , "all fields are required")
    }


    const newUser = await User.findOne({email});                  // search out its function like $or
    console.log(newUser);


    if(!newUser){
        throw new ApiError(401 , "either email or password is incorrect")
    }

    const isPasswordValid = await newUser.isPasswordCorrect(Password);

    if(!isPasswordValid) {
        throw new ApiError(401 , "invalid user credential")
    }

    const {accessToken , refreshToken} = await generateAccessandRefreshToken(newUser._id);
    console.log("accessToken: ", accessToken);


    //for sending cookies we have to design options

    const options = {
        httpOnly : true,
        secure: true,
    }

    const LoggedInUser = await User.findOne(newUser._id).select("-password");
    return res
    .status(200)
    .cookie("accessToken" , accessToken , options)
    .cookie("refreshToken" ,refreshToken, options)
    .json(
        new ApiResponse(200 , LoggedInUser , "User logged in successfully")
    )

    
})

const registerHandle = asyncHandler( async(req, res) => {
    const {username ,email ,Password} = req.body;
    
    if([username , email, Password].some(field => field?.trim() === "")) {
        throw new ApiError(400 , "All field are required")
    }

    const ExistedUser =await User.findOne({
        $or : [{username} , {email}]
})

   if(ExistedUser) {
    throw new ApiError(400 , "user already exists")
   }

   const newUser = await User.create({
      email,
      username,
      Password,
})

   if(!newUser) {
    throw new ApiError(500 , "something went wrong while registering the user ")
 }
 
 return res.status(201).json(
      new ApiResponse(200, newUser , "user registered successfully")
 )
    
})

export {
        loginHandler ,
        registerHandle
      }