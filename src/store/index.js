import loginReducer from "./login/reducer"
import responseMessageReducer from "./responseMessage/reducer"
import airDataSelectionOption from "./airDataSelection/reducer"
import {combineReducers} from "redux"
import airDataCollector from "./readAirData/reducer"
import dailyAirDataCollector from "./readDailyAirData/reducer"


const rootReducer = combineReducers ({
    login: loginReducer,
    messages: responseMessageReducer,
    selectedOption: airDataSelectionOption,
    airData: airDataCollector,
    dailyAirData: dailyAirDataCollector
})

export default rootReducer