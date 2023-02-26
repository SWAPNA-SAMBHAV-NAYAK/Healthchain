import { combineReducers } from "redux";
import patientReducer from "./patientReducer"

const reducer = combineReducers({
    patientList: patientReducer,
});

export default reducer;