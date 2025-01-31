import bcrypt from "bcrypt";

export const test = (request, response) =>{
    response.send("Test route being called from a controller section of the app");
}

export const updateUser = (request, response, next) => {
    if(request.user.id !== request.params.id) return next(errorHandler(401, "You can only update your own account."));

    try {
        if(request.body.password){
            request.body.password = bcrypt.hashSync(request.body.password, 10);
        }
    } catch (error) {
        
    }
}