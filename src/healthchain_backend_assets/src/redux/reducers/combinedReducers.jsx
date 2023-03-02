import { combineReducers } from "redux";
import employeeReducer from "./employeeReducer";
import patientReducer from "./patientReducer"

const reducer = combineReducers({
    patientList: patientReducer,
    employeeList: employeeReducer,
});

export default reducer;