import  {
    UPDATE_AIR_DATA_STATE,
    AIR_DATA_NOT_FOUND,
    SUCCESSFULLY_UPDATE,
    REQUEST_FOR_UPDATE,
    FAILED_TO_UPDATE
} from "./actionType"

const initialState = {
    pageNeed: 1,
    dataLimit: 5,
    airData: [],
    isFound: false,
    isLoadingForUpdate: false
}

const dailyAirDataCollector = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_AIR_DATA_STATE : {
            return {
                ...initialState,
                pageNeed: action.payload.pageNeed,
                airData: action.payload.airData,
                isFound: true
            }
        }
        case AIR_DATA_NOT_FOUND : {
            return {
                ...state
            }
        }
        case REQUEST_FOR_UPDATE: {
            return {
                ...state,
                isLoadingForUpdate: true
            }
        }
        case SUCCESSFULLY_UPDATE :{
            return {
                ...state,
                isLoadingForUpdate: false
            }
        }
        case FAILED_TO_UPDATE : {
            return {
                ...state,
                isLoadingForUpdate: false
            }
        }
        default: {
            return state
        }
    }
}

export default dailyAirDataCollector