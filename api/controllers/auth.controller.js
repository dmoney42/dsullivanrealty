import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (request, response, next) => {
    console.log("The signup request from the client is: " + JSON.stringify(request.body));

    const {username, email, password} = request.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});

    try {
        await newUser.save();
        console.log("User created successfully!");
        response.status(201).json("User created successfully!");
    } catch (error) {
       next(errorHandler(500, error.message));
    }
};

export const signin = async (request, response, next) =>{
    console.log("The sign in function ran!");
    const {email, password} = request.body;

    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,"User not found"))
        }else{
            console.log("We found the user!");
        }

        const validPassword = bcrypt.compareSync(password, validUser.password);
        if(!validPassword) {
            return next(errorHandler(401, "Invalid credentials"));
        }else{
            console.log("The passwords match!");
        }

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET,{expiresIn: "1h"});
        console.log("JWT Secret is: ", process.env.JWT_SECRET);
        const {password: pass, ...restOfOjbect} = validUser.toObject();
        //response.cookie('access_token_cookie', token, {httpOnly: true}).status(200).json("User token achieved and user is logged in");
        /** below We want to see what object validUser returns and to exclude the password*/
        response.cookie('access_token_cookie', token, {
            httpOnly: true,
           //secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });
        
        console.log("The Set-Cookie header is:", response.getHeaders()['set-cookie']);
        response.status(200).json({success: true, token, user: restOfOjbect});
       // response.status(200).json({success: true, user: restOfOjbect});

    } catch (error) {
        next(errorHandler(500,"Internal Server Erorr during sign-in"));
    }
};


export const google = async (request, response, next) =>{
    console.log("we recived your google OAuth request. The body received is: ", request.body)
    try {
        const user = await User.findOne({
            email: request.body.email
        });

        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const {password, ...restOfOjbect} = user._doc;
            response.cookie('access_token_cookie', token, {
                /*
                httpOnly: true,
                secure: process.env.NODE_ENV === "production" ? true : false,  // Only secure in production
                sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",  // Fix for cross-origin
                path: "/",
                maxAge: 60 * 60 * 1000, // 1 hour
                */
                
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Ensures secure cookies in production
                sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Required for cross-origin requests
                path: "/",
                maxAge: 60 * 60 * 1000, // 1 hour
                
            });
            response.status(200).json({success: true, token, user: restOfOjbect});
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: request.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8),
                email: request.body.email,
                password: hashedPassword,
                avatar: request.body.photo
            });

            await newUser.save();
            const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET);
            const {password, ...restOfOjbect} = newUser._doc;
            response
                .cookie('access_token_cookie', token, {
                    httpOnly: true,
                    sameSite: 'lax',
                    path: '/',
                })
                .status(200)
                .json({ success: true, token, user: restOfOjbect });
        }
    } catch (error) {
        next(error);
    }
};