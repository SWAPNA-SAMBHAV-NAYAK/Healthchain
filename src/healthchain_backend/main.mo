import Text "mo:base/Text";
import List "mo:base/List";
import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";

actor healthchain {

  ///////////////////////////////////////// UserLoginData //////////////////////////////////////////////////

  public type UserLoginData = {
    user_id : Principal;
    name : Text;
    user_type : Text;
  };

  stable var userLoginDataList : List.List<UserLoginData> = List.nil<UserLoginData>();

  public func createUserLogin(
    user_id_data : Principal,
    name_data : Text,
    user_type_data : Text,
  ) {

    let newUserLogin : UserLoginData = {
      user_id = user_id_data;
      name = name_data;
      user_type = user_type_data;
    };

    userLoginDataList := List.push(newUserLogin, userLoginDataList);

    Debug.print(debug_show (userLoginDataList));
  };

  ///////////////////////////////////////// Appointment //////////////////////////////////////////////////

  public type Appointment = {
    appointment_id : Text;
    patient_id : Text;
    doctor_id : Text;
    time_slot : Text;
    date : Text;
  };

  stable var appointments : List.List<Appointment> = List.nil<Appointment>();

  public shared (msg) func createAppointment(
    appointment_id_data : Text,
    patient_id_data : Text,
    doctor_id_data : Text,
    time_slot_data : Text,
    date_data : Text,
  ) {

    Debug.print(debug_show (msg));

    let newAppointment : Appointment = {
      appointment_id = appointment_id_data;
      patient_id = patient_id_data;
      doctor_id = doctor_id_data;
      time_slot = time_slot_data;
      date = date_data;
    };
    appointments := List.push(newAppointment, appointments);
    Debug.print(debug_show (appointments));
  };

  public query func readAppointments() : async [Appointment] {
    return List.toArray(appointments);
  };

  ///////////////////////////////////////// Employee //////////////////////////////////////////////////

  public type Employee = {
    employee_id : Text;
    first_name : Text;
    last_name : Text;
    contact : Text;
    email : Text;
    salary : Int;
    date_of_joining : Text;
  };

  stable var employees : List.List<Employee> = List.nil<Employee>();

  public func createEmployee(
    employee_id_data : Text,
    first_name_data : Text,
    last_name_data : Text,
    contact_data : Text,
    email_data : Text,
    salary_data : Int,
    date_of_joining_data : Text,
  ) {

    let newEmployee : Employee = {
      employee_id = employee_id_data;
      first_name = first_name_data;
      last_name = last_name_data;
      email = email_data;
      contact = contact_data;
      salary = salary_data;
      date_of_joining = date_of_joining_data;
    };

    employees := List.push(newEmployee, employees);

    Debug.print(debug_show (employees));

  };

  public query func readEmployees() : async [Employee] {
    return List.toArray(employees);
  };

  public func updateEmployee(
    employee_id_data : Text,
    first_name_data : Text,
    last_name_data : Text,
    contact_data : Text,
    email_data : Text,
    salary_data : Int,
    date_of_joining_data : Text,
  ) {

    let updatedEmployee : Employee = {
      employee_id = employee_id_data;
      first_name = first_name_data;
      last_name = last_name_data;
      email = email_data;
      contact = contact_data;
      salary = salary_data;
      date_of_joining = date_of_joining_data;
    };

    var updatedEmployees = List.map(
      employees,
      func(employee : Employee) : Employee {
        if (employee.employee_id == employee_id_data) {
          return updatedEmployee;
        } else {
          return employee;
        };
      },
    );
    employees := updatedEmployees;
  };

  public func deleteEmployee(employee_id_data : Text) {

    var index : Nat = 0;
    var deleteIndex : Nat = 0;

    var updatedEmployees = List.map(
      employees,
      func(employee : Employee) : Employee {
        index := index +1;
        if (employee.employee_id == employee_id_data) {
          deleteIndex := index -1;
          return employee;
        } else {
          return employee;
        };
      },
    );

    let listFront = List.take(employees, deleteIndex);
    let listBack = List.drop(employees, deleteIndex +1);

    employees := List.append(listFront, listBack);
  };

  ///////////////////////////////////////// Patient //////////////////////////////////////////////////

  public type MedicalLog = {
    patient_id : Text;
    time_stamp : Time.Time;
    pulse_rate : Float;
    blood_pressure : Int;
    spo2 : Int;
    temperature : Float;
  };

  public type Patient = {
    patient_id : Text;
    registered_on : Time.Time;
    name : Text;
    email : Text;
    phone_number : Text;
    age : Int;
    address : Text;
    blood_group : Text;
    weight : Float;
    height : Float;
    gender : Text;
  };

  stable var patients : List.List<Patient> = List.nil<Patient>();

  public func createPatient(
    patient_id_data : Text,
    name_data : Text,
    email_data : Text,
    phone_number_data : Text,
    age_data : Int,
    address_data : Text,
    blood_group_data : Text,
    weight_data : Float,
    height_data : Float,
    gender_data : Text,
  ) {

    let newPatient : Patient = {
      patient_id = patient_id_data;
      registered_on = Time.now();
      name = name_data;
      email = email_data;
      phone_number = phone_number_data;
      age = age_data;
      address = address_data;
      blood_group = blood_group_data;
      weight = weight_data;
      height = height_data;
      gender = gender_data;
    };

    patients := List.push(newPatient, patients);

    Debug.print(debug_show (patients));

  };

  public func updatePatient(
    patient_id_data : Text,
    registered_on_data : Time.Time,
    name_data : Text,
    email_data : Text,
    phone_number_data : Text,
    age_data : Int,
    address_data : Text,
    blood_group_data : Text,
    weight_data : Float,
    height_data : Float,
    gender_data : Text,
  ) {

    let updatedPatient : Patient = {
      patient_id = patient_id_data;
      registered_on = registered_on_data;
      name = name_data;
      email = email_data;
      phone_number = phone_number_data;
      age = age_data;
      address = address_data;
      blood_group = blood_group_data;
      weight = weight_data;
      height = height_data;
      gender = gender_data;
    };

    var updatedPatientList = List.map(
      patients,
      func(patient : Patient) : Patient {
        if (patient.patient_id == patient_id_data) {
          return updatedPatient;
        } else {
          return patient;
        };
      },
    );
    patients := updatedPatientList;
  };

  public query func readPatients() : async [Patient] {
    return List.toArray(patients);
  };

  ///////////////////////////////////////// Department //////////////////////////////////////////////////

  stable var departments : [Text] = [
    "Cardiology",
    "Dermitology",
    "General Surgery",
    "Microbiology",
    "Radiology",
    "Medical Gastroenterology",
    "Electrophysiology",
    "Orthopaedics",
    "Diabetology",
    "Gynaecology",
    "ENT(Ear, Nose, Throat)",
    "Reproductive Medicine",
    "Gastrointestinal Oncology",
    "Blood Bank",
    "Emergency Medicine",
    "Clinical Nutrition & Dietetics",
    "Neurology",
    "Dental Sciences",
    "Endocrinology",
    "Neurosurgery",
    "Pediatrics",
  ];

  public query func readDepartments() : async [Text] {
    return departments;
  };

  ///////////////////////////////////////// Doctor //////////////////////////////////////////////////

  stable var doctors : List.List<Doctor> = List.nil<Doctor>();

  public type Doctor = {
    doctor_id : Text;
    registered_on : Time.Time;
    name : Text;
    email : Text;
    phone_number : Text;
    age : Int;
    address : Text;
    gender : Text;
    designation : Text;
    qualification : Text;
    department : Text;
  };

  public func createDoctor(
    doctor_id_data : Text,
    name_data : Text,
    email_data : Text,
    phone_number_data : Text,
    age_data : Int,
    address_data : Text,
    gender_data : Text,
    designation_data : Text,
    qualification_data : Text,
    department_data : Text,
  ) {

    let newDoctor : Doctor = {
      doctor_id = doctor_id_data;
      registered_on = Time.now();
      name = name_data;
      email = email_data;
      phone_number = phone_number_data;
      age = age_data;
      address = address_data;
      gender = gender_data;
      designation = designation_data;
      qualification = qualification_data;
      department = department_data;
    };

    doctors := List.push(newDoctor, doctors);

    Debug.print(debug_show (doctors));

  };

  public func getDoctorById(doctor_id_data : Text) : async ?Doctor {
    return List.find(
      doctors,
      func(doctor : Doctor) : Bool {
        return doctor.doctor_id == doctor_id_data;
      },
    );
  };

  public func updateDoctor(
    doctor_id_data : Text,
    registered_on_data : Time.Time,
    name_data : Text,
    email_data : Text,
    phone_number_data : Text,
    age_data : Int,
    address_data : Text,
    gender_data : Text,
    designation_data : Text,
    qualification_data : Text,
    department_data : Text,
  ) {

    let updatedDoctor : Doctor = {
      doctor_id = doctor_id_data;
      registered_on = registered_on_data;
      name = name_data;
      email = email_data;
      phone_number = phone_number_data;
      age = age_data;
      address = address_data;
      gender = gender_data;
      designation = designation_data;
      qualification = qualification_data;
      department = department_data;
    };

    var updatedDoctorList = List.map(
      doctors,
      func(doctor : Doctor) : Doctor {
        if (doctor.doctor_id == doctor_id_data) {
          return updatedDoctor;
        } else {
          return doctor;
        };
      },
    );
    doctors := updatedDoctorList;
  };

  public query func readDoctors() : async [Doctor] {
    return List.toArray(doctors);
  };

  ///////////////////////////////////////// Doctor Open Hours ///////////////////////////////////////////////////////

  public type DoctorOpenHours = {
    doctor_id : Text;
    openHoursDates : [Text];
    openHoursTime : [[Text]];

  };

  stable var doctor_open_hours_list : List.List<DoctorOpenHours> = List.nil<DoctorOpenHours>();

  public query func readOpenHours() : async [DoctorOpenHours] {
    return List.toArray(doctor_open_hours_list);
  };

  public func addDoctorOpenHours(
    doctor_id_data : Text,
    openHoursDates_data : [Text],
    openHoursTime_data : [[Text]],
  ) : async () {

    let newOpenHour : DoctorOpenHours = {
      doctor_id = doctor_id_data;
      openHoursDates = openHoursDates_data;
      openHoursTime = openHoursTime_data;
    };

    doctor_open_hours_list := List.push(newOpenHour, doctor_open_hours_list);

    Debug.print(debug_show (doctor_open_hours_list));
  };

  ///////////////////////////////////////// Notice ///////////////////////////////////////////////////////

  public type Notice = {
    time_stamp : Time.Time;
    from : Text;
    notice : Text;
  };

  var notices : List.List<Notice> = List.nil<Notice>();

  public func createNotice(fromText : Text, noticeText : Text) {
    let newNotice : Notice = {
      time_stamp = Time.now();
      from = fromText;
      notice = noticeText;
    };

    notices := List.push(newNotice, notices);

    Debug.print(debug_show (notices));

  };

  public query func readNotices() : async [Notice] {
    return List.toArray(notices);
  };

};
