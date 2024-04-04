import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type: 'string',
        required: true
    },
    username:{
        type: 'string',
        required: true,
        unique: true,
    },
    password:{
        type: 'string',
        required: true,
        minlength: 10,
    },
    gender:{
        type: 'string',
        required: true,
        enum: ['male', 'female'],
    },
    profilePicture:{
        type: 'string',
        default: '',
    },
    contacts: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    //createdat updatedat:
}, {timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;