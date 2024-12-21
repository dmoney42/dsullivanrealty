import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";

export const signup = async (request, response, next) => {
    //console.log("The signup request from the client is: " + JSON.stringify(request.body));

    const {username, email, password} = request.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});

    try {
        await newUser.save();
        response.status(201).json("User created successfully!")
    } catch (error) {
       next(errorHandler(500, error.message));
    }
};