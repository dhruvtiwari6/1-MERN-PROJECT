class ApiError extends Error {
    constructor(statuscode , msg="something went wrong" , error = []){
        super(msg);
        this.statuscode = statuscode,
        this.msg = msg,
        this.error = error
    }
}

export default ApiError