import  {
    ADD_NEW_MESSAGE
} from "./actionType"

const initialState = {
    messages: []
}

const responseMessageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_MESSAGE: {
            return {
                ...state,
                messages: action.payload
            }
        }
        default: {
            return state
        }
    }
}

export default responseMessageReducer