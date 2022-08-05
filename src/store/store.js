import rootReducer from "./index"
import { configureStore } from '@reduxjs/toolkit'
const store = configureStore ({
    reducer: rootReducer
})

export default store





// let composeEnhancers = compose;
// if (typeof window !== 'undefined') {
//   composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// }
