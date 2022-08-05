import React, {
    useState,
    useEffect
} from 'react'
import verifyOtpStyle from "./VerifyOTP.module.css"
import axios from "axios"
import {
    baseUrl
} from "../../../utils/baseUrl/baseUrl"
import {
    useRouter
} from "next/router"
import AlertMessage from '../../component/common/Alert/AlertMessage'


const VerifyOTP = () => {
    //local state 
    const [otpInput, setOtpInput] = useState ({
        otpOne: "",
        otpTwo: "",
        otpThree: "",
        otpFour: ""
    })
    const [responseMessage, setResponseMessage] = useState([]);
    const [responseCode, setResponseCode] = useState(null)

    const [responseMessageForResendOTP, setResponseMessageForResendOTP] = useState([]);
    const [responseCodeForResendOTP, setResponseCodeForResendOTP] = useState(null)

    //local variable 
    const route = useRouter()

    //all handler part

    //verify otp handler 
    const verifyOtpHandler = async (e) => {
        e.preventDefault();
        try {
            const body = {
                otp: `${otpInput.otpOne}${otpInput.otpTwo}${otpInput.otpThree}${otpInput.otpFour}`
            }
            const {
                data: {
                    status,
                    message
                }
            } = await axios.post(
                `${baseUrl}/agency/forgotPassword/verifyOtp`,
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

    //otp resend handler 
    const otpResendHandler = async (e) => {
        e.preventDefault();
        try {
            const body = {
                email: route.query.email //get the email from route query
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
            console.log({message, status})
            if (status == 202) { //if successfully sent the email 
                setResponseMessageForResendOTP (
                    [
                        {
                            type: "positive",
                            message
                        }
                    ]
                )
                setResponseCodeForResendOTP (status) //set the http response code
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
                        setResponseMessageForResendOTP (errorMessage) //set the error message
                        setResponseCodeForResendOTP (status) //set the http response code
            }else { //any other error
                setResponseMessageForResendOTP (
                    [
                        {
                            type: "negative",
                            message
                        }
                    ]
                )
                setResponseCodeForResendOTP (status) //set the http response code
            }
        }catch (err) {
            setResponseMessageForResendOTP(
                [
                    {
                        message: err.message,
                        type: "negative"
                    }
                ]
            )
            setResponseCodeForResendOTP (406) //set the http response code
        }
    }
    //all use effects

    //redirect to another page 
    useEffect (() => {
        if (responseMessage.length) {
            if (responseCode == 202) {
                route.push ("/forgotPassword/resetPassword")
            }else {
                route.push ("/login")
            }
        }
    }, [responseMessage])

    //redirect to another page for otp re sender 
    useEffect (() => {
        if (responseMessageForResendOTP.length) {
            // console.log (responseCodeForResendOTP)
            if (responseCodeForResendOTP !== 202) {
                route.push ("/login")
            }
        }
    }, [responseMessageForResendOTP])
    // console.log(otpInput)
  return (
    <div>
        {/* header part */}
        <div>
            <h1>Please Input the 4 digits OTP</h1>
        </div>

        {/* body part */}
        <div className = {`d-flex justify-content-center align-center`}>
            <form className = {`${verifyOtpStyle.boxWrapper} mb-3`}>
               <div className = "row">
                    <div className = "col-4"></div>
                    <div className = "col-4">
                         <div className="mb-3 d-flex">
                            {/* input one */}
                            <input 
                            type="text" 
                            className="form-control" 
                            id="otpInput" 
                            aria-describedby="otpInput"
                            name = {otpInput.otpOne}
                            value = {otpInput.otpOne}
                            onChange = {(e) => setOtpInput ({...otpInput, otpOne: e.target.value})}/>

                            {/* input two */}
                            <input 
                            type="text" 
                            className="form-control ms-2" 
                            id="otpInput" 
                            aria-describedby="otpInput"
                            name = {otpInput.otpTwo}
                            value = {otpInput.otpTwo}
                            onChange = {(e) => setOtpInput ({...otpInput, otpTwo: e.target.value})}/>


                            {/* input three */}
                            <input 
                            type="text" 
                            className="form-control ms-2" 
                            id="otpInput" 
                            aria-describedby="otpInput"
                            name = {otpInput.otpThree}
                            value = {otpInput.otpThree}
                            onChange = {(e) => setOtpInput ({...otpInput, otpThree: e.target.value})}/>


                            {/* input four */}
                            <input 
                            type="text" 
                            className="form-control ms-2" 
                            id="otpInput" 
                            aria-describedby="otpInput"
                            name = {otpInput.otpFour}
                            value = {otpInput.otpFour}
                            onChange = {(e) => setOtpInput ({...otpInput, otpFour: e.target.value})}/>
                            
                        </div>
                    </div>
                    <div className = "col-4"></div>
               </div>

               <div className = {`text-center`}>
                {/* OTP verify button */}
                 <button 
                 type="submit" 
                 className="btn btn-primary"
                 onClick = {(e) => verifyOtpHandler (e)}>Verify OTP</button>

                {/* OTP resend button */}
                 <button 
                 type="submit" 
                 className="btn btn-danger ms-2"
                 onClick = {(e) => otpResendHandler (e)}>Resend</button>
               </div>
            </form>

            {/* response message part for email verify */}
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

             {/* response message part for otp resend */}
            <div>
                {
                    responseMessageForResendOTP.map ((message, ind) => {
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
    </div>
  )
}

export default VerifyOTP