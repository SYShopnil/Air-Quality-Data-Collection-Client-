const messageCreator = (responseMessage ) => {
    const message = responseMessage
    const errorMessage = [] //contains all body validation error
    // console.log(message)
    message.forEach(responseMessage => {
        // console.log(typeof responseMessage.constraints)
        for (const property in responseMessage.constraints) {
            const body = {
                type: "negative",
                    message: responseMessage.constraints[property]
                } //this will contains all validation error
                errorMessage.push (body);
             }
        })
    // errorMessage.shift()
    // console.log({errorMessage})
    return errorMessage
}

export default messageCreator