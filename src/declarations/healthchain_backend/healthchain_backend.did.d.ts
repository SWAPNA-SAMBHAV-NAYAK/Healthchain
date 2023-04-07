import type { Principal } from '@dfinity/principal';
export interface Appointment {
  'patient_id' : string,
  'appointment_id' : string,
  'time_slot' : string,
  'date' : string,
  'doctor_id' : string,
}
export interface Doctor {
  'age' : bigint,
  'name' : string,
  'designation' : string,
  'email' : string,
  'address' : string,
  'gender' : string,
  'phone_number' : string,
  'department' : string,
  'registered_on' : Time,
  'doctor_id' : string,
  'qualification' : string,
}
export interface DoctorOpenHours {
  'openHoursTime' : Array<Array<string>>,
  'openHoursDates' : Array<string>,
  'doctor_id' : string,
}
export interface Employee {
  'contact' : string,
  'salary' : bigint,
  'date_of_joining' : string,
  'email' : string,
  'first_name' : string,
  'last_name' : string,
  'employee_id' : string,
}
export interface Notice {
  'notice' : string,
  'from' : string,
  'time_stamp' : Time,
}
export interface Patient {
  'age' : bigint,
  'weight' : number,
  'height' : number,
  'patient_id' : string,
  'name' : string,
  'email' : string,
  'blood_group' : string,
  'address' : string,
  'gender' : string,
  'phone_number' : string,
  'registered_on' : Time,
}
export interface ProfileData {
  'age' : string,
  'user_principal' : Principal,
  'user_type' : string,
  'contact' : string,
  'name' : string,
  'email' : string,
  'address' : string,
  'gender' : string,
  'image' : Array<number>,
}
export type Time = bigint;
export interface _SERVICE {
  'addDoctorOpenHours' : (
      arg_0: string,
      arg_1: Array<string>,
      arg_2: Array<Array<string>>,
    ) => Promise<undefined>,
  'createAppointment' : (
      arg_0: string,
      arg_1: string,
      arg_2: string,
      arg_3: string,
      arg_4: string,
    ) => Promise<undefined>,
  'createDoctor' : (
      arg_0: string,
      arg_1: string,
      arg_2: string,
      arg_3: string,
      arg_4: bigint,
      arg_5: string,
      arg_6: string,
      arg_7: string,
      arg_8: string,
      arg_9: string,
    ) => Promise<undefined>,
  'createEmployee' : (
      arg_0: string,
      arg_1: string,
      arg_2: string,
      arg_3: string,
      arg_4: string,
      arg_5: bigint,
      arg_6: string,
    ) => Promise<undefined>,
  'createNotice' : (arg_0: string, arg_1: string) => Promise<undefined>,
  'createPatient' : (
      arg_0: string,
      arg_1: string,
      arg_2: string,
      arg_3: string,
      arg_4: bigint,
      arg_5: string,
      arg_6: string,
      arg_7: number,
      arg_8: number,
      arg_9: string,
    ) => Promise<undefined>,
  'createProfile' : (
      arg_0: string,
      arg_1: string,
      arg_2: string,
      arg_3: string,
      arg_4: string,
      arg_5: string,
      arg_6: Array<number>,
    ) => Promise<undefined>,
  'deleteEmployee' : (arg_0: string) => Promise<undefined>,
  'getDoctorById' : (arg_0: string) => Promise<[] | [Doctor]>,
  'readAppointments' : () => Promise<Array<Appointment>>,
  'readDepartments' : () => Promise<Array<string>>,
  'readDoctors' : () => Promise<Array<Doctor>>,
  'readEmployees' : () => Promise<Array<Employee>>,
  'readNotices' : () => Promise<Array<Notice>>,
  'readOpenHours' : () => Promise<Array<DoctorOpenHours>>,
  'readPatients' : () => Promise<Array<Patient>>,
  'readProfileData' : () => Promise<[] | [ProfileData]>,
  'updateDoctor' : (
      arg_0: string,
      arg_1: Time,
      arg_2: string,
      arg_3: string,
      arg_4: string,
      arg_5: bigint,
      arg_6: string,
      arg_7: string,
      arg_8: string,
      arg_9: string,
      arg_10: string,
    ) => Promise<undefined>,
  'updateEmployee' : (
      arg_0: string,
      arg_1: string,
      arg_2: string,
      arg_3: string,
      arg_4: string,
      arg_5: bigint,
      arg_6: string,
    ) => Promise<undefined>,
  'updatePatient' : (
      arg_0: string,
      arg_1: Time,
      arg_2: string,
      arg_3: string,
      arg_4: string,
      arg_5: bigint,
      arg_6: string,
      arg_7: string,
      arg_8: number,
      arg_9: number,
      arg_10: string,
    ) => Promise<undefined>,
  'updateUserType' : (arg_0: Principal, arg_1: string) => Promise<undefined>,
}
