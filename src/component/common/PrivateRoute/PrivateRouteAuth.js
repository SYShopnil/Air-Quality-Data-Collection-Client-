import React, {
    useState,
    useEffect
} from 'react'
import {
    useRouter
} from "next/router"
import {
    connect
} from "react-redux"

const PrivateRouteAuth = ({
    children,
    isLoggedIn,
    user
}) => {
    //local  state 
    const [isLoading, setIsLoading] = useState (true)
    const [isFirstTimeRender, setFirstTimeRender] = useState (false)
    //local variable 
    const route = useRouter()
    // console.log(isLoggedIn)
    //all use effect 
    useEffect (() => {
        // console.log(`Hello`)
        if (isFirstTimeRender) {
            !isLoggedIn
            &&
            route.push("/login")
            }
    }, [isFirstTimeRender])

    useEffect (() => {
        setFirstTimeRender (true)
    }, [])
    // console.log(isLoggedIn)
  return (
    <>
        {
            isFirstTimeRender
            ?
            <>
                {
                    isLoggedIn 
                    && 
                    <>
                        {children}
                    </>
                }
            </>
            :
            <h1>Loading.....</h1>
            
        }
    </>
  )
}
//get global state 
const mapStateToProps = (state) => {
    const {
        login
    } = state
    return {
        user: login.loggedInUser,
        isLoggedIn: login.isLoggedIn
    }
}

//get global dispatch 
const mapDispatchToProps = (dispatch) => {
    return {
        startLoginProcess : (formData) => dispatch (startLoginProcess(formData))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(PrivateRouteAuth)
