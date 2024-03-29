import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/generateToken.js';


export const signup = async (req, res) => {
    console.log('signup')
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if(password != confirmPassword) {
            return res.status(400).jsoon({error: 'Invalid password/ Do not match'});
        }

        const user = await User.findOne({username});

        if (user) {
            return res.status(400).json({error:'username already exists'});
        }

        //HASH PASSWORD HERE
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        

        const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
         
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePicture: gender === 'female' ? femaleProfilePic : maleProfilePic
        })

        if (newUser) {
            //Generate JWT here
            generateTokenAndSetCookie(newUser._id, res);
            
            await newUser.save()
            
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePicture: newUser.profilePicture,
            });
        }
        else {
            res.status(400).json({error: 'Invalid user data'})
        }
         
    } catch (error) {
        console.log("error in login controller ",error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const login = async (req, res) => {
    console.log('loginUser')

    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error: "invalid credentials" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePicture: user.profilePicture
        });
        
    } catch (error) {
        console.log("error in signup controller ",error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const logout =  (req, res) => {
    console.log('loginUser')

    try {
        res.cookie('jwt', '', { maxAge: 0})
        res.status(200).json({message:'Logged out successfully'});

    } catch (error) {
        console.log("error in signup controller ",error.message);
        res.status(500).json({ error: "Internal server error" });
    }
} 