import React, {
    useState,
    useEffect
} from 'react'
import axios from "axios"
import {
    baseUrl
} from "../../../utils/baseUrl/baseUrl"
import AlertMessage from "../../component/common/Alert/AlertMessage"
import {
    useRouter
} from "next/router"


const VerifyEmail = () => {
    //local state 
    const [emailInput, setEmailInput] = useState("");
    const [responseMessage, setResponseMessage] = useState([]);
    const [responseCode, setResponseCode] = useState(null)


    //local variable 
    const route = useRouter()

    //all handler 
    
    //verify button handler
    const verifyHandler = async (e) => {
        e.preventDefault();
        try {
            const body = {
                email: emailInput
            }
            const {
                data: {
                    status,
                    message
                }
            } = await axios.post(
                `${baseUrl}/agency/forgotPassword/verifyEmail`,
                body,
                {
                    withCredentials: true
                }
            )
            if (status == 202) { //if successfully sent the email 
                setResponseMessage (
                    [
                        {
                            type: "positive",
                            message
                        }
                    ]
                )
                setResponseCode (status) //set the http response code
            }else if (status == 402) { //if body input error 
                const errorMessage = [] //contains all body validation error
                        message.forEach(responseMessage => {
                            for (const property in responseMessage.constraints) {
                                const body = {
                                    type: "negative",
                                    message: responseMessage.constraints[property]
                                } //this will contains all validation error
                                errorMessage.push (body); //push all error match 
                            }
                        })
                        errorMessage.shift()
                        setResponseMessage (errorMessage) //set the error message
                        setResponseCode (status) //set the http response code
            }else { //any other error
                setResponseMessage (
                    [
                        {
                            type: "negative",
                            message
                        }
                    ]
                )
                setResponseCode (status) //set the http response code
            }
        }catch (err) {
            setResponseMessage(
                [
                    {
                        message: err.message,
                        type: "negative"
                    }
                ]
            )
            setResponseCode (406) //set the http response code
        }
    }

    //all useEffect part
    
    //redirect to another page 
    useEffect (() => {
        if (responseMessage.length) {
            if (responseCode == 202) {
                route.push (`/forgotPassword/verifyOTP?email=${emailInput}`)
            }else {
                route.push ("/login")
            }
        }
    }, [responseMessage])

    // console.log(responseMessage)
    // console.log(first)
  return (
    <div>
        {/* header part of forgot password  */}
        <div>
            <h1>Verify Email First</h1>
        </div>

        {/* email input field */}
        <form className = {`mb-3`}>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input 
                type="email" 
                className="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp"
                onChange = {(e) => setEmailInput (e.target.value)}
                name = {emailInput}
                value = {emailInput}
                required/>
            </div>
            <button 
            type="submit" 
            className="btn btn-primary"
            onClick = {(e) => verifyHandler(e)}
            >Verify</button>
            </form>
            {/* response message part */}
            <div>
                {
                    responseMessage.map ((message, ind) => {
                        return (
                            <AlertMessage
                                type = {message.type}
                                message = {message.message}
                                key = {ind}
                            />
                        )
                    })
                }
            </div>
    </div>
    
  )
}

export default VerifyEmail