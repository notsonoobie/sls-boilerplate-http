const get500Message = (msg) => {
    return {
        statusCode: 500,
        body: JSON.stringify({
            success: false,
            message: msg || "Something went wrong"
        })
    }
}

module.exports = {
    get500Message
}