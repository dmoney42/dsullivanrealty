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

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const {password: pass, ...restOfOjbect} = validUser;
        //response.cookie('access_token_cookie', token, {httpOnly: true}).status(200).json("User token achieved and user is logged in");
        /** below We want to see what object validUser returns and to exclude the password*/
        response.cookie('access_token_cookie', token, {httpOnly: true}).status(200).json(restOfOjbect);
      

    } catch (error) {
        next(error);
    }
}