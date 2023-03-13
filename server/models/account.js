import mongoose from "mongoose";
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    avatar: {type:String, default:'https://res.cloudinary.com/united-app/image/upload/v1638879014/avatars/character2_iwlus2.png'},
    role: String
})

export default mongoose.model('Account', accountSchema);