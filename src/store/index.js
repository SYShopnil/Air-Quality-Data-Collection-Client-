import loginReducer from "./login/reducer"
import responseMessageReducer from "./responseMessage/reducer"
import airDataSelectionOption from "./airDataSelection/reducer"
import {combineReducers} from "redux"


const rootReducer = combineReducers ({
    login: loginReducer,
    messages: responseMessageReducer,
    selectedOption: airDataSelectionOption
})

export default rootReducer