import  {
    ADD_SELECT_FIELD
} from "./actionType"



//select a new format selection  
const selectAirDataFormat = (
    format,
    type 
) => {
    // console.log( {type, format})
    return {
        type: ADD_SELECT_FIELD,
        payload: {
            type,
            format
        }
    }
}

export {
    selectAirDataFormat
}