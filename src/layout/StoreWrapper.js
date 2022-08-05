import React from 'react'
import store from "../store/store"
import {
  Provider
} from "react-redux"

const StoreWrapper = ({children}) => {
  return (
    <Provider store = {store}>
        <div>{children}</div>
    </Provider>
  )
}

export default StoreWrapper