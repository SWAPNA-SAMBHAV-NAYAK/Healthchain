import { combineReducers } from "redux";
import departmentReducer from "./departmentReducer";
import doctorByIdReducer from "./doctorByIdReducer";
import doctorReducer from "./doctorReducer";
import employeeReducer from "./employeeReducer";
import patientByIdReducer from "./patientByIdReducer";
import patientReducer from "./patientReducer"
import doctorOpenHoursReducer from "./doctorOpenHoursReducer";
import doctorAppointmentOpenHourReducer from "./doctorAppointmentOpenHourReducer";
import appointmentReducer from "./appointmentReducer";
import openBurgerNavReducer from "./openBurgerNavReducer";
import accountTypeReducer from "./accountTypeReducer";

const reducer = combineReducers({
    patientList: patientReducer,
    doctorList: doctorReducer,
    employeeList: employeeReducer,
    patientById: patientByIdReducer,
    doctorById: doctorByIdReducer,
    doctorOpenHoursList: doctorOpenHoursReducer,
    departmentList: departmentReducer,

    appointmentList: appointmentReducer,

    openHours: doctorAppointmentOpenHourReducer,
    isBurgerNavOpen: openBurgerNavReducer,

    accountType: accountTypeReducer,
});

export default reducer;