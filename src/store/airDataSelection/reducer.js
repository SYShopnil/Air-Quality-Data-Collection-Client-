import  {
    ADD_SELECT_FIELD
} from "./actionType"

const initialState = {
    selectForFinalData: "csv",
    selectForDailyData: "csv"
}

const airDataSelectionOption = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SELECT_FIELD : {
            // console.log(action.payload.type)
            if (action.payload.type == "daily") {  //type should be daily or final
                return {
                    ...state, 
                    selectForDailyData: action.payload.format //format should be => csv or manually
                }
            } else if (action.payload.type == "final") { //type should be daily or final
                return {
                    ...state, 
                    selectForFinalData: action.payload.format //format should be => csv or manually
                }
            }
        }
        default: {
            return state
        }
    }
}

export default airDataSelectionOption