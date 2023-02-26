export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const MedicalLog = IDL.Record({
    'blood_pressure' : IDL.Int,
    'temperature' : IDL.Float64,
    'spo2' : IDL.Int,
    'pulse_rate' : IDL.Float64,
    'time_stamp' : Time,
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
    'readNotices' : IDL.Func([], [IDL.Vec(Notice)], ['query']),
    'readPatients' : IDL.Func([], [IDL.Vec(Patient)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
