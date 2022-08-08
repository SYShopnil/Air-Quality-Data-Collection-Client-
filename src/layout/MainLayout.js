import React, {
  useEffect,
  useState
} from 'react'
import Link from "next/link"
import {
  useRouter
} from "next/router"
import {
  connect
} from "react-redux"
import axios from "axios"
import {
  baseUrl
} from "../../utils/baseUrl/baseUrl"
import { 
  startLogoutProcess,
  logoutFailed 
} from '../store/login/action'
import mainLayoutStyle from "./MainLayout.module.css"
import AlertWithCancel from "../../src/component/common/Alert/AlertWithCancel"

const MainLayout = (
  {
    children,
    isLoggedIn,
    startLogoutProcess,
    user,
    response
  }
) => {
  // console.log({response})
  //all local state 
  const [isFirstTimeRender, setIsFirstTimeRender] = useState(false)
  const [messageResponse, setMessageResponses] = useState([])
  //all local variable 
  const route = useRouter()
  
  //all handler 
  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      await startLogoutProcess();//do the logout process 
    }catch (err) {
      loggedOutError(err.message)
    }
  }
  //all user effect 

  //control the after logout part . It will redirect user to home page after logout successfully 
  useEffect (() => {
    isFirstTimeRender
    &&
    (
      //check if the logout is successfully done then it will redirect user to home page
      !isLoggedIn 
        &&
      route.push ("/")
    )
    setIsFirstTimeRender (true)
  }, [isLoggedIn])
  console.log({messageResponse})
  console.log(`Main layout rendered`)

   //control the response message part 
  useEffect (() => {
    setMessageResponses (response)
  }, [response])
  return (
    <div>
      {
        isFirstTimeRender
        &&
        <>
          {/* header part */}
          <header>
              {/* navigation bar */}
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                  <Link href="/">
                    <a className="navbar-brand" href="#">Air Quality App</a>
                  </Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* fake one */}
                    <form className="d-flex" style = {{visibility: "hidden", width: "45%"}}>
                      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                      <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    
                    {/* navbar content part */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                      {/* when user is logged in that time only profile option will be visible */}
                      {
                        isLoggedIn
                        &&
                        <>
                          {/* profile button */}
                          <li className="nav-item d-flex justify-content-center align-center">
                            {/* title picture part */}
                            <img 
                            src= {`${user.titlePic}`} 
                            alt= {`${user.name}'s title picture`} 
                            className = {`${mainLayoutStyle.navbarProfilePicture}`}/>
                            <Link href="/dashboard/profile">
                              <a 
                              className="nav-link active text-capitalize text-primary " 
                              aria-current="page"
                              
                              >Welcome {user.name}!!</a>
                            </Link>
                          </li>
                        </>
                      }
                      

                      {/* when user is logged in that time only logout option will be visible */}
                      {
                        isLoggedIn
                        &&
                        <>
                          {/* Logout */}
                          <li className="nav-item">
                            <a 
                            className="nav-link" 
                            onClick = {(e) => {logoutHandler(e)}}
                            style = {{cursor: "pointer"}}>Logout</a>
                          </li>
                        </>
                      }

                      {/* when user is not logged in that time only sign in and login option will be visible */}
                      {
                        !isLoggedIn
                        &&
                        <>
                          {/* Sign up */}
                            <li className="nav-item">
                              <Link href="/signUp">
                                  <a className="nav-link" href="#">Sign Up</a>
                              </Link>
                            </li>
                            {/* Login In */}
                            <li className="nav-item">
                              <Link href="/login">
                                  <a className="nav-link" href="#">Log In</a>
                              </Link>
                            </li>
                        </>
                      }
                    </ul>
                  </div>
                </div>
              </nav>
          </header>

          <main style = {{minHeight: "85vh"}} >
            {/* other's content part */}
            <div>
              {children}
            </div>
            {/* message part */}
    
              {
                !!messageResponse.length
                &&
                <>
                  {
                    messageResponse.map ((msg, ind) => {
                      // console.log(msg)
                      return (
                         <AlertWithCancel
                            type = {msg.type}
                            message = {msg.message}
                            // allMessages = {responseMessage}
                            // setMessage = {setResponseMessage}
                          />
                      )
                    }) 
                  }
                </>
              }
             
      
          </main>

          {/* footer part */}
          <footer>
            <h4>@2022.All Rights Reserved</h4>
          </footer>
        </>
      }
    </div>
  )
}
//get global state 
const mapStateToProps = (state) => {
    const {
        login: {
          isLoggedIn,
          loggedInUser
        },
        messages: {
          messages
        }
    } = state
    return {
        isLoggedIn,
        user: loggedInUser,
        response: messages
    }
}

//get global dispatch 
const mapDispatchToProps = (dispatch) => {
    return {
        startLogoutProcess : () => dispatch (startLogoutProcess()) ,
        loggedOutError : (message) => dispatch (logoutFailed(message))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(MainLayout)