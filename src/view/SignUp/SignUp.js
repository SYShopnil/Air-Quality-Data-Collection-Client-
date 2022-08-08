import React, {
    useState,
    useEffect
} from 'react'
import SingleFileUploader from '../../../utils/SingleFileUploader/SingleFileUploader'
import {baseUrl} from "../../../utils/baseUrl/baseUrl"
import axios from  "axios"
import {
    useRouter
} from "next/router"
import AlertMessage from '../../component/common/Alert/AlertMessage'
import signUpStyle from "./SignUp.module.css"


const SignUp = () => {
    const initialFormData = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        area: "",
        district: "",
        division: "",
        country: "",
        motive: "",
        titlePic: "",
        coverPic: ""
    } //this is the initial form data

    //All local states
    const [formData, setFormData] = useState (initialFormData) //store all form data here
    const [isGetResponse, SetIsGetResponse] = useState (false) //control the form fetch response part 
    const [formSubmissionStatus,setFormSubmissionStatus ] = useState ({
        value: false,
        status: false
    }) //control the redirection after the form submission part 
    const [responseMessage, setResponseMessage] = useState([]) //this will show all response message of form submission 
    const [passwordShow, setPasswordShow] = useState(false)
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false)

    //others variable 
    const router = useRouter (); //handle the redirection part with this

    //All Handler part 

    //form submit handler
    const submitHandler = (e) => {
        e.preventDefault();
        // console.log(formData)
        SetIsGetResponse (true) //it will start the button loading phase
    }
    //file upload handler
    const uploadFileHandler = (fileData, uploadFor) => { //title and cover pic file uploader callback function props 
        // console.log({fileData, uploadFor})
        uploadFor == "title" && setFormData ({...formData, titlePic: fileData.base64}) //set the title picture base 64 into the form data state 
        uploadFor == "cover" && setFormData ({...formData, coverPic: fileData.base64}) //set the cover picture base 64 into the form data state 
    }

    //All use effective part 

    //use effect for form submission 
    useEffect (() => {
        if (isGetResponse) { //to avoid the mounting phase 
            (async () => {
                try {
                    const requestForSubmission = await axios.post (`${baseUrl}/agency/registration`,formData) //sent the request to the server for a register a new agency
                    const {
                        data: {
                            message,
                            status
                        }
                    } = requestForSubmission
                    // console.log(status)
                    setFormData(initialFormData)
                    if (status == 201) {  //if successfully saved 
                        setResponseMessage ([
                            {
                                message,
                                type: "positive"
                            }
                        ])
                        setFormSubmissionStatus({
                            value: true,
                            status: true
                        })//there has  no error
                        SetIsGetResponse(false)
                        
                    }else if (status == 402){ //if any body validation error
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
                        errorMessage.shift()
                        setResponseMessage(errorMessage) //set the error message state
                        setFormSubmissionStatus({
                            value: true,
                            status: false
                        })//there has  no error
                        SetIsGetResponse(false)

                    }else { //have any error
                        setResponseMessage ([
                            {
                                message,
                                type: "negative"
                            }
                        ])
                        setFormSubmissionStatus({
                            value: true,
                            status: false
                        }) //there has an error must
                        SetIsGetResponse(false)
                    }
                }catch (err) { //any runtime error
                    // console.log(err.message)
                    setResponseMessage ([
                        {
                            message: err.message,
                            type: "negative"
                        }
                    ])
                    setFormSubmissionStatus({
                        value: true,
                        status: false
                    }) //there has an error must
                    SetIsGetResponse(false)
                }
            })()
        }
    }, [isGetResponse])

    //use effect for redirection part after successfully submit the form 
    useEffect (() => {
        if (formSubmissionStatus.value) {  //to avoid the mounting phase 
            formSubmissionStatus.status && router.push ("/login")
        }
    }, [formSubmissionStatus])

    
    return (
        <div>
            <form>
                {/* Agency Name */}
                <div className="mb-3">
                    <label for="agencyName" className="form-label">Agency Name</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="agencyName" 
                    aria-describedby="agencyName"
                    name = {formData.name}
                    value = {formData.name}
                    onChange = {(e) => setFormData ({...formData, name: e.target.value})}
                    required />
                </div>

                {/* email */}
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input 
                    type="email" 
                    className="form-control" 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp"
                    name = {formData.email}
                    value = {formData.email}
                    onChange = {(e) => setFormData ({...formData, email: e.target.value})}
                    required/>
                </div>

                {/* password */}
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <div className = {`${signUpStyle.passwordParent}`}>
                        <input 
                        type= {`${passwordShow ? "text" : "password"}`} 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        name = {formData.password}
                        value = {formData.password}
                        onChange = {(e) => setFormData ({...formData, password: e.target.value})}
                        required/>
                        {/* passwordShow part */}
                        <div className = {`${signUpStyle.passwordChild}`}>  
                            <i  
                            className= {`${passwordShow? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}`}
                            onClick = {(e) => setPasswordShow(!passwordShow)}
                            ></i>
                        </div>
                    </div>
                </div>

                {/* confirm password */}
                <div className="mb-3">
                    <label for="confirmPassword" 
                    className="form-label"
                    >Confirm Password</label>
                    <div className = {`${signUpStyle.passwordParent}`}>
                        <input 
                        type= {`${confirmPasswordShow ? "text" : "password"}`} 
                        className="form-control" 
                        id="confirmPassword" 
                        name = {formData.confirmPassword}
                        value = {formData.confirmPassword}
                        onChange = {(e) => setFormData ({...formData, confirmPassword: e.target.value})}
                        required/>
                        <div className = {`${signUpStyle.passwordChild}`}>  
                            <i 
                            className= {`${confirmPasswordShow? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}`}
                            onClick = {(e) => setConfirmPasswordShow(!confirmPasswordShow)}></i>
                        </div>
                    </div>
                </div>

                {/* Area Name */}
                <div className="mb-3">
                    <label for="area" className="form-label">Area</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="area" 
                    aria-describedby="area"
                    name = {formData.area}
                    value = {formData.area}
                    onChange = {(e) => setFormData ({...formData, area: e.target.value})}
                    required />
                </div>

                {/* District Name */}
                <div className="mb-3">
                    <label for="district" className="form-label">District Name</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="district" 
                    aria-describedby="district"
                    name = {formData.district}
                    value = {formData.district}
                    onChange = {(e) => setFormData ({...formData, district: e.target.value})}
                    required />
                </div>


                {/* Division Name */}
                <div className="mb-3">
                    <label for="divisionName" className="form-label">Division Name</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="divisionName" 
                    aria-describedby="divisionName"
                    name = {formData.division}
                    value = {formData.division}
                    onChange = {(e) => setFormData ({...formData, division: e.target.value})}
                    required />
                </div>

                {/* Country Name */}
                <div className="mb-3">
                    <label for="countryName" className="form-label">Country Name</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="countryName" 
                    aria-describedby="countryName"
                    name = {formData.country}
                    value = {formData.country}
                    onChange = {(e) => setFormData ({...formData, country: e.target.value})}
                    required />
                </div>


                {/* Title Picture */}
                <div className="mb-3">
                    <label for="agencyName" className="form-label">Title Picture Name</label>
                    <SingleFileUploader 
                    filePassHandler = {uploadFileHandler} 
                    fileType = 'img' 
                    uploadFor = {`title`}/>
                </div>

                {/* Cover picture*/}
                <div className="mb-3">
                    <label for="coverPicture" className="form-label">Cover Picture</label>
                    <SingleFileUploader 
                    filePassHandler = {uploadFileHandler} 
                    fileType = 'img' 
                    uploadFor = {`cover`}/>
                </div>

                
                {/* Motive Name */}
                <div className="mb-3">
                    <label for="coverPicture" className="form-label">Company Motive</label>
                    <div className="form-floating">
                        <textarea 
                        className="form-control" 
                        placeholder="Say Company Motive" 
                        id="floatingTextarea2" 
                        style= {{height: "100px"}}
                        onChange = {(e) => setFormData ({...formData, motive: e.target.value})}
                        ></textarea>
                        <label for="floatingTextarea2">Say Company Motive....</label>
                    </div>
                </div>

                {/* form submit button */}
                <button 
                type="submit" 
                className="btn btn-primary"
                style = {{ width:"20%"}}
                onClick={(e) => submitHandler (e)}
                >
                    { //working on the loading phase of button
                        !isGetResponse 
                        ?
                        "Register"
                        :
                        <div className="spinner-grow text-dark" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> //code of loading round
                    }
                </button>
                {
                    !!responseMessage.length //if any response message insert into the array
                    &&
                    <div>
                         {
                            responseMessage.map ((msg, ind) => {
                                return (
                                    <AlertMessage
                                    type = {msg.type}
                                    message = {msg.message}
                                    />
                                )
                            })
                        }
                    </div>
                }
            </form>
        </div>
    )
}

export default SignUp