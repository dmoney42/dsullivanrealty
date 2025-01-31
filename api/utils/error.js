
export const errorHandler = (statusCode, message) => {
    console.log("We ended up with here with an error");
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
};