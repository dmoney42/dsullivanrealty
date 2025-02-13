import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const test = (request, response) =>{
    response.send("Test route being called from a controller section of the app");
}

export const updateUser = async (request, response, next) => {
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

        const { password, ...restOfArray} = updatedUser._doc;
        response.status(200).json(restOfArray);
    } catch (error) {
        next(error);
    }
}