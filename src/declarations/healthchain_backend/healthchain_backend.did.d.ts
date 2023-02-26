import type { Principal } from '@dfinity/principal';
export interface MedicalLog {
  'blood_pressure' : bigint,
  'temperature' : number,
  'spo2' : bigint,
  'pulse_rate' : number,
  'time_stamp' : Time,
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
  'patient_id' : bigint,
  'logs' : Array<MedicalLog>,
  'name' : string,
  'email' : string,
  'blood_group' : string,
  'address' : string,
  'gender' : string,
  'phone_number' : string,
  'registered_on' : Time,
}
export type Time = bigint;
export interface _SERVICE {
  'createNotice' : (arg_0: string, arg_1: string) => Promise<undefined>,
  'createPatient' : (
      arg_0: bigint,
      arg_1: string,
      arg_2: string,
      arg_3: string,
      arg_4: bigint,
      arg_5: string,
      arg_6: string,
      arg_7: number,
      arg_8: number,
      arg_9: string,
      arg_10: Array<MedicalLog>,
    ) => Promise<undefined>,
  'readNotices' : () => Promise<Array<Notice>>,
  'readPatients' : () => Promise<Array<Patient>>,
}
