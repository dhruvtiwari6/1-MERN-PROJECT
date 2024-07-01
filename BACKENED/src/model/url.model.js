import mongoose , {Schema} from 'mongoose'

const urlSchema = new Schema(
    {
        shortId : {
            type: String,
            unique : true,  //remove later
            required: true
        },

        redirectUrl: {
            type: String,
            required: true
        },

        createdBy: {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user"

        }
    }, 
    {
        timestamps : true
    }
)

export const url = mongoose.model("url" , urlSchema);