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
import profileDataReducer from "./profileDataReducer";
import doctorMetaDataByIdReducer from "./doctorMetaDataByIdReducer";
import doctorMetaDataReducer from "./doctorMetaDataReducer";
import notificationReducer from "./notificationReducer";
import medicalLogReducer from "./medicalLogReducer";
import doctorOpenHourByIdReducer from "./doctorOpenHourByIdReducer";
import accessToLogsReducer from "./accessToLogsReducer";
import logsAccessListReducer from "./logsAccessListReducer";

const reducer = combineReducers({
    patientList: patientReducer,
    doctorList: doctorReducer,
    employeeList: employeeReducer,
    patientById: patientByIdReducer,
    doctorById: doctorByIdReducer,


    medicalLogList: medicalLogReducer,

    hasAccessToLogs: accessToLogsReducer,
    logsAccessList: logsAccessListReducer,

    doctorMetaDataById: doctorMetaDataByIdReducer,
    doctorMetaDataList: doctorMetaDataReducer,

    doctorOpenHoursList: doctorOpenHoursReducer,
    doctorOpenHoursByIdList: doctorOpenHourByIdReducer,

    departmentList: departmentReducer,

    appointmentList: appointmentReducer,

    openHours: doctorAppointmentOpenHourReducer,
    isBurgerNavOpen: openBurgerNavReducer,

    accountType: accountTypeReducer,
    profileData: profileDataReducer,

    notificationList: notificationReducer
});

export default reducer;