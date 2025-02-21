import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (request, response) =>{
    response.send("Test route being called from a controller section of the app");
}

export const updateUser = async (request, response, next) => {
    console.log("We received your request to update the user.");



    // ✅ Log request body (Should contain username/email/password)
    console.log("Request Body:", request.body);

    // ✅ Log request params (Should contain user ID)
    console.log("Request Params ID:", request.params.id);

    if(request.user.id !== request.params.id) return next(errorHandler(401, "You can only update your own account."));

    try {
        if(request.body.password){
            request.body.password = bcrypt.hashSync(request.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            request.params.id,
            {
                $set: {
                    username: request.body.username,
                    email: request.body.email,
                    password: request.body.password,
                    avatar: request.body.avatar,
                }
            },
            { new: true}
        );
        
        // ✅ Log updated user (Should show new username)
        console.log("Updated User:", updatedUser);
                
        const { password, ...restOfArray} = updatedUser._doc;
        response.status(200).json(restOfArray);
    } catch (error) {
        next(error);
    }
}