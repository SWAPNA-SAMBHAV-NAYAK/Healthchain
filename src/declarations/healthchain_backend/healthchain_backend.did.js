export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const MedicalLog = IDL.Record({
    'blood_pressure' : IDL.Int,
    'temperature' : IDL.Float64,
    'spo2' : IDL.Int,
    'pulse_rate' : IDL.Float64,
    'time_stamp' : Time,
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
  const Notice = IDL.Record({
    'notice' : IDL.Text,
    'from' : IDL.Text,
    'time_stamp' : Time,
  });
  const Patient = IDL.Record({
    'age' : IDL.Int,
    'weight' : IDL.Float64,
    'height' : IDL.Float64,
    'patient_id' : IDL.Text,
    'logs' : IDL.Vec(MedicalLog),
    'name' : IDL.Text,
    'email' : IDL.Text,
    'blood_group' : IDL.Text,
    'address' : IDL.Text,
    'gender' : IDL.Text,
    'phone_number' : IDL.Text,
    'registered_on' : Time,
  });
  return IDL.Service({
    'createEmployee' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Int, IDL.Text],
        [],
        ['oneway'],
      ),
    'createNotice' : IDL.Func([IDL.Text, IDL.Text], [], ['oneway']),
    'createPatient' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Int,
          IDL.Text,
          IDL.Text,
          IDL.Float64,
          IDL.Float64,
          IDL.Text,
          IDL.Vec(MedicalLog),
        ],
        [],
        ['oneway'],
      ),
    'deleteEmployee' : IDL.Func([IDL.Text], [], ['oneway']),
    'readEmployees' : IDL.Func([], [IDL.Vec(Employee)], ['query']),
    'readNotices' : IDL.Func([], [IDL.Vec(Notice)], ['query']),
    'readPatients' : IDL.Func([], [IDL.Vec(Patient)], ['query']),
    'updateEmployee' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Int, IDL.Text],
        [],
        ['oneway'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
