import Text "mo:base/Text";
import Iter "mo:base/Iter";
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

    Debug.print(Text.concat("createProfile ", debug_show (msg.caller)));

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

  public shared query (msg) func readProfileData() : async ?ProfileData {

    Debug.print(Text.concat("readProfileData ", debug_show (msg.caller)));

    return List.find(
      userProfileDataList,
      func(profileData : ProfileData) : Bool {
        return profileData.user_principal == msg.caller;
      },
    );
  };

  public shared query (msg) func readPatients() : async [ProfileData] {

    Debug.print(Text.concat("readPatients ", debug_show (msg.caller)));

    if (msg.caller == admin) {
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

  public shared query (msg) func getPatientById(principal_id_data : Text) : async ?ProfileData {

    Debug.print(Text.concat("getPatientById ", debug_show (msg.caller)));

    return List.find(
      userProfileDataList,
      func(patient : ProfileData) : Bool {
        return Principal.toText(patient.user_principal) == principal_id_data;
      },
    );
  };

  public shared query (msg) func readDoctors() : async [ProfileData] {

    Debug.print(Text.concat("readDoctors ", debug_show (msg.caller)));

    var profData = List.filter(
      userProfileDataList,
      func(log : ProfileData) : Bool {
        return log.user_type == "doctor";
      },
    );
    return List.toArray(profData);
    // } else {
    //   return [];
    // };
  };

  public shared query (msg) func getDoctorById(principal_id_data : Text) : async ?ProfileData {

    Debug.print(Text.concat("getDoctorById ", debug_show (msg.caller)));

    return List.find(
      userProfileDataList,
      func(doctor : ProfileData) : Bool {
        return Principal.toText(doctor.user_principal) == principal_id_data;
      },
    );
  };

  public shared (msg) func updateUserType(userPrincipal : Principal, account_type : Text) {

    Debug.print(Text.concat("updateUserType ", debug_show (msg.caller)));

    if (msg.caller == admin) {

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

    Debug.print(Text.concat("createAppointment ", debug_show (msg.caller)));

    let newAppointment : Appointment = {
      appointment_id = appointment_id_data;
      patient_id = Principal.fromText(patient_id_data);
      doctor_id = Principal.fromText(doctor_id_data);
      time_slot = time_slot_data;
      date = date_data;
    };
    appointments := List.push(newAppointment, appointments);

    var doc : ?ProfileData = await getDoctorById(doctor_id_data);

    switch (doc) {
      //For Patient Notification
      case null {
        Debug.print("Doctor Not Found while creating notification of Appointment");
      };
      case (?docData) {
        var notification = Text.concat(
          Text.concat("Your appointment has been set with Dr. ", docData.name),
          Text.concat(
            Text.concat(" on ", date_data),
            Text.concat(" at ", time_slot_data),
          ),
        );
        createNotification(
          patient_id_data,
          notification,
        );
      };
    };

    var pat : ?ProfileData = await getPatientById(patient_id_data);

    switch (pat) {
      //For Doctor Notification
      case null {
        Debug.print("Patient Not Found while creating notification of Appointment");
      };
      case (?patData) {
        var notification = Text.concat(
          Text.concat(patData.name, " has booked an appointment with you"),
          Text.concat(
            Text.concat(" on ", date_data),
            Text.concat(" at ", time_slot_data),
          ),
        );
        createNotification(
          doctor_id_data,
          notification,
        );
      };
    };

    Debug.print(debug_show (appointments));
  };

  public shared (msg) func createAppointmentPatientSide(
    appointment_id_data : Text,
    doctor_id_data : Text,
    time_slot_data : Text,
    date_data : Text,
  ) {

    Debug.print(Text.concat("createAppointmentPatientSide ", debug_show (msg.caller)));

    let newAppointment : Appointment = {
      appointment_id = appointment_id_data;
      patient_id = msg.caller;
      doctor_id = Principal.fromText(doctor_id_data);
      time_slot = time_slot_data;
      date = date_data;
    };
    appointments := List.push(newAppointment, appointments);
    Debug.print(debug_show (appointments));

    var doc : ?ProfileData = await getDoctorById(doctor_id_data);

    switch (doc) {
      //For Patient Notification
      case null {
        Debug.print("Doctor Not Found while creating notification of Appointment");
      };
      case (?docData) {
        var notification = Text.concat(
          Text.concat("Your appointment has been set with Dr. ", docData.name),
          Text.concat(
            Text.concat(" on ", date_data),
            Text.concat(" at ", time_slot_data),
          ),
        );
        createNotification(
          Principal.toText(msg.caller),
          notification,
        );
      };
    };

    var pat : ?ProfileData = await getPatientById(Principal.toText(msg.caller));

    switch (pat) {
      //For Doctor Notification
      case null {
        Debug.print("Patient Not Found while creating notification of Appointment");
      };
      case (?patData) {
        var notification = Text.concat(
          Text.concat(patData.name, " has booked an appointment with you"),
          Text.concat(
            Text.concat(" on ", date_data),
            Text.concat(" at ", time_slot_data),
          ),
        );
        createNotification(
          doctor_id_data,
          notification,
        );
      };
    };

  };

  // For Admin
  public shared query (msg) func readAllAppointments() : async [Appointment] {
    if (msg.caller == admin) {
      return List.toArray(appointments);
    } else {
      return [];
    };
  };

  // For Doctors
  public shared query (msg) func readDoctorAppointments() : async [Appointment] {

    Debug.print(Text.concat("readDoctorAppointments ", debug_show (msg.caller)));

    var docAppointments = List.filter(
      appointments,
      func(appointment : Appointment) : Bool {
        return appointment.doctor_id == msg.caller;
      },
    );

    return List.toArray(docAppointments);
  };

  // For Patients
  public shared query (msg) func readPatientAppointments() : async [Appointment] {

    Debug.print(Text.concat("readPatientAppointments ", debug_show (msg.caller)));

    var patAppointments = List.filter(
      appointments,
      func(appointment : Appointment) : Bool {
        return appointment.patient_id == msg.caller;
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

    Debug.print(Text.concat("createEmployee ", debug_show (msg.caller)));

    if (msg.caller == admin) {

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

  public shared query (msg) func readEmployees() : async [Employee] {

    Debug.print(Text.concat("readEmployees ", debug_show (msg.caller)));

    if (msg.caller == admin) {
      return List.toArray(employees);
    } else {
      return [];
    };
  };

  public shared (msg) func updateEmployee(
    employee_id_data : Text,
    first_name_data : Text,
    last_name_data : Text,
    contact_data : Text,
    email_data : Text,
    salary_data : Int,
    date_of_joining_data : Text,
  ) {

    Debug.print(Text.concat("updateEmployee ", debug_show (msg.caller)));

    if (msg.caller == admin) {
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
  };

  public shared (msg) func deleteEmployee(employee_id_data : Text) {

    Debug.print(Text.concat("deleteEmployee ", debug_show (msg.caller)));

    if (msg.caller == admin) {
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
  };

  ///////////////////////////////////////// MedicalLog //////////////////////////////////////////////////

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

    //TODO add Authorisation here

    Debug.print(Text.concat("createMedicalLog ", debug_show (msg.caller)));

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

  // TODO add Authorisation Here
  public shared query (msg) func readMedicalLogs(patient_id : Text) : async [MedicalLog] {

    Debug.print(Text.concat("readMedicalLogs ", debug_show (msg.caller)));

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

  stable var doctorMetaDataList : List.List<DoctorMetaData> = List.nil<DoctorMetaData>();

  //TODO add Authorisation here
  public shared query (msg) func getDoctorMetaDataById(doctor_id_data : Text) : async ?DoctorMetaData {

    Debug.print(Text.concat("getDoctorMetaDataById ", debug_show (msg.caller)));

    return List.find(
      doctorMetaDataList,
      func(doctor : DoctorMetaData) : Bool {
        return Principal.toText(doctor.doctor_id) == doctor_id_data;
      },
    );
  };

  //TODO add Authorisation here
  public shared (msg) func createOrUpdateDoctorMetaData(
    doctor_id_data : Principal,
    designation_data : Text,
    qualification_data : Text,
    department_data : Text,
  ) {

    Debug.print(Text.concat("createOrUpdateDoctorMetaData ", debug_show (msg.caller)));

    let doctorMetaData : ?DoctorMetaData = List.find(
      doctorMetaDataList,
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
        doctorMetaDataList := List.push(newDoctorMetaData, doctorMetaDataList);
      };
      case (?result) {

        var updatedDoctorMetaData = List.map(
          doctorMetaDataList,
          func(docMetaData : DoctorMetaData) : DoctorMetaData {
            if (docMetaData.doctor_id == doctor_id_data) {
              return newDoctorMetaData;
            } else {
              return docMetaData;
            };
          },
        );
        doctorMetaDataList := updatedDoctorMetaData;
      };
    };

  };

  public shared query (msg) func readDoctorMetaData() : async [DoctorMetaData] {

    Debug.print(Text.concat("readDoctorMetaData ", debug_show (msg.caller)));
    return List.toArray(doctorMetaDataList);
  };

  ///////////////////////////////////////// Doctor Open Hours ///////////////////////////////////////////////////////

  public type DoctorOpenHours = {
    doctor_id : Principal;
    openHoursDates : [Text];
    openHoursTime : [[Text]];

  };

  stable var doctor_open_hours_list : List.List<DoctorOpenHours> = List.nil<DoctorOpenHours>();

  // TODO add Authorisation Here
  public shared query (msg) func readOpenHours() : async [DoctorOpenHours] {

    Debug.print(Text.concat("readOpenHours ", debug_show (msg.caller)));

    return List.toArray(doctor_open_hours_list);
  };

  // TODO add Authorisation Here
  public shared (msg) func addDoctorOpenHours(
    openHoursDates_data : [Text],
    openHoursTime_data : [[Text]],
  ) : async () {

    Debug.print(Text.concat("addDoctorOpenHours ", debug_show (msg.caller)));

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

  stable var notices : List.List<Notice> = List.nil<Notice>();

  // TODO add Authorisation Here
  public shared (msg) func createNotice(fromText : Text, noticeText : Text) {
    let newNotice : Notice = {
      time_stamp = Time.now();
      from = fromText;
      notice = noticeText;
    };

    Debug.print(Text.concat("createNotice ", debug_show (msg.caller)));

    notices := List.push(newNotice, notices);

    Debug.print(debug_show (notices));

  };

  // TODO add Authorisation Here
  public shared query (msg) func readNotices() : async [Notice] {
    Debug.print(Text.concat("readNotices ", debug_show (msg.caller)));
    return List.toArray(notices);
  };

  ///////////////////////////////////////// Notification ///////////////////////////////////////////////////////

  public type Notification = {
    time_stamp : Time.Time;
    for_id : Principal;
    notification : Text;
  };

  stable var notifications : List.List<Notification> = List.nil<Notification>();

  // TODO add Authorisation Here
  public shared (msg) func createNotification(for_id_data : Text, notification_data : Text) {
    let newNotification : Notification = {
      time_stamp = Time.now();
      for_id = Principal.fromText(for_id_data);
      notification = notification_data;
    };

    Debug.print(Text.concat("createNotification ", debug_show (msg.caller)));

    notifications := List.push(newNotification, notifications);

    Debug.print(debug_show (notifications));

  };

  // TODO add Authorisation Here
  public shared query (msg) func readNotifications() : async [Notification] {

    Debug.print(Text.concat("readNotifications ", debug_show (msg.caller)));

    var userSpecificNotifications = List.filter(
      notifications,
      func(notification : Notification) : Bool {
        return notification.for_id == msg.caller;
      },
    );

    Debug.print(debug_show (notifications));

    Debug.print(debug_show (userSpecificNotifications));

    return List.toArray(userSpecificNotifications);
  };

  public query func getTextTimeStampFromEpoch(nanos : Time.Time) : async Text {
    // let nanos = Time.now();

    let secondsSinceEpoch = (nanos / 1_000_000_000);

    let days = secondsSinceEpoch / 86_400;
    let hours = (secondsSinceEpoch % 86_400) / 3_600;
    let minutes = (secondsSinceEpoch % 3_600) / 60;
    let secondsRemaining = secondsSinceEpoch % 60;

    let nanosRemaining = nanos % 1_000_000_000;

    var year = 1970 : Nat;

    var dayMutable = days;

    while (dayMutable > 366) {
      let is4thYear = (year % 4) == 0;
      let isNot100thYear : Bool = (year % 100) != 0;
      let is400thYear : Bool = (year % 400) == 0;

      year += 1;
      if ((is4thYear and isNot100thYear) or is400thYear) {
        dayMutable := dayMutable - 366;
      } else {
        dayMutable := dayMutable - 365;
      };
    };

    let days_per_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var i = 0;
    var month = 0;
    label monthLoop for (i in Iter.range(0, 11)) {

      if (dayMutable > days_per_month[i]) {
        dayMutable := dayMutable - days_per_month[i];
      } else {
        month := i + 1;
        break monthLoop;
      };
    };

    var dayText = Int.toText(dayMutable + 1);
    var monthText = Int.toText(month);
    var yearText = Int.toText(dayMutable + 1);
    var hoursText = Int.toText(hours);
    var minutesText = Int.toText(minutes);
    var secondsText = Int.toText(secondsRemaining);

    var finalDateText = Text.concat(
      Text.concat(
        Text.concat(dayText, "-"),
        Text.concat(monthText, "-"),
      ),
      yearText,
    );

    var finalTimeText = Text.concat(
      Text.concat(
        Text.concat(hoursText, ":"),
        Text.concat(minutesText, ":"),
      ),
      secondsText,
    );

    var finalTimeStampText = Text.concat(
      Text.concat(
        finalDateText,
        ",",
      ),
      finalTimeText,
    );

    return finalTimeStampText;
  };

};
