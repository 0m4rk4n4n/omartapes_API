import mongoose from "mongoose"
const UserSchema=new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true,
            unique:true
        },
        email:
        {
            type:String,
            required:true,
            unique:true
        },
        password:
        {
            type:String
        },
        subscribers:
        {
            type:Number,
            default:0
        },
        subscribedUsers:
        {
            type:[String],
            default:[]
        },
        viewedVideos:
        {
            type:[String],
            default:[]
        },
 
        Img:{type:String,default:""}
    },{timestamps:true})
    export default mongoose.model("Users",UserSchema)