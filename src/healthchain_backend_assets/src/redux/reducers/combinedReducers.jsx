import { combineReducers } from "redux";
import departmentReducer from "./departmentReducer";
import doctorByIdReducer from "./doctorByIdReducer";
import doctorReducer from "./doctorReducer";
import employeeReducer from "./employeeReducer";
import patientByIdReducer from "./patientByIdReducer";
import patientReducer from "./patientReducer"

const reducer = combineReducers({
    patientList: patientReducer,
    doctorList: doctorReducer,
    employeeList: employeeReducer,
    patientById: patientByIdReducer,
    doctorById: doctorByIdReducer,
    departmentList: departmentReducer,
});

export default reducer;