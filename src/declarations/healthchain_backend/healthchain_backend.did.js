export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const Doctor = IDL.Record({
    'age' : IDL.Int,
    'name' : IDL.Text,
    'designation' : IDL.Text,
    'email' : IDL.Text,
    'address' : IDL.Text,
    'gender' : IDL.Text,
    'phone_number' : IDL.Text,
    'department' : IDL.Text,
    'registered_on' : Time,
    'doctor_id' : IDL.Text,
    'qualification' : IDL.Text,
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
    'name' : IDL.Text,
    'email' : IDL.Text,
    'blood_group' : IDL.Text,
    'address' : IDL.Text,
    'gender' : IDL.Text,
    'phone_number' : IDL.Text,
    'registered_on' : Time,
  });
  return IDL.Service({
    'createDoctor' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Int,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
        ],
        [],
        ['oneway'],
      ),
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
        ],
        [],
        ['oneway'],
      ),
    'deleteEmployee' : IDL.Func([IDL.Text], [], ['oneway']),
    'readDepartments' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'readDoctors' : IDL.Func([], [IDL.Vec(Doctor)], ['query']),
    'readEmployees' : IDL.Func([], [IDL.Vec(Employee)], ['query']),
    'readNotices' : IDL.Func([], [IDL.Vec(Notice)], ['query']),
    'readPatients' : IDL.Func([], [IDL.Vec(Patient)], ['query']),
    'updateDoctor' : IDL.Func(
        [
          IDL.Text,
          Time,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Int,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
        ],
        [],
        ['oneway'],
      ),
    'updateEmployee' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Int, IDL.Text],
        [],
        ['oneway'],
      ),
    'updatePatient' : IDL.Func(
        [
          IDL.Text,
          Time,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Int,
          IDL.Text,
          IDL.Text,
          IDL.Float64,
          IDL.Float64,
          IDL.Text,
        ],
        [],
        ['oneway'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
