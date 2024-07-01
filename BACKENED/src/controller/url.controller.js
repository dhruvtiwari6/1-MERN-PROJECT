import { url } from "../model/url.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import shortId from 'short-unique-id'
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const urlHandle = asyncHandler( async(req, res) => {
    const body = req.body;
    console.log("body ", body);
    const shortid = new shortId({length: 10}).rnd()

    const comingURl = await url.findOne({redirectUrl : body.url})


       await url.create({
        shortId : shortid ,
        redirectUrl : body.url,
        createdBy : req.userID
    })

    const allUrl = await url.find({createdBy : req.userID})
    console.log("allUrl " , allUrl)
   
    return res.status(200).json(new ApiResponse(200 , allUrl , "new url is sent"))
})