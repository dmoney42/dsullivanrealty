import jwt from 'jsonwebtoken';
import { errorHandler } from "./error.js";

export const verifyToken = (request, response, next) => {
    const token = request.cookies.access_token;

    if(!token) {
        return next(errorHandler(401, "Unauthorized"))
    }

    
    jwt.verify(token, process.env.JWT_SECRET, (error, user)=>{
        if(error) return next(errorHandler(403, "Forbidden"));

        request.user = user;
        next(); //run the next fundtion defined in the this route handler (see in user.route.js)
    });
    
}