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

    //local variable 
    const route = useRouter()

    //all use effect 
    useEffect (() => {
        !isLoggedIn
        &&
        route.push("/")
    }, [])
    // console.log(isLoggedIn)
  return (
    <>
        {
            isLoggedIn
            &&
            <>
                {children}
            </>
            
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
