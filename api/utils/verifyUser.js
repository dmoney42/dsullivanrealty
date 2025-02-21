import jwt from 'jsonwebtoken';
import { errorHandler } from "./error.js";

export const verifyToken = (request, response, next) => {

    console.log("You are inside verifyToken...");
    console.log("Cookies received: ", request.cookies);
    const token = request.cookies.access_token_cookie;

    if(!token) {
        console.log("no token found in cookies");
        return next(errorHandler(401, "Unauthorized"))
    }

    
    jwt.verify(token, process.env.JWT_SECRET, (error, user)=>{
        if(error) {
            console.log("invalid token: ", error.message);
            return next(errorHandler(403, "Forbidden"))
        }

        console.log("Token verified successfully! user id:", user.id);
        request.user = user;
        next(); //run the next fundtion defined in the this route handler (see in user.route.js)
    });
    
}