export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const ProfileData = IDL.Record({
    'age' : IDL.Text,
    'user_principal' : IDL.Principal,
    'user_type' : IDL.Text,
    'contact' : IDL.Text,
    'name' : IDL.Text,
    'email' : IDL.Text,
    'address' : IDL.Text,
    'gender' : IDL.Text,
    'image' : IDL.Vec(IDL.Nat8),
    'registered_on' : Time,
  });
  const DoctorMetaData = IDL.Record({
    'designation' : IDL.Text,
    'department' : IDL.Text,
    'doctor_id' : IDL.Principal,
    'qualification' : IDL.Text,
  });
  const Appointment = IDL.Record({
    'patient_id' : IDL.Principal,
    'appointment_id' : IDL.Text,
    'time_slot' : IDL.Text,
    'date' : IDL.Text,
    'doctor_id' : IDL.Principal,
  });
  const Employee = IDL.Record({
    'contact' : IDL.Text,
    'salary' : IDL.Int,
    'date_of_joining' : IDL.Text,
    'email' : IDL.Text,
    'first_name' : IDL.Text,
    'last_name' : IDL.Text,
    'employee_id' : IDL.Text,
  });
  const MedicalLog = IDL.Record({
    'weight' : IDL.Float64,
    'height' : IDL.Float64,
    'patient_id' : IDL.Principal,
    'blood_pressure' : IDL.Int,
    'temperature' : IDL.Float64,
    'spo2' : IDL.Int,
    'medications' : IDL.Text,
    'blood_group' : IDL.Text,
    'pulse_rate' : IDL.Float64,
    'additional_notes' : IDL.Text,
    'doctor_id' : IDL.Principal,
    'time_stamp' : Time,
  });
  const Notice = IDL.Record({
    'notice' : IDL.Text,
    'from' : IDL.Text,
    'time_stamp' : Time,
  });
  const Notification = IDL.Record({
    'notification' : IDL.Text,
    'time_stamp' : Time,
    'for_id' : IDL.Principal,
  });
  const DoctorOpenHours = IDL.Record({
    'openHoursTime' : IDL.Vec(IDL.Vec(IDL.Text)),
    'openHoursDates' : IDL.Vec(IDL.Text),
    'doctor_id' : IDL.Principal,
  });
  return IDL.Service({
    'createAppointment' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [],
        ['oneway'],
      ),
    'createAppointmentPatientSide' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [],
        ['oneway'],
      ),
    'createEmployee' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Int, IDL.Text],
        [],
        ['oneway'],
      ),
    'createMedicalLog' : IDL.Func(
        [
          IDL.Text,
          IDL.Float64,
          IDL.Int,
          IDL.Int,
          IDL.Float64,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Float64,
          IDL.Float64,
        ],
        [],
        ['oneway'],
      ),
    'createNotice' : IDL.Func([IDL.Text, IDL.Text], [], ['oneway']),
    'createNotification' : IDL.Func([IDL.Text, IDL.Text], [], ['oneway']),
    'createOrUpdateDoctorMetaData' : IDL.Func(
        [IDL.Principal, IDL.Text, IDL.Text, IDL.Text],
        [],
        ['oneway'],
      ),
    'createOrUpdateDoctorOpenHours' : IDL.Func(
        [IDL.Vec(IDL.Text), IDL.Vec(IDL.Vec(IDL.Text))],
        [],
        [],
      ),
    'createProfile' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Vec(IDL.Nat8),
        ],
        [ProfileData],
        [],
      ),
    'deleteEmployee' : IDL.Func([IDL.Text], [], ['oneway']),
    'getDoctorById' : IDL.Func([IDL.Text], [IDL.Opt(ProfileData)], ['query']),
    'getDoctorMetaDataById' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(DoctorMetaData)],
        ['query'],
      ),
    'getPatientById' : IDL.Func([IDL.Text], [IDL.Opt(ProfileData)], ['query']),
    'getTextTimeStampFromEpoch' : IDL.Func([Time], [IDL.Text], ['query']),
    'giveMedicalLogAccess' : IDL.Func([IDL.Principal], [], ['oneway']),
    'hasAccessToPatientMedicalLogs' : IDL.Func(
        [IDL.Principal],
        [IDL.Bool],
        ['query'],
      ),
    'readAllAppointments' : IDL.Func([], [IDL.Vec(Appointment)], ['query']),
    'readDepartments' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'readDoctorAppointments' : IDL.Func([], [IDL.Vec(Appointment)], ['query']),
    'readDoctorMetaData' : IDL.Func([], [IDL.Vec(DoctorMetaData)], ['query']),
    'readDoctors' : IDL.Func([], [IDL.Vec(ProfileData)], ['query']),
    'readEmployees' : IDL.Func([], [IDL.Vec(Employee)], ['query']),
    'readMedicalLogs' : IDL.Func([IDL.Text], [IDL.Vec(MedicalLog)], ['query']),
    'readNotices' : IDL.Func([], [IDL.Vec(Notice)], ['query']),
    'readNotifications' : IDL.Func([], [IDL.Vec(Notification)], ['query']),
    'readOpenHours' : IDL.Func([], [IDL.Vec(DoctorOpenHours)], ['query']),
    'readOpenHoursById' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(DoctorOpenHours)],
        ['query'],
      ),
    'readPatientAppointments' : IDL.Func([], [IDL.Vec(Appointment)], ['query']),
    'readPatients' : IDL.Func([], [IDL.Vec(ProfileData)], ['query']),
    'readProfileData' : IDL.Func([], [IDL.Opt(ProfileData)], ['query']),
    'updateEmployee' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Int, IDL.Text],
        [],
        ['oneway'],
      ),
    'updateUserType' : IDL.Func([IDL.Principal, IDL.Text], [], ['oneway']),
  });
};
export const init = ({ IDL }) => { return []; };
