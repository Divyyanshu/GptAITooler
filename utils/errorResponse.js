class  errorResponse extends Error{
    constructor(message,StatusCode){
        super(message);
        this.statusCode = statusCode;
    }
}
module.exports = errorResponse