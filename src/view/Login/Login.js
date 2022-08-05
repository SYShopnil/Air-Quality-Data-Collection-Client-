import React, {
    useState,
    useEffect
} from 'react'
import loginStyle from './Login.module.css'
import Link from "next/link"
import {
    connect
} from "react-redux"
import {
    startLoginProcess
} from "../../store/login/action"
import AlertMessage from '../../component/common/Alert/AlertMessage'
import {
    useRouter
} from "next/router"

const Login = ({
    isLoggedIn,
    isLoadingForLogin,
    startLoginProcess,
    responseMessages
}) => {
    //local state 
    const initialFormData = {
        emailOrAgentId: "",
        password: ""
    }
    const [loginFormData, setLoginFormData] = useState (initialFormData) //state of login form
    const [isLoading, setIsLoading] = useState(isLoadingForLogin)
    const [passwordShow, setPasswordShow] = useState(false) //password show or hide eye part
    const [runTimeErrorMessage, setRuntimeErrorMessage] = useState("") //run time error message

    //local variable 
    const route = useRouter() 

    //all handler 
    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            await startLoginProcess(loginFormData)
            setLoginFormData(initialFormData)
            // console.log(first)
        }catch (err) {
            setRuntimeErrorMessage({
                type: "negative",
                message: err.message
            })
        }
    }

    //all use effect 
    useEffect (() => {
        if (isLoggedIn) {
            route.push ("/dashboard/profile")
        }
    }, [isLoggedIn])
    return (
        <div>
            <form className = {`my-3`}>
                {/* email */}
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email or AgentID</label>
                    <input 
                    type="email" 
                    className="form-control" 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp"
                    onChange={(e) => setLoginFormData({...loginFormData, emailOrAgentId: e.target.value})}
                    name = {loginFormData.emailOrAgentId}
                    value = {loginFormData.emailOrAgentId}
                    required/>
                </div>

                {/* password */}
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <div className = {`${loginStyle.passwordParent}`}>
                        <input 
                        type= {`${passwordShow ? "text" : "password"}`}  
                        className="form-control" 
                        id="exampleInputPassword1"
                        onChange={(e) => setLoginFormData({...loginFormData, password: e.target.value})}
                        name = {loginFormData.password}
                        value = {loginFormData.password}
                        required/>
                        {/* passwordShow part */}
                            <div className = {`${loginStyle.passwordChild}`}>  
                                <i  
                                className= {`${passwordShow? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}`}
                                onClick = {(e) => setPasswordShow(!passwordShow)}
                                ></i>
                            </div>
                    </div>
                </div>


                {/* login button */}
                <button 
                ype="submit" 
                style={{width: "10%"}}
                className="btn btn-success"
                onClick = {(e) => loginHandler(e)}
                >
                    {
                        !isLoadingForLogin
                        ?
                        <>
                            Login
                        </>
                        :
                        <>
                            <div className="spinner-border text-success" style = {{height: "1.2rem",width: "1.2rem"}}role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </>
                    }</button>

                {/* Signup button */}
                <button 
                ype="submit" 
                className="btn btn-primary mx-2"
                onClick = {(e) => route.push("/signUp") } //it will redirect user to sign up page
                >Sign Up</button>
                
                {/* forgot password */}
                <Link href="/forgotPassword/verifyEmail">
                     <a href="" className = {`text-danger`}>
                        Forgot Password??
                    </a>
                </Link>
               
            </form>
            <div>
                {
                    !!responseMessages.length
                    &&
                    <>
                        {
                            responseMessages.map ((message, ind) => {
                                return (
                                    <AlertMessage
                                        type = {message.type}
                                        message = {message.message}
                                    />
                                )
                            })
                        }
                    </>
                }
            </div>
        </div>
    )
}

//get global state 
const mapStateToProps = (state) => {
    const {
        login
    } = state
    return {
        isLoggedIn: login.isLoggedIn,
        isLoadingForLogin: login.isLoading,
        responseMessages: login.responseMessages
    }
}

//get global dispatch 
const mapDispatchToProps = (dispatch) => {
    return {
        startLoginProcess : (formData) => dispatch (startLoginProcess(formData))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Login)