import React, {
    useState,
    useEffect
} from 'react'
import resetPasswordStyle from "./ResetPassowrd.module.css"
import {
    baseUrl
} from "../../../utils/baseUrl/baseUrl"
import axios from "axios"
import {
    useRouter
} from "next/router"
import AlertMessage from '../../component/common/Alert/AlertMessage'


const ResetPassword = () => {
    const initialFormData = {
        newPassword: "",
        confirmPassword: ""
    }
    const [formData, setFormData] = useState(initialFormData) //reset password input part
    const [responseMessage, setResponseMessage] = useState([]);
    const [responseCode, setResponseCode] = useState(null)

    //local variable 
    const route = useRouter ()


    //all handler 

    //password reset handler 
    const passwordResetHandler = async (e) => {
        e.preventDefault();
        try {
            const {
                data: {
                    message,
                    status
                }
            } = await axios.post(
                `${baseUrl}/agency/forgotPassword/resetPassword`,
                formData,
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

    //all use effect 

     //redirect to another page 
    useEffect (() => {
        if (responseMessage.length) {
            if (responseCode == 202) {
                route.push (`/login`)
            }
        }
    }, [responseMessage])
  return (
    <div>
        {/* //header */}
        <div>
            <h1>Now Reset the password</h1>
        </div>

        {/* input of new password */}
        <form className = {`${resetPasswordStyle.formWrapper}`}>
            {/* new password */}
            <div className="mb-3">
                <label 
                for="newPassword" 
                className="form-label">New Password</label>

                <input 
                type="password" 
                className="form-control" 
                id="newPassword" 
                aria-describedby="emailHelp"
                name = {formData.newPassword}
                value = {formData.newPassword}
                onChange = {(e) => setFormData ({...formData, newPassword: e.target.value})}/>
            </div>

            {/* confirm password */}
            <div className="mb-3">
                <label 
                for="confirmPassword" 
                className="form-label">Confirm Password</label>
                
                <input 
                type="password" 
                className="form-control" 
                id="confirmPassword" 
                aria-describedby="emailHelp"
                name = {formData.confirmPassword}
                value = {formData.confirmPassword}
                onChange = {(e) => setFormData ({...formData, confirmPassword: e.target.value})}
                />
            </div>

            {/* reset button */}
            <div className = {`${resetPasswordStyle.resetButtonWrapper} mt-2`}>
                <button 
                type="submit" 
                className="btn btn-success text-center "
                onClick = {(e) => passwordResetHandler(e)}>Rest Password</button>
            </div>
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

export default ResetPassword