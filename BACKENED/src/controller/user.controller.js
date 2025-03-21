import { User } from "../model/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import nodemailer from 'nodemailer';
import { otp } from "../model/otp.model.js";

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
    const {email, password} = req.body;
    console.log("body : ", req.body)        // check whether getting information


    if([email , password].some(field => field?.trim() === "")) {
        throw new ApiError(400 , "all fields are required")
    }


    const newUser = await User.findOne({email});                  // search out its function like $or
    console.log(newUser);


    if(!newUser){
        throw new ApiError(401 , "either email or password is incorrect")
    }


    const isPasswordValid = await newUser.isPasswordCorrect(password);
    console.log(isPasswordValid)

    if(!isPasswordValid) {
        throw new ApiError(401 , "invalid user credential")
    }

    const {accessToken , refreshToken} = await generateAccessandRefreshToken(newUser._id);
    console.log("accessToken: ", accessToken);
    console.log("refreshToken: ", refreshToken);



    //for sending cookies we have to design options

    const options = {
        httpOnly : true,
        secure: true,
        sameSite: 'None'
        }

    const LoggedInUser = await User.findOne(newUser._id).select("-Password");
    return res
    .status(200)
    .cookie("accessToken" , accessToken , options)
    .cookie("refreshToken" ,refreshToken, options)
    .json(
        new ApiResponse(200 , LoggedInUser , "User logged in successfully")
    )

    
})

const OTPCreation = asyncHandler( async(req, res) => {
    const {email} = req.body;


    const OTPexists = await otp.findOne({email});


    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: "dhurvtiwari6@gmail.com",
          pass: "qlss wryb eghu ijsc",
        },
      });
    
      
    if(OTPexists) {
        console.log("OTPexists: ", OTPexists);
        const OTP = OTPexists.otp;
        const sendmail = async () => {
            try {
              const info = await transporter.sendMail({
                from: '"Dhruv Tiwari" <dhurvtiwari6@gmail.com>', // sender address
                to: `${email}`, // list of receivers
                subject: "OTP verification", // Subject line
                text: `Your OTP is ${OTP}`, 
                html:`Your OTP is ${OTP}`, // html body
              });
          
              console.log("Message sent: %s", info.messageId);
            } catch (error) {
              console.error("Error sending email:", error);
            }
        };

        sendmail();
    } else {

    
      const OTP_new = Math.floor(Math.random() * 900000) + 100000;
      
      const sendmail = async () => {
        try {
          const info = await transporter.sendMail({
            from: '"Dhruv Tiwari" <dhurvtiwari6@gmail.com>', // sender address
            to: `${email}`, // list of receivers
            subject: "OTP verification", // Subject line
            text: `Your OTP is ${OTP_new}`, 
            html:`Your OTP is ${OTP_new}`, // html body
          });


          const otpCreated = await otp.create({
            otp : OTP_new,
            email,
        })
      
          console.log("Message sent: %s", info.messageId);
        } catch (error) {
          console.error("Error sending email:", error);
        }
      };
      
      sendmail();
    }

    return res.status(200).json(
        new ApiResponse(200 , {email} , "OTP sent successfully")
    )



})


const OTPVerification = asyncHandler(async (req, res, next) => {
    try {
        const { OTP, email } = req.body;
        console.log("OTP: ", OTP);
        console.log("req.bofy : " , req.body);
        
        if (!OTP) {
            throw new ApiError(400, "OTP is required");
        }
        
        const user = await otp.findOne({ email });
        if (!user) {
            throw new ApiError(500, "OTP not found");
        }
        
        if (OTP === user.otp) {
            user.isVerified = true;
            await user.save();
            return res.status(200).json({ message: "OTP verified successfully" });
        } else {
            throw new ApiError(400, "Invalid OTP");
        }
    } catch (error) {
        next(error);
    }
});


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

   const isUserVerified = await otp.findOne({email});
   if(!isUserVerified) {
       throw new ApiError(400 , "User is not verified")
   }

   await otp.findOneAndDelete({ email });

   const newUser = await User.create({
      email,
      username,
      Password,
})


   if(!newUser) {
    throw new ApiError(500 , "something went wrong while registering the user ")
 }
 
 return res.status(201).json(
    new ApiResponse(200, {newUser,otp} , "user registered successfully")
 )
    
})

export {
        loginHandler ,
        registerHandle,
        OTPCreation,
        OTPVerification
      }