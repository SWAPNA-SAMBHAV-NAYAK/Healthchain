import Text "mo:base/Text";
import List "mo:base/List";
import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";

actor healthchain {

  ///////////////////////////////////////// ProfileData //////////////////////////////////////////////////

  let admin : Principal = Principal.fromText("uka3j-hvpxr-gk6vg-7c7jj-2ysk7-raykr-dqzu6-piqf4-vfsea-hmxo2-6qe");

  public type ProfileData = {
    user_principal : Principal;
    registered_on : Time.Time;
    name : Text;
    email : Text;
    address : Text;
    contact : Text;
    age : Text;
    gender : Text;
    image : [Nat8];
    user_type : Text;
  };

  stable var userProfileDataList : List.List<ProfileData> = List.nil<ProfileData>();

  public shared (msg) func createProfile(
    name_data : Text,
    email_data : Text,
    address_data : Text,
    contact_data : Text,
    age_data : Text,
    gender_data : Text,
    image_data : [Nat8],
  ) : async ProfileData {

    Debug.print(debug_show (msg));

    let profileData : ?ProfileData = List.find(
      userProfileDataList,
      func(profData : ProfileData) : Bool {
        return profData.user_principal == msg.caller;
      },
    );

    switch (profileData) {
      case null {

        let newProfileData : ProfileData = {
          user_principal = msg.caller;
          registered_on = Time.now();
          name = name_data;
          email = email_data;
          address = address_data;
          contact = contact_data;
          age = age_data;
          gender = gender_data;
          image = image_data;
          user_type = "patient";
        };

        userProfileDataList := List.push(newProfileData, userProfileDataList);

        return newProfileData

      };
      case (?result) {

        var updatedProfileData = List.map(
          userProfileDataList,
          func(profile : ProfileData) : ProfileData {
            if (profile.user_principal == msg.caller) {

              let newProfileData : ProfileData = {
                user_principal = msg.caller;
                registered_on = result.registered_on;
                name = name_data;
                email = email_data;
                address = address_data;
                contact = contact_data;
                age = age_data;
                gender = gender_data;
                image = image_data;
                user_type = result.user_type;
              };

              return newProfileData;

            } else {
              return profile;
            };
          },
        );

        userProfileDataList := updatedProfileData;

        return result;
      };
    };

  };

  public shared (msg) func readProfileData() : async ?ProfileData {

    Debug.print(debug_show (msg));

    return List.find(
      userProfileDataList,
      func(profileData : ProfileData) : Bool {
        return profileData.user_principal == msg.caller;
      },
    );
  };

  public shared (msg) func readPatients() : async [ProfileData] {

    if (msg.caller == Principal.toText(admin)) {
      var profData = List.filter(
        userProfileDataList,
        func(log : ProfileData) : Bool {
          return log.user_type == "patient";
        },
      );
      return List.toArray(profData);
    } else {
      return [];
    };
  };

  public func getPatientById(principal_id_data : Text) : async ?ProfileData {
    return List.find(
      userProfileDataList,
      func(patient : ProfileData) : Bool {
        return Principal.toText(patient.user_principal) == principal_id_data;
      },
    );
  };

  public shared (msg) func readDoctors() : async [ProfileData] {

    if (msg.caller == Principal.toText(admin)) {
      var profData = List.filter(
        userProfileDataList,
        func(log : ProfileData) : Bool {
          return log.user_type == "doctor";
        },
      );
      return List.toArray(profData);
    } else {
      return [];
    };
  };

  public func getDoctorById(principal_id_data : Text) : async ?ProfileData {
    return List.find(
      userProfileDataList,
      func(doctor : ProfileData) : Bool {
        return Principal.toText(doctor.user_principal) == principal_id_data;
      },
    );
  };

  public shared (msg) func updateUserType(userPrincipal : Principal, account_type : Text) {

    Debug.print(debug_show (msg));

    if (msg.caller == Principal.toText(admin)) {

      var updatedProfileData = List.map(
        userProfileDataList,
        func(profile : ProfileData) : ProfileData {
          if (profile.user_principal == userPrincipal) {

            let updatedData : ProfileData = {
              user_principal = profile.user_principal;
              registered_on = profile.registered_on;
              name = profile.name;
              email = profile.email;
              address = profile.address;
              contact = profile.contact;
              age = profile.age;
              gender = profile.gender;
              image = profile.image;
              user_type = account_type;
            };
            return updatedData;

          } else {
            return profile;
          };
        },
      );

      Debug.print(debug_show (updatedProfileData));

      userProfileDataList := updatedProfileData;
    };

  };

  ///////////////////////////////////////// Appointment //////////////////////////////////////////////////

  public type Appointment = {
    appointment_id : Text;
    patient_id : Principal;
    doctor_id : Principal;
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
      patient_id = Principal.fromText(patient_id_data);
      doctor_id = Principal.fromText(doctor_id_data);
      time_slot = time_slot_data;
      date = date_data;
    };
    appointments := List.push(newAppointment, appointments);
    Debug.print(debug_show (appointments));
  };

  // For Admin
  public query func readAllAppointments() : async [Appointment] {
    return List.toArray(appointments);
  };

  // For Doctors
  public shared (msg) func readDoctorAppointments() : async [Appointment] {
    var docAppointments = List.filter(
      appointments,
      func(appointment : Appointment) : Bool {
        return Principal.toText(appointment.doctor_id) == msg.caller;
      },
    );

    return List.toArray(docAppointments);
  };

  // For Patients
  public shared (msg) func readPatientAppointments() : async [Appointment] {

    var patAppointments = List.filter(
      appointments,
      func(appointment : Appointment) : Bool {
        return Principal.toText(appointment.patient_id) == msg.caller;
      },
    );

    return List.toArray(patAppointments);
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

  public shared (msg) func createEmployee(
    employee_id_data : Text,
    first_name_data : Text,
    last_name_data : Text,
    contact_data : Text,
    email_data : Text,
    salary_data : Int,
    date_of_joining_data : Text,
  ) {

    if (msg.caller == Principal.toText(admin)) {

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
    patient_id : Principal;
    doctor_id : Principal;
    time_stamp : Time.Time;
    pulse_rate : Float;
    blood_pressure : Int;
    spo2 : Int;
    temperature : Float;
    additional_notes : Text;
    medications : Text;
    blood_group : Text;
    weight : Float;
    height : Float;
  };

  stable var medicalLogs : List.List<MedicalLog> = List.nil<MedicalLog>();

  public shared (msg) func createMedicalLog(
    patient_id_data : Text,
    pulse_rate_data : Float,
    blood_pressure_data : Int,
    spo2_data : Int,
    temperature_data : Float,
    additional_notes_data : Text,
    medications_data : Text,
    blood_group_data : Text,
    weight_data : Float,
    height_data : Float,
  ) {

    let newMedicalLog : MedicalLog = {
      patient_id = Principal.fromText(patient_id_data);
      doctor_id = msg.caller;
      time_stamp = Time.now();
      pulse_rate = pulse_rate_data;
      blood_pressure = blood_pressure_data;
      spo2 = spo2_data;
      temperature = temperature_data;
      additional_notes = additional_notes_data;
      medications = medications_data;
      blood_group = blood_group_data;
      weight = weight_data;
      height = height_data;
    };

    medicalLogs := List.push(newMedicalLog, medicalLogs);

    Debug.print(debug_show (medicalLogs));

  };

  // public func updatePatient(
  //   patient_id_data : Text,
  //   registered_on_data : Time.Time,
  //   name_data : Text,
  //   email_data : Text,
  //   phone_number_data : Text,
  //   age_data : Int,
  //   address_data : Text,
  //   blood_group_data : Text,
  //   weight_data : Float,
  //   height_data : Float,
  //   gender_data : Text,
  // ) {

  //   let updatedPatient : Patient = {
  //     patient_id = patient_id_data;
  //     registered_on = registered_on_data;
  //     name = name_data;
  //     email = email_data;
  //     phone_number = phone_number_data;
  //     age = age_data;
  //     address = address_data;
  //     blood_group = blood_group_data;
  //     weight = weight_data;
  //     height = height_data;
  //     gender = gender_data;
  //   };

  //   var updatedPatientList = List.map(
  //     patients,
  //     func(patient : Patient) : Patient {
  //       if (patient.patient_id == patient_id_data) {
  //         return updatedPatient;
  //       } else {
  //         return patient;
  //       };
  //     },
  //   );
  //   patients := updatedPatientList;
  // };

  public query func readMedicalLogs(patient_id : Text) : async [MedicalLog] {
    var patMedicalLogList = List.filter(
      medicalLogs,
      func(log : MedicalLog) : Bool {
        return Principal.toText(log.patient_id) == patient_id;
      },
    );
    return List.toArray(patMedicalLogList);
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

  public type DoctorMetaData = {
    doctor_id : Principal;
    designation : Text;
    qualification : Text;
    department : Text;
  };

  stable var doctors : List.List<DoctorMetaData> = List.nil<DoctorMetaData>();

  // public shared (msg) func createDoctor(
  //   designation_data : Text,
  //   qualification_data : Text,
  //   department_data : Text,
  // ) {

  //   let newDoctor : DoctorMetaData = {
  //     doctor_id = msg.caller;
  //     designation = designation_data;
  //     qualification = qualification_data;
  //     department = department_data;
  //   };

  //   doctors := List.push(newDoctor, doctors);

  //   Debug.print(debug_show (doctors));

  // };

  public func getDoctorMetaDataById(doctor_id_data : Text) : async ?DoctorMetaData {
    return List.find(
      doctors,
      func(doctor : DoctorMetaData) : Bool {
        return Principal.toText(doctor.doctor_id) == doctor_id_data;
      },
    );
  };

  public shared (msg) func createOrUpdateDoctorMetaData(
    doctor_id_data : Principal,
    designation_data : Text,
    qualification_data : Text,
    department_data : Text,
  ) {

    let doctorMetaData : ?DoctorMetaData = List.find(
      doctors,
      func(docMetaData : DoctorMetaData) : Bool {
        return docMetaData.doctor_id == doctor_id_data;
      },
    );

    let newDoctorMetaData : DoctorMetaData = {
      doctor_id = doctor_id_data;
      designation = designation_data;
      qualification = qualification_data;
      department = department_data;
    };

    switch (doctorMetaData) {
      case null {
        doctors := List.push(newDoctorMetaData, doctors);
      };
      case (?result) {

        var updatedDoctorMetaData = List.map(
          doctors,
          func(docMetaData : DoctorMetaData) : DoctorMetaData {
            if (docMetaData.doctor_id == doctor_id_data) {
              return newDoctorMetaData;
            } else {
              return docMetaData;
            };
          },
        );
        doctors := updatedDoctorMetaData;
      };
    };

  };

  // public query func readDoctors() : async [Doctor] {
  //   return List.toArray(doctors);
  // };

  ///////////////////////////////////////// Doctor Open Hours ///////////////////////////////////////////////////////

  public type DoctorOpenHours = {
    doctor_id : Principal;
    openHoursDates : [Text];
    openHoursTime : [[Text]];

  };

  stable var doctor_open_hours_list : List.List<DoctorOpenHours> = List.nil<DoctorOpenHours>();

  public query func readOpenHours() : async [DoctorOpenHours] {
    return List.toArray(doctor_open_hours_list);
  };

  public shared (msg) func addDoctorOpenHours(
    openHoursDates_data : [Text],
    openHoursTime_data : [[Text]],
  ) : async () {

    let newOpenHour : DoctorOpenHours = {
      doctor_id = msg.caller;
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
