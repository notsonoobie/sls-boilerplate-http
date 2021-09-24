const get500Message = (msg) => {
    return {
        statusCode: 500,
        body: JSON.stringify({
            success: false,
            message: msg || "Something went wrong"
        })
    }
}

const get200Message = (res) => {
    return {
        statusCode: 200,
        body: typeof (res) === 'object' ? JSON.stringify(res) : res
    }
}

const get400Message = (msg) => {
    return {
        statusCode: 400,
        body: JSON.stringify({
            success: false,
            message: msg || "Bad Request"
        })
    }
}

const get401Message = (msg) => {
    return {
        statusCode: 401,
        body: JSON.stringify({
            success: false,
            message: msg || "Unauthorized"
        })
    }
}

module.exports = {
    get500Message,
    get401Message,
    get400Message,
    get200Message
}