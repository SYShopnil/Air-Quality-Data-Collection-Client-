import  {
    UPDATE_AIR_DATA_STATE,
    AIR_DATA_NOT_FOUND
} from "./actionType"

const initialState = {
    pageNeed: 1,
    dataLimit: 2,
    airData: [],
    isFound: false
}

const airDataCollector = (state = initialState, action) => {
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
                ...initialState
            }
        }
        default: {
            return state
        }
    }
}

export default airDataCollector